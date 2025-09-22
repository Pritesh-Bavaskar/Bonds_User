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
      title: 'Understanding Corporate Bonds: A Beginner’s Guide',
      coverUrl: '/assets/background/overlay_3.jpg',
      description:
        'Learn the basics of corporate bonds, how they work, and how to evaluate risk and returns before investing.',
      author: { name: 'Bonds Team' },
      createdAt: new Date().toISOString(),
      categories: ['Education'],
      totalViews: 1200,
      readingTime: '6 min read',
    },
    {
      id: 'post-2',
      title: 'How To Evaluate Bond Ratings And Yield',
      coverUrl: '/assets/background/overlay_4.jpg',
      description:
        'A practical framework to read bond ratings, interpret yields, and balance risk with expected returns.',
      author: { name: 'Research Desk' },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      categories: ['Education'],
      totalViews: 980,
      readingTime: '7 min read',
    },
    {
      id: 'post-3',
      title: 'Taxation Of Interest Income In India: What To Know',
      coverUrl: '/assets/background/overlay_2.jpg',
      description:
        'From TDS to ITR reporting—understand how interest from bonds and FDs is taxed and how to optimize.',
      author: { name: 'Finance Coach' },
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      categories: ['Taxes'],
      totalViews: 1520,
      readingTime: '5 min read',
    },
    {
      id: 'post-4',
      title: 'Fixed-Income Vs Equity: Building A Balanced Portfolio',
      coverUrl: '/assets/background/overlay_2.jpg',
      description:
        'We compare risk, liquidity, and returns to help you decide the right mix for your risk profile.',
      author: { name: 'Bonds Team' },
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      categories: ['Strategy'],
      totalViews: 640,
      readingTime: '8 min read',
    },
    {
      id: 'post-5',
      title: 'What Is Yield To Maturity (YTM)?',
      coverUrl: '/assets/background/overlay_4.jpg',
      description:
        'YTM explained in simple terms with examples and how it impacts your real return from bonds.',
      author: { name: 'Research Desk' },
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      categories: ['Education'],
      totalViews: 830,
      readingTime: '4 min read',
    },
    {
      id: 'post-6',
      title: 'Top 5 Myths About Corporate Bonds—Busted',
      coverUrl: '/assets/background/overlay_3.jpg',
      description:
        'We debunk common misconceptions around safety, liquidity, and who should invest in bonds.',
      author: { name: 'Bonds Team' },
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      categories: ['Education'],
      totalViews: 410,
      readingTime: '6 min read',
    },
    {
      id: 'post-7',
      title: 'How Interest Rate Changes Impact Bond Prices',
      coverUrl: '/assets/background/overlay_2.jpg',
      description:
        'Understand duration and price sensitivity so you can position your bond ladder wisely.',
      author: { name: 'Finance Coach' },
      createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      categories: ['Markets'],
      totalViews: 1330,
      readingTime: '7 min read',
    },
    {
      id: 'post-8',
      title: 'Laddering Strategy: Smoother Income, Better Liquidity',
      coverUrl: '/assets/background/overlay_4.jpg',
      description:
        'A simple bond ladder can help manage reinvestment risk while keeping cash flows steady.',
      author: { name: 'Research Desk' },
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      categories: ['Strategy'],
      totalViews: 720,
      readingTime: '6 min read',
    },
    {
      id: 'post-9',
      title: 'The Impact Of Inflation On Bond Prices',
      coverUrl: '/assets/background/overlay_2.jpg',
      description:
        'Understand how inflation affects bond prices and how to position your bond portfolio.',
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
    coverUrl: '/assets/background/overlay_3.jpg',
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
        query={debouncedQuery}
        results={searchResults}
        onSearch={handleSearch}
        loading={searchLoading}
        containerMaxWidth={settings.themeStretch ? false : 'lg'}
      />

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
