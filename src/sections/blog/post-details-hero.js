import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// utils
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function PostDetailsHero({ title, author, coverUrl, createdAt }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', pt: { xs: 4, md: 6 }, pb: { xs: 2, md: 4 } }}>
      <Container>
        <Stack alignItems="center" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              fontStyle: 'Medium',
              fontSize: 36,
              lineHeight: '45px',
              letterSpacing: '0px',
              mb: { xs: 2, md: 3 },
              maxWidth: 900,
            }}
          >
            {title}
          </Typography>

          <Box
            component="img"
            alt={title}
            src={coverUrl}
            sx={{
              width: 1,
              maxWidth: 960,
              height: 600,
              borderRadius: 2,
              boxShadow: (theme) => theme.customShadows?.card || theme.shadows[3],
            }}
          />

          {(author || createdAt) && (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                width: 1,
                maxWidth: 960,
                color: 'text.secondary',
                typography: 'body2',
                mt: { xs: 1.5, md: 2 },
              }}
            >
              <Typography sx={{ opacity: 1, fontWeight: 300, fontStyle: 'Light', fontSize: 14, lineHeight: '24px', letterSpacing: '0px' }}>
                {author?.company || author?.name || ''}
              </Typography>
              <Typography
                sx={{
                  opacity: 1,
                  fontWeight: 300,
                  fontStyle: 'Light',
                  fontSize: '10px',
                  lineHeight: '24px',
                  letterSpacing: '0px',
                }}
              >
                {createdAt ? fDate(createdAt) : ''}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

PostDetailsHero.propTypes = {
  author: PropTypes.object,
  coverUrl: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
};
