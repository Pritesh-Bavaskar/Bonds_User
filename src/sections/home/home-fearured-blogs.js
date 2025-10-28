import { Box, Typography, Container, Grid, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import PostItem from 'src/sections/blog/post-item';

// ----------------------------------------------------------------------

const MOCK_FEATURED = [
  {
    id: 'f1',
    title: 'The Future of Corporate Bond Investing: Trends Shaping 2025',
    coverUrl: '/assets/background/overlay_2.jpg',
    description:
      'Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they’re reshaping investment strategies for the coming year.',
    author: { name: 'Priya Sharma', avatarUrl: '/assets/icons/components/ic_avatar.svg' },
    createdAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: 'f2',
    title: 'Top Strategies To Improve Fixed Income Returns This Year',
    coverUrl: '/assets/background/overlay_3.jpg',
    description:
      'From laddering portfolios to interest-rate hedging, discover practical approaches to optimize returns without taking on excessive risk.',
    author: { name: 'Rahul Mehta', avatarUrl: '/assets/icons/components/ic_avatar.svg' },
    createdAt: '2025-01-10T00:00:00.000Z',
  },
  {
    id: 'f3',
    title: 'Understanding Yield vs. Coupon: A Beginner’s Guide',
    coverUrl: '/assets/background/overlay_4.jpg',
    description:
      'Learn the key differences between yield and coupon, why they diverge, and how each impacts your bond’s total return.',
    author: { name: 'Anita Kulkarni', avatarUrl: '/assets/icons/components/ic_avatar.svg' },
    createdAt: '2025-01-05T00:00:00.000Z',
  },
];

export default function HomeFeaturedBlogs() {
  const theme = useTheme();

  const featured = MOCK_FEATURED;

  return (
    <Box component="section" sx={{ pt: { xs: 6, md: 15 } }}>
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant='h1'
          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
        >
          Featured Blogs
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: { xs: 4, md: 6 } }}>
          {featured.map((post, idx) => (
            <Grid key={post.id || idx} item xs={12} sm={6} md={4}>
              <PostItem post={post} index={idx} />
            </Grid>
          ))}
        </Grid>

        <Stack alignItems="center" sx={{ mt: { xs: 4, md: 6 } }}>
          <Button
            component={RouterLink}
            href={paths.post.root || '/blog'}
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 1.25, fontWeight: 700, fontSize: { xs: 14, md: 16 }, paddingX: '64px', paddingY: '12px' }}
          >
            View all blogs
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
