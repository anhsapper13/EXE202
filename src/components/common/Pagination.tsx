

import React from "react";

export default function Pagination({
  pagination,
  setPagination,
}: {
  pagination: { page: number; maxPage: number; limit: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; maxPage: number; limit: number }>
  >;
}) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            disabled={pagination.page === 1}
            onClick={() => {
              setPagination({
                ...pagination,
                page: pagination.page - 1,
              });
            }}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              pagination.page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {Array.from({ length: pagination.maxPage }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => {
                setPagination({ ...pagination, page: index + 1 }); // Fixed from index + 2
              }}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                pagination.page === index + 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 bg-white"
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={pagination.page === pagination.maxPage}
            onClick={() => {
              setPagination({
                ...pagination,
                page: pagination.page + 1,
              });
            }}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              pagination.page === pagination.maxPage
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

