import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MotionContainer, varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function AboutUnListBond() {
  return (
    <Box
      sx={{
        height: {xs:400, md: 560 },
        py: { xs: 10, md: 0 },
        mx: 'auto',
        maxWidth: 1600,
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url(/assets/images/products/unlisted_bond.jpeg)',
      }}
    > 
      <Container component={MotionContainer}>
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '30%', md: '25%' },
            left: { xs: '5%', md: '8%' },
            textAlign: { xs: 'center', md: 'left' },
            color: 'common.white',
          }}
        >

          <m.div variants={varFade().inRight}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', mt: -7 }}>
              <Box component="span" sx={{ color: 'orange' }}>
                Unlisted 
              </Box>{" "}
              <Box component="span" sx={{ color: 'primary.main' }}>
                 Bonds
              </Box>
            </Typography>
          </m.div>

          {/* Subtitle */}
          <m.div variants={varFade().inUp}>
            <Typography
              variant="subtitle1"
              sx={{ mt: 2, maxWidth: 400, color: 'primary.main' }} 
            >
              Privately placed debt instruments offering higher
               yields but lower liquidity.
            </Typography>
          </m.div>

          {/* Buttons */}
          <m.div variants={varFade().inUp}>
            <Stack
          
              spacing={2} 
              direction="row"
              sx={{ display:'flex',
                pr:2,
                flexDirection: { xs: 'column', md: 'row' },
                mt: 4,
                 justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'common.white',
                  color: '#003289',
                  '&:hover': { bgcolor: 'grey.200' },
                }}
              >
                Explore Unlisted Bond Opportunities
                <Iconify
                    icon={"solar:arrow-up-linear"}
                    width={20}   
                    height={20}
                    margin='2px'
                    color={"#003289"} 
                    style={{ transform: 'rotate(45deg)', transition: '0.3s' }}
                />

              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'common.black',
                  color: 'common.white',
                  '&:hover': { bgcolor: 'grey.800' },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
