import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDate } from 'src/utils/format-time';
// components
import Image from 'src/components/image';
import PostSearch from './post-search';

// ----------------------------------------------------------------------

export default function PostHero({
  featured,
  query,
  results,
  onSearch,
  loading,
  containerMaxWidth = 'lg',
}) {
  return (
    <Box sx={{ bgcolor: '#062b57', py: { xs: 3, md: 6 } }}>
      <Container maxWidth={containerMaxWidth}>
        <Stack
          spacing={3}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-end', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ mb: { xs: 0, md: 0 } }}
        >
          <Box
            sx={{
              width: 1,
              color: 'common.white',
              borderRadius: 3,
              px: { xs: 2, sm: 3, md: 5 },
              py: { xs: 2.5, sm: 3, md: 5 },
              bgcolor: 'transparent',
            }}
          >
            <Grid
              container
              spacing={{ xs: 2.5, md: 5 }}
              alignItems={{ xs: 'stretch', md: 'center' }}
            >
              {/* Left: Image */}
              <Grid item xs={12} md={6}>
                <Image
                  alt={featured?.title}
                  src={featured?.coverUrl}
                  ratio="16/9"
                  sx={{ borderRadius: '27px', width: 1 }}
                />
              </Grid>

              {/* Right: Content */}
              <Grid item xs={12} md={6}>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  {/* Meta row */}
                  <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
                    {(featured?.categories || []).slice(0, 2).map((cat) => (
                      <Chip
                        key={cat}
                        label={cat}
                        size="small"
                        sx={{
                          bgcolor: 'transparent',
                          border: '1px solid #FFFFFF',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontWeight: 300,
                        }}
                      />
                    ))}
                    <Typography
                      variant="caption"
                      sx={{
                        ml: { md: 'auto' },
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: 300,
                      }}
                    >
                      {featured?.readingTime}
                    </Typography>
                  </Stack>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      fontStyle: 'ExtraBold',
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                    }}
                  >
                    {featured?.title}
                  </Typography>

                  {/* Excerpt */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 300,
                      fontStyle: 'Italic',
                      fontSize: '14px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      opacity: 0.86,
                      maxWidth: 720,
                    }}
                  >
                    {featured?.description}
                  </Typography>

                  {/* Read more button */}
                  <Box>
                    <Button
                      component={RouterLink}
                      href={paths.post.details(featured?.title)}
                      variant="contained"
                      color="inherit"
                      sx={{
                        bgcolor: 'common.white',
                        color: 'primary.main',
                        fontWeight: 700,
                        px: 2.5,
                        py: 1,
                        width: 1,
                        borderRadius: 1,
                        justifyContent: 'flex-start',
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      {'Read More >'}
                    </Button>
                  </Box>

                  {/* Footer row */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.72,
                        fontFamily: 'Public Sans, sans-serif',
                        fontWeight: 300,
                        fontStyle: 'Light',
                        fontSize: '10px',
                        lineHeight: '24px',
                        letterSpacing: '0px',
                      }}
                    >
                      {featured?.author?.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.72,
                        fontFamily: 'Public Sans, sans-serif',
                        fontWeight: 300,
                        fontStyle: 'Light',
                        fontSize: '10px',
                        lineHeight: '24px',
                        letterSpacing: '0px',
                      }}
                    >
                      •
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.72,
                        fontFamily: 'Public Sans, sans-serif',
                        fontWeight: 300,
                        fontStyle: 'Light',
                        fontSize: '10px',
                        lineHeight: '24px',
                        letterSpacing: '0px',
                      }}
                    >
                      {fDate(featured?.createdAt)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            {/* Search under the hero content */}
            <Grid container justifyContent="flex-start" sx={{ mt: { xs: 2.5, md: 4 } }}>
              {/* Left: under image column (md=6), center the search within this column */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PostSearch
                    query={query}
                    results={results}
                    onSearch={onSearch}
                    loading={loading}
                    hrefItem={(title) => paths.post.details(title)}
                    sx={{ width: 1, maxWidth: 480 }}
                  />
                </Box>
              </Grid>
              {/* Right: empty to keep alignment with the 6/6 layout above */}
              <Grid item xs={false} md={6} />
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

PostHero.propTypes = {
  featured: PropTypes.object,
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
  containerMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
