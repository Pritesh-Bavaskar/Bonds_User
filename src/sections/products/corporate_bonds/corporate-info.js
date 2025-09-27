import { Box, Container, Typography, Stack } from "@mui/material";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function ListedCorporateBonds() {
  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between children animations
      },
    },  
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <LazyMotion features={domAnimation}>
      <Container maxWidth="md" sx={{ textAlign: "center", py: 6 }}>
        {/* Title */}
        <m.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h3"
            
            sx={{
              fontFamily: "Public Sans, sans-serif",
              lineHeight: "64px",
              fontWeight: 700,
              color: "primary.main",
              mb: 3,
              
            }}
          >
            <Box component="span" sx={{ color: "primary.main" }}>
              What Are Listed
            </Box>{" "}
            <Box component="span" sx={{ color: "warning.main" }}>
              Corporate Bonds?
            </Box>
          </Typography>
        </m.div>

        {/* Paragraphs with stagger animation */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Stack
            spacing={4}
            sx={{
              fontFamily: "Public Sans, sans-serif",
              fontSize: "20px",
              fontWeight: "300",
              fontStyle: "light",
              lineHeight: "150%",
              color: "black",
            }}
          >
            <m.div variants={itemVariants}>
              <Typography>
                Listed Corporate Bonds are debt securities issued by
                corporations and traded on recognized stock exchanges like NSE
                and BSE. These instruments allow companies to raise capital
                while offering investors fixed-income opportunities with
                transparent pricing and regulatory oversight.
              </Typography>
            </m.div>

            <m.div variants={itemVariants}>
              <Typography>
                Unlike traditional fixed deposits, these bonds are regulated by
                SEBI and provide enhanced liquidity through exchange trading.
                They offer institutional-grade investment opportunities
                previously accessible only to large investors, now available to
                retail participants.
              </Typography>
            </m.div>

            <m.div variants={itemVariants}>
              <Typography>
                Each bond comes with defined tenure, coupon rates, and credit
                ratings, enabling investors to make informed decisions based on
                their risk appetite and return expectations.
              </Typography>
            </m.div>
          </Stack>
        </m.div>
      </Container>
    </LazyMotion>
  );
}
