import { SWRConfiguration } from 'swr';

// Create consistent SWR configuration options
export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateIfStale: false,
  dedupingInterval: 0,
  revalidateOnMount: true,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  // Use localStorage for persistence between sessions
  provider: () => {
    // Use Map as the cache
    return new Map();
  },
};

// For data that should never be cached
export const noCacheConfig: SWRConfiguration = {
  ...defaultSWRConfig,
  revalidateOnFocus: false,
  revalidateIfStale: true,
  dedupingInterval: 0,
  refreshInterval: 0,
  // Disable caching
  provider: () => new Map(),
};
