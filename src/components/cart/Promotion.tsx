import React from "react";

const promos = [
  {
    id: 1,
    header: "International Shipment",
    content: "Your orders are shipped seamlessly between countries",
    icon: (
      <svg
        width="60px"
        height="60px"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="International shipping icon"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
          fill="#f97316"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
          fill="#f97316"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
          fill="#f97316"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
          fill="#f97316"
        />
      </svg>
    ),
  },
  {
    id: 2,
    header: "Free Delivery on $45+",
    content: "*Delivery subject to availability",
    icon: (
      <svg
        fill="none"
        width="60px"
        height="60px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Free delivery icon"
      >
        <path
          d="M17.92,21H6.08a1,1,0,0,1-1-1.08l.85-11a1,1,0,0,1,1-.92H17.07a1,1,0,0,1,1,.92l.85,11A1,1,0,0,1,17.92,21Z"
          style={{
            fill: "none",
            stroke: "#f97316",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        />
        <path
          d="M9,11V6a3,3,0,0,1,3-3h0a3,3,0,0,1,3,3v5"
          style={{
            fill: "none",
            stroke: "#f97316",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        />
      </svg>
    ),
  },
  {
    id: 3,
    header: "Secure Payment",
    content: "Payments are protected with our private security network",
    icon: (
      <svg
        width="60px"
        height="60px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Secure payment icon"
      >
        <path
          d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6zm-2 2H4V6h16v2zM4 11h16v7H4v-7z"
          fill="#f97316"
        />
      </svg>
    ),
  },
];

export default function Promotion() {
  return (
    <aside className="my-4 w-full md:w-80 bg-white rounded-lg shadow-md p-6 md:sticky md:top-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Why Shop With Us?
      </h2>
      <div className="space-y-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="flex flex-col items-center text-center p-4 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="mb-3">{promo.icon}</div>
            <h3 className="text-lg font-medium text-gray-700">
              {promo.header}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{promo.content}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
