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
import { useGetBonds } from 'src/api/bonds';

// ----------------------------------------------------------------------

export default function BondLibraryView() {
  const settings = useSettingsContext();

  const {Bonds} = useGetBonds();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <BondLibraryHero />
      <BondLibraryList bonds={Bonds} />
      <BondLibraryDisclaimer />
      <BondLibraryQuestion />
    </Container>
  );
}
