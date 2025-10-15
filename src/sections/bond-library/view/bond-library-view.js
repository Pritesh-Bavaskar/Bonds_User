// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
// components
import { useSettingsContext } from 'src/components/settings';
import BondLibraryHero from '../bond-library-hero'; 
import BondLibraryList from '../bond-library-list';
import BondLibraryDisclaimer from '../bond-library-disclaimer';
import BondLibraryQuestion from '../bond-library-question';
import { useGetBonds } from 'src/api/bonds';

// ----------------------------------------------------------------------

export default function BondLibraryView() {
  const settings = useSettingsContext();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { 
    Bonds, 
    pagination, 
    BondsLoading, 
    BondsError, 
    BondsEmpty 
  } = useGetBonds(page, pageSize);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when page size changes
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <BondLibraryHero />
      <BondLibraryList 
        bonds={Bonds} 
        loading={BondsLoading}
        error={BondsError}
        empty={BondsEmpty}
        page={page}
        pageSize={pageSize}
        totalItems={pagination?.count || 0}
        totalPages={pagination?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      <BondLibraryDisclaimer />
      <BondLibraryQuestion />
    </Container>
  );
}
