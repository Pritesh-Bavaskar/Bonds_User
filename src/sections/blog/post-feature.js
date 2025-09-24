import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// local
import PostList from './post-list';

// ----------------------------------------------------------------------

export default function PostFeature({ title, subtitle, posts = [], sx }) {
  return (
    <Box sx={{ textAlign: 'center', ...sx }}>
      <Stack spacing={1} alignItems="center">
        <Typography
          variant="h1"
          color="primary.main"
          sx={{
            fontWeight: 700,
            fontStyle: 'bold',
            lineHeight: '64px',
            letterSpacing: '0px',
          }}
        >
          {title || 'Featured Insights'}
        </Typography>

        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            fontWeight: 400,
            fontStyle: 'regular',
            fontSize: '20px',
            lineHeight: '140%',
            letterSpacing: '0%',
          }}
        >
          {subtitle ||
            'In-depth analysis and expert perspectives on the most important developments in bond markets.'}
        </Typography>
      </Stack>

      {/* Featured posts list (limited to 2) */}
      {posts.length > 0 && (
        <Box sx={{ mt: { xs: 3, md: 4 }, textAlign: 'left' }}>
          <PostList posts={posts.slice(0, 2)} isFeatured />
        </Box>
      )}
    </Box>
  );
}

PostFeature.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  posts: PropTypes.array,
  sx: PropTypes.object,
};
