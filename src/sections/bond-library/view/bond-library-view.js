// @mui
import { useState } from 'react';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import BondLibraryHero from '../bond-library-hero';
import BondLibraryList from '../bond-library-list';
import BondLibraryDisclaimer from '../bond-library-disclaimer';
import BondLibraryQuestion from '../bond-library-question';
import { useGetBondsFilter } from 'src/api/bonds';

// ----------------------------------------------------------------------

export default function BondLibraryView() {
  const settings = useSettingsContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Build the filter string based on search term
  const buildFilterString = (term) => {
    const params = new URLSearchParams();
    params.append('page_size', '15');
    if (term) {
      params.append('isin', term);
    }
    return params.toString();
  };

  const { Bonds } = useGetBondsFilter(buildFilterString(searchTerm));
  
  const handleSearchChange = (term) => {
    setSearchTerm(term.trim());
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <BondLibraryHero />
      <BondLibraryList 
        bonds={Bonds} 
        onSearchChange={handleSearchChange} 
      />
      <BondLibraryDisclaimer />
      <BondLibraryQuestion />
    </Container>
  );
}
