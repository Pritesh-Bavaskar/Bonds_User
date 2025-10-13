import { TextField, InputAdornment, Autocomplete } from '@mui/material';
import Iconify from 'src/components/iconify'; // default export
import PropTypes from 'prop-types';

export default function FaqsSearch({ query, results, onSearch, loading, sx }) {
  return (
    <Autocomplete
      sx={{ width: '100%', maxWidth: 1000, ...sx }}
      loading={loading}
      autoHighlight
      popupIcon={null}
      options={results || []}
      getOptionLabel={(option) => option.title || ''}
      onInputChange={(event, newValue) => onSearch?.(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search through all FAQs"
          sx={{
            [`& .MuiOutlinedInput-root`]: {
              bgcolor: 'common.white',
              borderRadius: 999,
              boxShadow: (theme) => theme.shadows[2],
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

FaqsSearch.propTypes = {
  query: PropTypes.string,
  results: PropTypes.array,
  onSearch: PropTypes.func,
  loading: PropTypes.bool,
  sx: PropTypes.object,
};
