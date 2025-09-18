import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
//
// utils
import { fDate } from 'src/utils/format-time';
//
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function PostItem({ post, index }) {
  const theme = useTheme();

  const { coverUrl, title, author, createdAt, description } = post;

  return (
    <Card
      sx={{
        borderRadius: 1.25,
        border: `1px solid ${alpha(theme.palette.grey[500], 0.16)}`,
        boxShadow: `0 8px 22px ${alpha(theme.palette.grey[500], 0.12)}`,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Image alt={title} src={coverUrl} ratio="4/3" />

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Chip
            size="small"
            label="Education"
            sx={{
              bgcolor: '#CDDFFF',
              color: theme.palette.primary.main,
              fontWeight: 300,
              borderRadius: '12px',
              fontSize: '12px',
            }}
          />
          <Typography
            variant="caption"
            color={theme.palette.primary.main}
            sx={{ fontWeight: 400, fontSize: '12px' }}
          >
            8 min read
          </Typography>
        </Stack>

        <Link
          color="inherit"
          component={RouterLink}
          href={paths.post.details(title)}
          underline="none"
        >
          <TextMaxLine
            line={2}
            persistent
            sx={{ fontWeight: 400, fontSize: 14, color: '#292929', mt: 2 }}
          >
            {title}
          </TextMaxLine>
        </Link>

        <Typography
          sx={{
            mt: 1,
            fontWeight: 300,
            fontStyle: 'light',
            fontSize: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description ||
            'Explore the emerging trends in corporate bond markets, from ESG integration to digital trading platforms, and how they’re reshaping investment strategies for the coming year.'}
        </Typography>
      </CardContent>

      <Box sx={{ px: 3, pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Box
            component="img"
            src="/assets/images/blogs/avatar.svg"
            alt="author"
            sx={{ width: 16, height: 16 }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 300,
              fontStyle: 'light',
              fontSize: '12px',
              color: '#000000',
              pr: 1,
            }}
          >
            {author?.name || 'Admin'}
          </Typography>
          <Box
            component="img"
            src="/assets/images/blogs/calendar.svg"
            alt="date"
            sx={{ width: 16, height: 16 }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 300,
              fontStyle: 'light',
              fontSize: '12px',
              color: '#000000',
            }}
          >
            {fDate(createdAt)}
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={20} />}
          sx={{
            borderRadius: '3px',
            bgcolor: theme.palette.grey[900],
            color: theme.palette.common.white,
            fontWeight: 600,
            fontStyle: 'SemiBold',
            fontSize: '12px',
            '&:hover': {
              bgcolor: theme.palette.grey[800],
              color: theme.palette.common.white,
            },
          }}
          component={RouterLink}
          href={paths.post.details(title)}
        >
          Read full article
        </Button>
      </Box>
    </Card>
  );
}

PostItem.propTypes = {
  index: PropTypes.number,
  post: PropTypes.object,
};

// ----------------------------------------------------------------------

export function PostContent() {
  return null;
}
