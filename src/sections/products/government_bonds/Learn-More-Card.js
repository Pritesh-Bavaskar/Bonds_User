// Add this import at the top if not already present
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// If you have your own Iconify setup, you can use that instead of MUI icons
// import Iconify from 'src/components/iconify';

function LearnMoreCard() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: '#00296B',
        color: '#fff',
        borderRadius: 3,
        p: { xs: 4, md: 5 },
        maxWidth: 450,
        height:280,
        mx: { xs: 2, md: 'auto'  },  // horizontal margin for small screens          // centers horizontally
        textAlign: 'center',
        boxShadow: 3,
        mt: 4,
        mb:10,
      }}
    >
      {/* Icon */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
          <path stroke="#00C48C" strokeWidth="2" d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h4.5a2.25 2.25 0 0 1 2.25 2.25v11.25A2.25 2.25 0 0 0 9.75 20.25h-4.5A2.25 2.25 0 0 1 3 18V6.75Zm18 0A2.25 2.25 0 0 0 18.75 4.5h-4.5A2.25 2.25 0 0 0 12 6.75v11.25a2.25 2.25 0 0 1 2.25 2.25h4.5A2.25 2.25 0 0 0 21 18V6.75Z"/>
        </svg>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Learn More
      </Typography>
      <Typography sx={{ mb: 3, fontSize: 15 }}>
        Explore comprehensive guides and resources about government bond investing.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: '#fff',
          color: '#00296B',
          fontWeight: 600,
          borderRadius: 1.5,
          px: 2.5,
          py: 1,
          boxShadow: 'none',
          '&:hover': { bgcolor: '#f3f6f9' },
        }}
        endIcon={<OpenInNewIcon sx={{ fontSize: 18 }} />}
        href="https://your-educational-resource-link.com"
        target="_blank"
      >
        Educational Resources
      </Button>
    </Box>
  );
}


export default LearnMoreCard;