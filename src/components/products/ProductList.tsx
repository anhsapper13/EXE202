"use client";
import CategoryService from "@/services/category.service";
import ProductService from "@/services/product.service";
import { ICategory } from "@/types/category.interface";
import {
  PaginationParams
} from "@/types/pagination.interface";
import { IProduct } from "@/types/product.interface";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Loading from "../common/Loading";
import PaginationCustom from "../common/PaginationCustom";
import ProductCard from "./ProductCard";
import { ca } from "date-fns/locale";

const ProductList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [search, setSearch] = React.useState<string>("");
  const [sort, setSort] = React.useState<string>("createdAt");
  const [order, setOrder] = React.useState<string | "asc" | "desc">("desc");
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(10000000);
  const [tempMinPrice, setTempMinPrice] = React.useState<number>(0);
  const [tempMaxPrice, setTempMaxPrice] = React.useState<number>(10000000);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  const [pagination, setPagination] = React.useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  }>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10, // số items per page
  });

  // Memoize query params to prevent unnecessary useEffect runs
  const queryParams = React.useMemo(() => {
    return {
      page: parseInt(searchParams.get("page") || "1", 10),
      category: searchParams.get("category") || null,
      search: searchParams.get("search") || "",
      sort: searchParams.get("sort") || "createdAt",
      order: searchParams.get("order") || "desc",
      minPrice: parseInt(searchParams.get("minPrice") || "0", 10),
      maxPrice: parseInt(searchParams.get("maxPrice") || "10000000", 10),
    };
  }, [searchParams]);

  // Sync state with URL query parameters
  React.useEffect(() => {
    const { page, category, search, sort, order, minPrice, maxPrice } =
      queryParams;
    setSelectedCategory(category);
    setSearch(search);
    setSort(sort);
    setOrder(order);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setTempMinPrice(minPrice);
    setTempMaxPrice(maxPrice);
    setPagination((prev) => ({ ...prev, currentPage: page }));

    // Use a cleanup flag to prevent state updates on unmounted component
    let isMounted = true;
    const fetchData = async () => {
      if (isMounted) {
        await Promise.all([
          categories.length === 0 ? fetchCategories() : Promise.resolve(),
          fetchProducts(
            page,
            category || undefined,
            search || undefined,
            sort,
            order,
            minPrice,
            maxPrice
          ),
        ]);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [queryParams,categories.length]);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAllCategories({
        page: 1,
        limit: 1000,
      });
      setCategories(response.data.items || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchProducts = async (
    page: number = 1,
    category?: string,
    search?: string,
    sort: string = "createdAt",
    order: string | "asc" | "desc" = "desc",
    minPrice?: number,
    maxPrice?: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const params: PaginationParams & {
        category?: string;
        search?: string;
        sort?: string;
        order?: string | "asc" | "desc";
        minPrice?: number;
        maxPrice?: number;
      } = {
        page,
        limit: 10,
        ...(category ? { category } : {}),
        ...(search ? { search } : {}),
        sort,
        order,
        ...(minPrice !== undefined ? { minPrice } : {}),
        ...(maxPrice !== undefined ? { maxPrice } : {}),
      };
      const response = await ProductService.getAllProducts(params);

      if (!response.data) {
        throw new Error("Invalid response structure");
      }

      const items = Array.isArray(response.data.items)
        ? response.data.items
        : [];
      setProducts(items);
      setPagination({
        currentPage: response.data.meta?.currentPage || page,
        totalPages: response.data.meta?.totalPages || 1,
        totalItems: response.data.meta?.totalItems || 0,
        pageSize: response.data.meta?.pageSize || 10,
      });

      // Only update URL if params differ from current searchParams
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("page", page.toString());
      if (category) newSearchParams.set("category", category);
      if (search) newSearchParams.set("search", search);
      newSearchParams.set("sort", sort);
      newSearchParams.set("order", order);
      if (minPrice !== undefined)
        newSearchParams.set("minPrice", minPrice.toString());
      if (maxPrice !== undefined)
        newSearchParams.set("maxPrice", maxPrice.toString());

      const newQueryString = newSearchParams.toString();
      const currentQueryString = searchParams.toString();
      if (newQueryString !== currentQueryString) {
        router.push(`${pathname}?${newQueryString}`, { scroll: false });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("An error occurred while fetching products");
      setProducts([]);
      setPagination((prev) => ({
        ...prev,
        totalItems: 0,
        totalPages: 1,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchProducts(
      page,
      selectedCategory || undefined,
      search || undefined,
      sort,
      order,
      minPrice,
      maxPrice
    );
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    fetchProducts(
      1,
      category || undefined,
      search || undefined,
      sort,
      order,
      minPrice,
      maxPrice
    );
    setIsSidebarOpen(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortOption, orderOption] = e.target.value.split("|");
    setSort(sortOption);
    setOrder(orderOption);
    fetchProducts(
      1,
      selectedCategory || undefined,
      search || undefined,
      sortOption,
      orderOption,
      minPrice,
      maxPrice
    );
  };

  const handlePriceRangeChange = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    fetchProducts(
      1,
      selectedCategory || undefined,
      search || undefined,
      sort,
      order,
      tempMinPrice,
      tempMaxPrice
    );
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  if (error) {

    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="bg-red-100 text-red-800 p-4 rounded-md shadow-md">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-8xl mx-auto">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden flex justify-between items-center">
        <h2 className="text-lg font-semibold">Products</h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-secondary text-white hover:bg-foreground hover:text-background transition-all cursor-pointer duration-300"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 text-white">
        {/* Sidebar: Sort, Price Range, and Categories */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-80 bg-tertiary shadow rounded-xl p-4 transition-all duration-300 ease-in-out`}
        >
          {/* Sort Section */}
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-semibold mb-2">Sort By</h2>
            <select
              value={`${sort}|${order}`}
              onChange={handleSortChange}
              className="w-full bg-tertiary border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="createdAt|desc">Newest First</option>
              <option value="createdAt|asc">Oldest First</option>
              <option value="price|asc">Price: Low to High</option>
              <option value="price|desc">Price: High to Low</option>
              <option value="name|asc">Name: A to Z</option>
              <option value="name|desc">Name: Z to A</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6 text-white">
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Price Range
            </h2>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="number"
                value={tempMinPrice}
                onChange={(e) =>
                  setTempMinPrice(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm sm:text-base text-center"
                min="0"
                placeholder="Min"
              />
              <span className="text-sm sm:text-base">—</span>
              <input
                type="number"
                value={tempMaxPrice}
                onChange={(e) =>
                  setTempMaxPrice(
                    Math.max(tempMinPrice, parseInt(e.target.value) || 10000000)
                  )
                }
                className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm sm:text-base text-center"
                min={tempMinPrice}
                placeholder="Max"
              />
            </div>
            <button
              onClick={handlePriceRangeChange}
              className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-foreground hover:text-background transition-all ease-in-out duration-300 cursor-pointer text-sm sm:text-base"
            >
              Apply Price Range
            </button>
          </div>

          {/* Categories */}
          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Categories
          </h2>
          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <ul className="space-y-2">
              <li
                className={`cursor-pointer p-2 rounded text-sm sm:text-base ${
                  !selectedCategory
                    ? "bg-secondary text-white"
                    : "hover:bg-gray-100 hover:text-background"
                } transition-all ease-in-out duration-300`}
                onClick={() => handleCategoryClick(null)}
              >
                All Products
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`cursor-pointer p-2 rounded text-sm sm:text-base ${
                    selectedCategory === cat.id
                      ? "bg-secondary text-white"
                      : "hover:bg-gray-100 hover:text-black"
                  } transition-all ease-in-out duration-300`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loading />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {products.map(({ name, image, price, id }, idx) => (
                  <Link key={idx} href={`/products/${id}`}>
                    <ProductCard name={name} image={image} price={price} />
                  </Link>
                ))}
              </div>
              {products.length === 0 && (
                <p className="bg-tertiary text-white shadow-md p-6 rounded-xl text-base sm:text-lg mt-4">
                  No products found.
                </p>
              )}
           
                <div className="mt-6">
                  <PaginationCustom
                    currentPage={pagination.currentPage}
                    totalItems={pagination.totalItems}
                    pageSize={pagination.pageSize}
                    onPageChange={handlePageChange}
                  />
                </div>
             
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
