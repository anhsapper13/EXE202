'use client';

import React, { useEffect, useState } from 'react';

interface DataCachingProps {
  children: React.ReactNode;
  cacheKey: string;
  data: any;
  expiration?: number; // In milliseconds, default 1 hour
}

/**
 * Component that provides local caching for data to improve mobile experience
 * and handle offline scenarios
 */
const DataCaching: React.FC<DataCachingProps> = ({
  children,
  cacheKey,
  data,
  expiration = 3600000, // 1 hour default
}) => {
  // const { online } = useNetworkStatus();
  const [isCached, setIsCached] = useState(false);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    if (!data) return;
    
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        expiration,
      };
      
      localStorage.setItem(`pet_app_cache_${cacheKey}`, JSON.stringify(cacheData));
      setIsCached(true);
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }, [data, cacheKey, expiration]);
  
  // Load cached data when offline
  useEffect(() => {
    // if (online || data) return;
    
    try {
      const cachedDataString = localStorage.getItem(`pet_app_cache_${cacheKey}`);
      
      if (cachedDataString) {
        const cachedData = JSON.parse(cachedDataString);
        const now = Date.now();
        
        // Check if cache is still valid
        if (now - cachedData.timestamp < cachedData.expiration) {
          // We could dispatch an action here to update Redux store with cached data
          // For now, we just indicate that we have cached data
          setIsCached(true);
        }
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
  }, [ data, cacheKey]);
  
  return (
    <>
      { !data && isCached && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 text-sm text-yellow-700 dark:text-yellow-400 rounded-md mb-4">
          Đang hiển thị dữ liệu đã lưu trong bộ nhớ tạm. Một số thông tin có thể không phải là mới nhất.
        </div>
      )}
      {children}
    </>
  );
};

export default DataCaching;
