"use client";
import React, { useState } from "react";
import useSWR from "swr";
import Hero from "@/components/pet-service/Hero";
import ServiceCardList from "@/components/pet-service/ServiceCardList";
import { ServiceRequestParam, IService } from "@/types/service.interface";
import ServiceService from "@/services/service.service";
import CategoryService from "@/services/category.service";
import { defaultSWRConfig } from "@/config/swr-config";
import Benefits from "@/components/pet-service/Benefic";
import GuaranteeAside from "@/components/pet-service/GuaranteeAside";
import { ICategory, CategoryType } from "@/types/category.interface";
import PaginationCustom from "@/components/common/PaginationCustom";
const PAGE_SIZE_DEFAULT = 3;
const fetcher = async ([url, page, limit, searchParams]: [string, number, number, ServiceRequestParam]) => {
  const params: ServiceRequestParam = { 
    page, 
    limit,
    ...searchParams 
  };
  console.log(url, page, limit, searchParams);
  
  const res = await ServiceService.getServiceClient(params);
  return res.data;
};
const categoryFetcher = async () => {
  const response = await CategoryService.getServiceCategoryClient({ 
    type: CategoryType.SERVICE 
  });
  return response.data;
};

const PetServicePage = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT);
  // const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchParams] = useState<ServiceRequestParam>({});

  const { data, error, isLoading } = useSWR(
    ["services", page, pageSize, searchParams],
    fetcher,
    {
      ...defaultSWRConfig,
      revalidateOnFocus: false, 
      dedupingInterval: 0,
    }
  );
  
 
  const { data : categoryList } = useSWR(
    'categories',
    categoryFetcher,
    {
      ...defaultSWRConfig,
      revalidateOnFocus: false,
    }
  );
  
 
  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };
  
//   const handleSearch = (params: {
//     category_id?: string;
//     location?: string;
//     petType?: string;
//     searchTerm?: string;
//   }) => {
//  setPage(1);
//     const apiSearchParams: ServiceRequestParam = {
//       category_id: params.category_id,
//       name: params.searchTerm 
//     };
    
//     setSearchParams(apiSearchParams);
//   };

  const serviceList: IService[] = data?.data?.data || [];
  const categoryListData: ICategory[] = categoryList?.data?.data || [];
  console.log("Service List:", categoryListData);
  console.log("Category List:", categoryList);
  
  
  const total = data?.data?.total || 0;

  return (
    <div>
      <Hero 
        categories={categoryListData}
        // onSearch={handleSearch}
      />
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Error loading services. Please try again.
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full md:flex-row justify-between items-start gap-6 px-4 py-8 bg-gray-100">
            <div className="w-full md:w-2/3">
              <ServiceCardList serviceList={serviceList} />
              <div className="flex justify-center ">
                <PaginationCustom
                  totalItems={total}
                  pageSize={pageSize}
                  currentPage={page}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            <div className="w-1/3 hidden md:block">
              <GuaranteeAside />
            </div>
          </div>
        </>
      )}
      <Benefits />
    </div>
  );
};

export default PetServicePage;
