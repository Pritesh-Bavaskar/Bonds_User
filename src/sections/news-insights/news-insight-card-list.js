import React, { useState } from 'react';
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import NewsInsightCard from './news-insight-card';
import { paths } from 'src/routes/paths';
import PropTypes from 'prop-types';
import NewsInsightSearch from './news-insights-search';

const cardsData = [
  {
    title: 'Breaking News 1',
    date: '2025-09-29',
    subtitle: 'This is the subtitle for card 1',
    subtitleBold: 'IMPORTANT DETAIL 1',
  },
  {
    title: 'Breaking News 2',
    date: '2025-09-28',
    subtitle: 'This is the subtitle for card 2',
    subtitleBold: 'IMPORTANT DETAIL 2',
  },
  {
    title: 'Breaking News 3',
    date: '2025-09-27',
    subtitle: 'This is the subtitle for card 3',
    subtitleBold: 'IMPORTANT DETAIL 3',
  },
  {
    title: 'Breaking News 4',
    date: '2025-09-26',
    subtitle: 'This is the subtitle for card 4',
    subtitleBold: 'IMPORTANT DETAIL 4',
  },
];
export default function NewsInsightCardList() {
  
  return (
    <Grid
      container
      rowSpacing={3}
      columnGap={10}
      // columnSpacing={{ xs: 0, md: 10 }}
      justifyContent="center"
      sx={{
        width: '100%',
        maxWidth: '1100px',
        mx: { md: 'auto', xs: 0 },
        px: { md: 0, xs: 2 },
        mb: '150px',
        // gap: { xs: 2, md: 10 },
      }}
    >
      {cardsData.map((card, index) => (
        <Grid
          item
          key={index}
          md={5}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <NewsInsightCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}


