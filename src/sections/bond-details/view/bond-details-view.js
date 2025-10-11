import { Container } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import BondDetailsHero from '../bond-details-hero';

export default function BondDetailsView() {
  const settings = useSettingsContext();
  
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ py: 5 }}>
      <BondDetailsHero />
      
    </Container>
  );
}
