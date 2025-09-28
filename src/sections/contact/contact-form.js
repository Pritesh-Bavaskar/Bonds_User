import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9\s\-()]*$/, 'Only digits, spaces, parentheses, hyphens and + are allowed')
      .test('len-digits', 'Phone number must have 10 to 15 digits', (value) => {
        if (!value) return false;
        const digits = (value.match(/\d/g) || []).length;
        return digits >= 10 && digits <= 15;
      }),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = useMemo(
    () => ({ name: '', email: '', phone: '', message: '' }),
    []
  );

  const methods = useForm({ resolver: yupResolver(Schema), defaultValues });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 600));
      enqueueSnackbar('Message sent!');
      // You can plug an API call here
      methods.reset();
      // eslint-disable-next-line no-console
      console.info('CONTACT_FORM', data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card
        sx={{
          p: { xs: 2, md: 4 },
          boxShadow: 6,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Watermark illustration */}
        <Box
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            background: 'url(/assets/illustrations/illustration_dashboard.png) center/60% no-repeat',
            opacity: 0.05,
          }}
        />

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Left: Contact details */}
          <Grid xs={12} md={6}>
            <Stack spacing={2.5} sx={{ position: 'relative' }}>
              <InfoRow iconSrc="/assets/icons/contact/phone.svg" title="Call us" subtitle="+91 987654321" />
              <InfoRow iconSrc="/assets/icons/contact/email.svg" title="Email Us" subtitle="xyz@gmail.com" />

              <Card variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <Box component="img" src="/assets/icons/contact/send.svg" alt="send" sx={{ width: 20, height: 20 }} />
                  <Typography variant="subtitle1">Connect with us</Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
                  <IconButtonLink icon="mdi:instagram" />
                  <IconButtonLink icon="mdi:twitter" />
                  <IconButtonLink icon="mdi:youtube" />
                  <IconButtonLink icon="mdi:linkedin" />
                  <IconButtonLink icon="mdi:facebook" />
                </Stack>
              </Card>

              <Card variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box component="img" src="/assets/icons/contact/location.svg" alt="location" sx={{ width: 16, height: 16, mt: 0.3 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                      Registered address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      xyz Nashik road 2nd floor of abc building near z temple Nashik Maharashtra 4225544 xyz
                      Nashik road 2nd floor of abc building near z temple Nashik Maharashtra
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Grid>

          {/* Right: Form */}
          <Grid xs={12} md={6}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
              Write to us
            </Typography>

            <Box display="grid" rowGap={2} columnGap={2} gridTemplateColumns={{ xs: '1fr', sm: '1fr' }}>
              <RHFTextField name="name" label="Name" placeholder="Enter your name" />
              <RHFTextField name="email" label="Email" placeholder="Enter your email ID" />
              <RHFTextField
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                inputProps={{ inputMode: 'tel' }}
              />
              <RHFTextField
                name="message"
                label="Message"
                placeholder="Enter message here"
                multiline
                rows={5}
              />
            </Box>

            <Divider sx={{ my: { xs: 2, md: 3 } }} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              <LoadingButton
                type="submit"
                size="large"
                variant="contained"
                loading={isSubmitting}
                sx={{
                  alignSelf: { xs: 'stretch', sm: 'flex-end' },
                  borderRadius: 999,
                  px: 5,
                  width: '100%',
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
                color="primary"
              >
                Send message
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}

// ----------------------------------------------------------------------

function InfoRow({ icon, iconSrc, title, subtitle }) {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        {iconSrc ? (
          <Box component="img" src={iconSrc} alt={title} sx={{ width: 18, height: 18 }} />
        ) : (
          <Iconify icon={icon} sx={{ color: 'primary.main' }} />
        )}
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, ml: 4 }}>
          {subtitle}
        </Typography>
      )}
    </Card>
  );
}

function IconButtonLink({ icon, href = '#' }) {
  return (
    <Button
      href={href}
      variant="soft"
      color="inherit"
    >
      <Iconify icon={icon} />
    </Button>
  );
}
