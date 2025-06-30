// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useNetworkStatus } from '@/hooks/useMediaQuery';

// interface OfflineDetectorProps {
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
// }

// /**
//  * Component that detects offline status and shows a fallback UI when offline
//  */
// const OfflineDetector: React.FC<OfflineDetectorProps> = ({
//   children,
//   fallback,
// }) => {
//   const { online } = useNetworkStatus();
//   const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  
//   // Add a slight delay before showing offline message to prevent flashing
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
    
//     if (!online) {
//       timer = setTimeout(() => {
//         setShowOfflineMessage(true);
//       }, 1000);
//     } else {
//       setShowOfflineMessage(false);
//     }
    
//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [online]);
  
//   if (!online && showOfflineMessage) {
//     if (fallback) {
//       return <>{fallback}</>;
//     }
    
//     return (
//       <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-4">
//         <div className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a5 5 0 010-7.072m-3.182 3.182a1 1 0 11-1.414-1.414m1.414 1.414L5.636 18.364" />
//           </svg>
//         </div>
//         <h2 className="text-xl font-bold mb-2 text-center">Không có kết nối mạng</h2>
//         <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
//           Vui lòng kiểm tra kết nối internet của bạn và thử lại.
//         </p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
//         >
//           Thử lại
//         </button>
//       </div>
//     );
//   }
  
//   return <>{children}</>;
// };

// export default OfflineDetector;
