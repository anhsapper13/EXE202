import { ICartItem } from "@/types/cart-item.type";

export const sampleData: ICartItem[] = [
  {
    cart_item_id: "b1a9c7d5-25f1-4236-9c20-7f02fbb01cc0",
    cart_id: "a1a2b3c4-d5e6-7890-1234-56789abcdef0",
    product_id: "1e3b94b6-dd16-4d79-aec3-75e06324b131",
    quantity: 1,
    unitPrice: "12.00",
    addedAt: "2025-05-28T04:00:00.000Z",
    product: {
      id: "1e3b94b6-dd16-4d79-aec3-75e06324b131",
      name: "Cat Carrier Original - Grey",
      description:
        "Durable plastic cat carrier with steel wire door and ergonomic handle. Ideal for travel and vet visits.",
      price: "12.00",
      stockQuantity: 50,
      image: "https://m.media-amazon.com/images/I/81y0wHHyCHL.jpg",
      createdAt: "2025-05-28T04:00:00.000Z",
      updatedAt: "2025-05-28T04:00:00.000Z",
    },
  },
  {
    cart_item_id: "c2a8d7e6-88aa-4b6b-bb99-7d11c4e634ef",
    cart_id: "a1a2b3c4-d5e6-7890-1234-56789abcdef0",
    product_id: "2e3b94b6-dd16-4d79-aec3-75e06324b131",
    quantity: 1,
    unitPrice: "8.00",
    addedAt: "2025-05-28T04:00:00.000Z",
    product: {
      id: "2e3b94b6-dd16-4d79-aec3-75e06324b131",
      name: "Chewy Dog Bone Toy",
      description:
        "Non-toxic rubber dog toy designed for chewing, perfect for teething puppies and active dogs.",
      price: "8.00",
      stockQuantity: 150,
      image:
        "https://chewychews.com.au/cdn/shop/files/RubberBone_8143ff6c-48c9-4e91-88df-b76e2a685db2_1100x.jpg?v=1684713308",
      createdAt: "2025-05-28T04:00:00.000Z",
      updatedAt: "2025-05-28T04:00:00.000Z",
    },
  },
  {
    cart_item_id: "d3c6f7f2-a2f4-408b-93ae-d340e3bc0d7e",
    cart_id: "a1a2b3c4-d5e6-7890-1234-56789abcdef0",
    product_id: "3e3b94b6-dd16-4d79-aec3-75e06324b131",
    quantity: 1,
    unitPrice: "18.00",
    addedAt: "2025-05-28T04:00:00.000Z",
    product: {
      id: "3e3b94b6-dd16-4d79-aec3-75e06324b131",
      name: "Organic Cat Food - Salmon 1kg",
      description:
        "Premium dry cat food made with real salmon, free from artificial preservatives or flavors.",
      price: "18.00",
      stockQuantity: 200,
      image:
        "https://bf1af2.a-cdn.akinoncloud.com/products/2024/09/12/87720/c3ef88d5-e55d-4950-bb0f-ae7ce8517781_size3840_cropCenter.jpg",
      createdAt: "2025-05-28T04:00:00.000Z",
      updatedAt: "2025-05-28T04:00:00.000Z",
    },
  },
  {
    cart_item_id: "e4b7d2d4-1a72-4b68-a6ea-0b7a37c1e34f",
    cart_id: "a1a2b3c4-d5e6-7890-1234-56789abcdef0",
    product_id: "4e3b94b6-dd16-4d79-aec3-75e06324b131",
    quantity: 1,
    unitPrice: "45.00",
    addedAt: "2025-05-28T04:00:00.000Z",
    product: {
      id: "4e3b94b6-dd16-4d79-aec3-75e06324b131",
      name: "Orthopedic Dog Bed - Large",
      description:
        "Soft, orthopedic foam bed that supports your dog’s joints and ensures a restful sleep.",
      price: "45.00",
      stockQuantity: 30,
      image:
        "https://m.media-amazon.com/images/I/71Glb77vr1L._AC_UF1000,1000_QL80_.jpg",
      createdAt: "2025-05-28T04:00:00.000Z",
      updatedAt: "2025-05-28T04:00:00.000Z",
    },
  },
  {
    cart_item_id: "f5e2c3c1-1112-4bc4-91b5-8dfce3b8d00e",
    cart_id: "a1a2b3c4-d5e6-7890-1234-56789abcdef0",
    product_id: "5e3b94b6-dd16-4d79-aec3-75e06324b131",
    quantity: 1,
    unitPrice: "10.00",
    addedAt: "2025-05-28T04:00:00.000Z",
    product: {
      id: "5e3b94b6-dd16-4d79-aec3-75e06324b131",
      name: "2-in-1 Pet Grooming Brush",
      description:
        "Double-sided brush for grooming and detangling pet fur, ideal for cats and dogs.",
      price: "10.00",
      stockQuantity: 120,
      image:
        "https://m.media-amazon.com/images/I/71BhA25W6zL._AC_UF1000,1000_QL80_.jpg",
      createdAt: "2025-05-28T04:00:00.000Z",
      updatedAt: "2025-05-28T04:00:00.000Z",
    },
  },
];
