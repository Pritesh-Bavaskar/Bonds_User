import { Box, Grid, MenuItem, Select, Typography, Container } from '@mui/material';
import NewsInsightSearch from './news-insights-search';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { paths } from 'src/routes/paths';

const cardsData = [
  {
    title: 'Breaking News 1',
    date: '2025-09-29',
    subtitle: 'This is the subtitle for card 1',
    subtitleBold: 'Important detail 1',
  },
  {
    title: 'Breaking News 2',
    date: '2025-09-28',
    subtitle: 'This is the subtitle for card 2',
    subtitleBold: 'Important detail 2',
  },
  {
    title: 'Breaking News 3',
    date: '2025-09-27',
    subtitle: 'This is the subtitle for card 3',
    subtitleBold: 'Important detail 3',
  },
  {
    title: 'Breaking News 4',
    date: '2025-09-26',
    subtitle: 'This is the subtitle for card 4',
    subtitleBold: 'Important detail 4',
  },
];

export default function NewsInsightSearchSort({ query, results, onSearch, loading }) {
  const [sortBy, setSortBy] = useState('latest');

  const sortedCards = [...cardsData].sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
    else return new Date(a.date) - new Date(b.date);
  });

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#E8F3FF',
        py: 5,
        mt: '50px',
        mb: '50px',
      }}
    >
      {/* ✅ Use Container with maxWidth="lg" to center and limit width */}
      <Container maxWidth="lg">
        <Box
          sx={{
            mx: 'auto',
            width: 1,
            maxWidth: { xs: '100%', sm: '100%', md: '1200px' },
          }}
        >
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 0, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {/* 🔍 Search Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <NewsInsightSearch
                  query={query}
                  results={results}
                  onSearch={(val) => console.log('Searching for:', val)}
                  loading={loading}
                  hrefItem={(title) => paths.post.details(title)}
                  sx={{ width: 1, maxWidth: 400 }}
                />
              </Box>
            </Grid>

            {/* 🔽 Sort Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'start', md: 'end' },
                  alignItems: 'center',
                  gap: 1,
                  mt: { xs: 2, md: 0 },
                }}
              >
                <Typography>Sort By</Typography>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ minWidth: 96, height: 36 }}
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="old">Old</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

NewsInsightSearchSort.propTypes = {
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
};
