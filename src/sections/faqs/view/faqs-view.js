// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//
import FaqsHero from '../faqs-hero';
import FaqsList from '../faqs-list';
import FaqsForm from '../faqs-form';
import FaqsCategory from '../faqs-category';

// ----------------------------------------------------------------------

export default function FaqsView() {
  return (
    <>
      <FaqsHero />

      <Container
        sx={{
          pb: 10,
          pt: { xs: 10, md: 15 },
          position: 'relative',
        }}
      >
        <FaqsCategory />

        <Typography
          variant="h3"
          display="flex"
          justifyContent="center"
          sx={{
            fontFamily: 'Public Sans',
            fontWeight: 800, // ExtraBold
            fontStyle: 'normal',
            fontSize: '48px',
            lineHeight: '64px',
            letterSpacing: '0px',
            textAlign: 'center',
            my: { xs: 5, md: 10 },
            color:'#00328A',
          }}
        >
          Frequently asked questions
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 10,
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            px: 2,
          }}
        >
          <FaqsList />

          {/* <FaqsForm /> */}
        </Box>
      </Container>
    </>
  );
}
