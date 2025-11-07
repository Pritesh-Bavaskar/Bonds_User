import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { m, AnimatePresence } from 'framer-motion';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

export default function MultiStepLoginDialog({ open, onClose }) {
  const [step, setStep] = useState('phone');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(Array(4).fill(''));

  const handleNext = () => {
    if (step === 'phone') setStep('otp');
    else if (step === 'otp') setStep('details');
    else if (step === 'details') setStep('emailOtp');
  };

  const handleBack = () => {
    if (step === 'otp') setStep('phone');
    else if (step === 'details') setStep('otp');
    else if (step === 'emailOtp') setStep('details');
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const login_img = '/assets/images/issuer-login/login-img.png'; // replace with your image

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <DialogContent sx={{ p: 0, zIndex: 1, backgroundColor: 'transparent' }}>
        <Paper
          sx={{
            display: 'flex',
            minHeight: 400,
            borderRadius: 0,
            backgroundColor: 'transparent',
          }}
        >
          {/* Left Side - Form Steps */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              {step === 'phone' && (
                <m.div
                  key="phone"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Issuer Portal › Sign In
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Aadhar linked mobile number
                  </Typography>

                  <TextField
                    fullWidth
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => {
                      // Only allow numbers and limit to 10 digits
                      const numbers = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setMobile(numbers);
                    }}
                    InputProps={{
                      startAdornment: (
                        <Typography variant="body1" sx={{ mr: 1, color: 'text.primary' }}>
                          +91
                        </Typography>
                      ),
                    }}
                    sx={{ mb: 3, '& .MuiInputBase-input': { pl: 1 } }}
                  />

                  <Button variant="contained" onClick={handleNext}>
                    Get OTP
                  </Button>

                  <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                    By continuing, you agree to our{' '}
                    <a href="#" style={{ color: '#1976d2' }}>
                      Privacy Policy
                    </a>{' '}
                    &{' '}
                    <a href="#" style={{ color: '#1976d2' }}>
                      Terms & Conditions
                    </a>
                  </Typography>
                </m.div>
              )}

              {step === 'otp' && (
                <m.div
                  key="otp"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                >
                  <Typography variant="h6" gutterBottom>
                    Enter OTP
                  </Typography>
                  <Typography sx={{ mb: 2 }}>We’ve sent an OTP to {mobile}</Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {otp.map((digit, i) => (
                      <Grid item xs={3} key={i}>
                        <TextField
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          inputProps={{
                            maxLength: 1,
                            style: { textAlign: 'center', fontSize: '1.5rem' },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="caption">Resend OTP in 19 seconds</Typography>

                  <Box sx={{ mt: 4 }}>
                    <Button onClick={handleBack} sx={{ mr: 2 }}>
                      Back
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                      Verify
                    </Button>
                  </Box>
                </m.div>
              )}

              {step === 'details' && (
                <m.div
                  key="details"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                >
                  <Typography variant="h6" gutterBottom>
                    Basic Details
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    Important updates will be sent to this email
                  </Typography>

                  <TextField
                    fullWidth
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <Box>
                    <Button onClick={handleBack} sx={{ mr: 2 }}>
                      Back
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                      Get OTP
                    </Button>
                  </Box>
                </m.div>
              )}

              {step === 'emailOtp' && (
                <m.div
                  key="emailOtp"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                >
                  <Typography variant="h6" gutterBottom>
                    Enter OTP
                  </Typography>
                  <Typography sx={{ mb: 2 }}>We’ve sent an OTP to {email}</Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {otp.map((digit, i) => (
                      <Grid item xs={3} key={i}>
                        <TextField
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          inputProps={{
                            maxLength: 1,
                            style: { textAlign: 'center', fontSize: '1.5rem' },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="caption">
                    If it hasn’t arrived, please check your spam folder
                  </Typography>
                  <Typography variant="caption" display="block">
                    Resend OTP in 15 seconds
                  </Typography>

                  <Box sx={{ mt: 4 }}>
                    <Button onClick={handleBack} sx={{ mr: 2 }}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={paths.KYCViewPage}
                      onClick={onClose}
                    >
                      Verify
                    </Button>
                  </Box>
                </m.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Right Side - Illustration */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '45%',
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Image src={login_img} alt="illustration" sx={{ width: '100%', maxWidth: '100%' }} />
          </Box>
        </Paper>
      </DialogContent>
      {/* 
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions> */}

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: '40%',
          width: '100%',
          height: '100%',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Image
          src="/assets/images/issuer-login/background.png"
          alt="illustration"
          sx={{ width: '70%', height: '100%' }}
        />
      </Box>
    </Dialog>
  );
}
