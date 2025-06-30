"use client";
import { Pagination } from "antd";

interface PaginationCustomProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number, pageSize: number) => void;
}
const PaginationCustom: React.FC<PaginationCustomProps> = ({
  totalItems,
  onPageChange,
  currentPage,
  pageSize,
}) => {
  return (
    <div style={{ marginTop: "20px", textAlign: "left" }}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onPageChange}
        showSizeChanger
        pageSizeOptions={["6", "12", "18", "24"]}
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
};

export default PaginationCustom;