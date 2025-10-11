// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import BondLibraryHero from '../bond-library-hero'; 
import BondLibraryList from '../bond-library-list';
import BondLibraryDisclaimer from '../bond-library-disclaimer';
import BondLibraryQuestion from '../bond-library-question';

// ----------------------------------------------------------------------

export default function BondLibraryView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <BondLibraryHero />
      <BondLibraryList />
      <BondLibraryDisclaimer />
      <BondLibraryQuestion />
    </Container>
  );
}
