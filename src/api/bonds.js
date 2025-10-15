import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetBonds() {
  const URL = endpoints.bond.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      Bonds: data?.results || [],
      BondsLoading: isLoading,
      BondsError: error,
      BondsValidating: isValidating,
      BondsEmpty: !isLoading && !data?.results?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetBond(productId) {
  const URL = productId ? [endpoints.bond.details, { params: { productId } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      Bond: data?.bond,
      BondLoading: isLoading,
      BondError: error,
      BondValidating: isValidating,
    }),
    [data?.bond, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchBonds(query) {
  const URL = query ? [endpoints.bond.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.bonds || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.bonds.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetFeaturedBonds() {
  const URL = endpoints.bond.featured;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  console.log('featuredBonds', data);

  const memoizedValue = useMemo(
    () => ({
      featuredBonds: data || [],
      featuredBondsLoading: isLoading,
      featuredBondsError: error,
      featuredBondsValidating: isValidating,
      featuredBondsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
