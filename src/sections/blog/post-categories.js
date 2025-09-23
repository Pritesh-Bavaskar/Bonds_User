import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

// ----------------------------------------------------------------------

// A simple pill-style categories selector.
// - Default categories are based on the provided screenshot
// - Uses MUI Chips: outlined by default, primary-filled when active
// - Can be used in controlled or uncontrolled mode
export default function PostCategories({ items, value, onChange, sx }) {
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

  const handleSelect = (cat) => {
    if (value === undefined) {
      setInternal(cat);
    }
    onChange?.(cat);
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
};
