import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetStats() {
  const URL = endpoints.stats.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      stats: data || [],
      statsLoading: isLoading,
      statsError: error,
      statsValidating: isValidating,
      statsEmpty: !isLoading && !data?.length,
    }),
    [data, data?.length, error, isLoading, isValidating]
  );

  return memoizedValue;
}