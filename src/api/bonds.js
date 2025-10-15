import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetBonds(page = 1, pageSize = 10) {
  const URL = `${endpoints.bond.list}?page=${page}&page_size=${pageSize}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      Bonds: data?.results || [],
      pagination: {
        count: data?.count || 0,
        next: data?.next,
        previous: data?.previous,
        currentPage: page,
        totalPages: data?.count ? Math.ceil(data.count / pageSize) : 0,
      },
      BondsLoading: isLoading,
      BondsError: error,
      BondsValidating: isValidating,
      BondsEmpty: !isLoading && !data?.results?.length,
    }),
    [data, error, isLoading, isValidating, page, pageSize]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetBond(bondISIN) {
  const URL = bondISIN ? endpoints.bond.details(bondISIN) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      Bond: data,
      BondLoading: isLoading,
      BondError: error,
      BondValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetSimilarBonds(bondISIN) {
  const URL = bondISIN ? endpoints.bond.similar(bondISIN) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  
  const memoizedValue = useMemo(
    () => ({
      SimilarBonds: data,
      SimilarBondsLoading: isLoading,
      SimilarBondsError: error,
      SimilarBondsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchBonds(query) {
  const URL = query ? endpoints.bond.search(query) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, URL ? {
    keepPreviousData: true,
  } : null);

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetFeaturedBonds() {
  const URL = endpoints.bond.featured;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

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
