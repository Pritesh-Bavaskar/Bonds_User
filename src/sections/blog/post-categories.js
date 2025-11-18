import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'src/routes/hook';
// @mui
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { paths } from 'src/routes/paths';
import { Box, Grid } from '@mui/material';
import PostSearch from './post-search';

// ----------------------------------------------------------------------

// A simple pill-style categories selector.
// - Default categories are based on the provided screenshot
// - Uses MUI Chips: outlined by default, primary-filled when active
// - Can be used in controlled or uncontrolled mode
export default function PostCategories({ items, value, onChange, sx, query,
  results,
  onSearch,
  loading, }) {
  const defaultItems = [
    'All',
    'Corporate Bonds',
    'Government Bonds',
    'Unlisted Bonds',
    'listed Bonds',
  ];

  const categories = items && items.length ? items : defaultItems;

  const [internal, setInternal] = useState(categories[0]);
  const selected = value !== undefined ? value : internal;

  const router = useRouter();

  const handleSelect = (cat) => {
    if (value === undefined) {
      setInternal(cat);
    }
    onChange?.(cat);

    // Handle navigation based on the selected category
    switch (cat) {
      case 'Corporate Bonds':
        router.push('/products/corporate_bond');
        break;
      case 'Government Bonds':
        router.push('/products/government-bond');
        break;
      case 'listed Bonds':
        router.push('/products/listed-bond');
        break;
      case 'Unlisted Bonds':
        router.push('/products/unlisted-bond');
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 1.5, md: 2 }}
      flexWrap="wrap"
      alignItems="center"
      justifyContent={{ xs: 'flex-start', sm: 'center' }}
      sx={{
        px: { xs: 2, md: 0 },
        py: 2,
        ...sx,
      }}
    >

      <Grid container justifyContent="center" sx={{ mt: { xs: 1, md: 1 } }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '60%' }}>
            <PostSearch
              query={query}
              results={results}
              onSearch={onSearch}
              loading={loading}
              hrefItem={(title) =>
                results?.some((item) => item.title === title)
                  ? paths.post.details(title)
                  : null
              }
              sx={{ width: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>

      {categories.map((cat) => {
        const active = selected === cat;
        return (
          <Chip
            key={cat}
            label={cat}
            onClick={() => handleSelect(cat)}
            size="small"
            color={active ? 'primary' : 'default'}
            variant={active ? 'filled' : 'outlined'}
            sx={{
              borderRadius: 999,
              px: 1,
              height: 30,
              fontWeight: 500,
              '& .MuiChip-label': { px: 1.25 },
            }}
          />
        );
      })}
    </Stack>
  );
}

PostCategories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  sx: PropTypes.object,
  featured: PropTypes.object,
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
};
