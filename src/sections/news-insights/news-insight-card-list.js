import React from 'react';
import { Grid, Box, Container } from '@mui/material';
import NewsInsightCard from './news-insight-card';

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
    <Box
      sx={{
        width: '100%',
        mx: 'auto',
        px: { xs: 2, md: 3 },
        mb: { xs: 10, md: 15 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 6 }} justifyContent="center">
          {cardsData.map((card, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <NewsInsightCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
