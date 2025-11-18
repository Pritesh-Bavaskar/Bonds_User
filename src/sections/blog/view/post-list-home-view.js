import orderBy from 'lodash/orderBy';
import { useCallback, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
// hooks
import { useDebounce } from 'src/hooks/use-debounce';
// _mock
// api
import { useGetPosts, useSearchPosts } from 'src/api/blog';
// components
import { useSettingsContext } from 'src/components/settings';
//
import PostList from '../post-list';
import PostHero from '../post-hero';
import PostCategories from '../post-categories';
import PostFeature from '../post-feature';

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('latest');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { posts, postsLoading } = useGetPosts();

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  // Mock posts used as a fallback when API data is not yet available
  const MOCK_POSTS = [
    {
      id: 'post-1',
      title: 'The Rise of Alternative Investments: Why They Matter for You',
      coverUrl: '/assets/images/blogs/featured.png',
      description:
        'India’s alternative investment market is growing faster than ever, attracting both beginners and seasoned investors. From corporate bonds and asset leasing to invoice discounting, these options offer unique advantages beyond traditional avenues. In 2023 alone, commitments to Alternative Investment Funds (AIFs) reached record highs, with the AIF-to-GDP ratio at ~3% — and it’s expected to double in the coming years. Discover why exploring alternative investments could strengthen and diversify your portfolio.',
      author: { name: 'xyz.co' },
      createdAt: new Date().toISOString(),
      categories: ['Alternative Investments', 'Personal Finance'],
      totalViews: 1200,
      readingTime: '6 min read',
    },
    {
      id: 'post-2',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog1.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Research Desk' },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      categories: ['Education'],
      totalViews: 980,
      readingTime: '7 min read',
    },
    {
      id: 'post-3',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog2.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Finance Coach' },
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      categories: ['Taxes'],
      totalViews: 1520,
      readingTime: '5 min read',
    },
    {
      id: 'post-4',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog3.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Bonds Team' },
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      categories: ['Strategy'],
      totalViews: 640,
      readingTime: '8 min read',
    },
    {
      id: 'post-5',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog1.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Research Desk' },
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      categories: ['Education'],
      totalViews: 830,
      readingTime: '4 min read',
    },
    {
      id: 'post-6',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog2.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Bonds Team' },
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      categories: ['Education'],
      totalViews: 410,
      readingTime: '6 min read',
    },
    {
      id: 'post-7',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog3.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Finance Coach' },
      createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      categories: ['Markets'],
      totalViews: 1330,
      readingTime: '7 min read',
    },
    {
      id: 'post-8',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog1.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Research Desk' },
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      categories: ['Strategy'],
      totalViews: 720,
      readingTime: '6 min read',
    },
    {
      id: 'post-9',
      title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
      coverUrl: '/assets/images/blogs/blog2.png',
      description:
        "Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they're reshaping investment strategies for the coming year.",
      author: { name: 'Finance Coach' },
      createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
      categories: ['Markets'],
      totalViews: 1010,
      readingTime: '7 min read',
    },
  ];

  const dataFiltered = applyFilter({
    inputData: MOCK_POSTS,
    sortBy,
  });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  // Mock JSON object for the featured hero (fallback if posts not loaded yet)
  const FEATURED_FALLBACK = {
    id: 'featured-1',
    title: 'The Rise of Alternative Investments: Why They Matter for You',
    coverUrl: '/assets/images/blogs/blog1.png',
    categories: ['Alternative Investments', 'Personal Finance'],
    readingTime: '8 min read',
    description:
      'India’s alternative investment market is growing faster than ever, attracting both beginners and seasoned investors. From corporate bonds and asset leasing to invoice discounting, these options offer unique advantages beyond traditional avenues. In 2023 alone, commitments to Alternative Investment Funds (AIFs) reached record highs, with the AIF-to-GDP ratio at ~3% — and it’s expected to double in the coming years. Discover why exploring alternative investments could strengthen and diversify your portfolio.',
    author: { name: 'xyz co.' },
    createdAt: new Date().toISOString(),
  };

  const featured = dataFiltered?.[0]
    ? {
      id: dataFiltered[0].id,
      title: dataFiltered[0].title,
      coverUrl: dataFiltered[0].coverUrl,
      categories: dataFiltered[0].categories || ['Alternative Investments', 'Personal Finance'],
      readingTime: dataFiltered[0].readingTime || '8 min read',
      description: dataFiltered[0].description || FEATURED_FALLBACK.description,
      author: dataFiltered[0].author || FEATURED_FALLBACK.author,
      createdAt: dataFiltered[0].createdAt || FEATURED_FALLBACK.createdAt,
    }
    : FEATURED_FALLBACK;

  return (
    <>
      {/* Full-width hero background via PostHero */}
      <PostHero
        featured={featured}

        containerMaxWidth={settings.themeStretch ? false : 'lg'}
      />

      {/* Categories pills under the hero */}

      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 4 }}>
        <PostCategories query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading} />
      </Container>

      {/* Featured Insights heading */}
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 4 }}>
        <PostFeature posts={dataFiltered} />
      </Container>

      {/* Post list container */}
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        {/* <PostList posts={dataFiltered} loading={postsLoading} /> */}
        <PostList posts={dataFiltered} />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, sortBy }) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc']);
  }

  return inputData;
};
