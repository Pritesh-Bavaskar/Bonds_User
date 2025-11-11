import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// sections
import KYCTitle from './kyc-title';
import KYCFooter from './kyc-footer';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect, RHFAutocomplete } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import KYCStepper from './kyc-stepper';

import axiosInstance from 'src/utils/axios';
import dayjs from 'dayjs';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

function PANUploadArea({ value, onChange, error }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
      }
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.pdf'],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        p: 2,
        borderRadius: 1,
        cursor: 'pointer',
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        border: (theme) => `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        ...(isDragActive && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
        }),
        ...(error && {
          borderColor: 'error.main',
        }),
      }}
    >
      <input {...getInputProps()} />
      <Button variant="outlined" size="small">
        Select file...
      </Button>
      <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
        {value ? value.name : 'Drop files here to upload'}
      </Typography>
    </Box>
  );
}

PANUploadArea.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  error: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function KYCBasicInfo({ currentInfo }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    cin: Yup.string().required('CIN is required'),
    companyName: Yup.string().required('Company Name is required'),
    gstin: Yup.string().required('GSTIN is required'),
    dateOfIncorporation: Yup.date().required('Date of Incorporation is required'),
    msmeUdyamRegistrationNo: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    country: Yup.string().required('Country is required'),
    entityType: Yup.string(),
    panFile: Yup.mixed(),
    panNumber: Yup.string(),
    dateOfBirth: Yup.date(),
    panHoldersName: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      cin: currentInfo?.cin || '',
      companyName: currentInfo?.companyName || '',
      gstin: currentInfo?.gstin || '',
      dateOfIncorporation: currentInfo?.dateOfIncorporation || null,
      msmeUdyamRegistrationNo: currentInfo?.msmeUdyamRegistrationNo || '',
      city: currentInfo?.city || '',
      state: currentInfo?.state || '',
      country: currentInfo?.country || '',
      entityType: currentInfo?.entityType || '',
      panFile: currentInfo?.panFile || null,
      panNumber: currentInfo?.panNumber || '',
      dateOfBirth: currentInfo?.dateOfBirth || null,
      panHoldersName: currentInfo?.panHoldersName || '',
    }),
    [currentInfo]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  // Fetch company information when component mounts
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const companyId = sessionStorage.getItem('company_information_id');
        if (!companyId) return;

        const response = await axiosInstance.get(`/api/kyc/issuer_kyc/company-info/${companyId}/`);
        const companyData = response.data?.data;

        if (companyData) {
          methods.reset({
            cin: companyData.corporate_identification_number || '',
            companyName: companyData.company_name || '',
            gstin: companyData.gstin || '',
            dateOfIncorporation: companyData.date_of_incorporation ? dayjs(companyData.date_of_incorporation).toDate() : null,
            msmeUdyamRegistrationNo: companyData.msme_udyam_registration_no || '',
            city: companyData.place_of_incorporation || '',
            state: companyData.state_of_incorporation || '',
            country: companyData.country || '',
            entityType: companyData.entity_type?.toLowerCase() || '', // Ensure lowercase to match form values
            sector: companyData.sector || '',
            panNumber: companyData.company_pan_number || '',
            dateOfBirth: companyData.date_of_birth ? dayjs(companyData.date_of_birth).toDate() : null,
            panHoldersName: companyData.pan_holder_name || '',
          });
          
          // If you need to handle the PAN file separately
          if (companyData.company_or_individual_pan_card_file) {
            // You might need to handle file download/display logic here
            console.log('PAN card file available at:', companyData.company_or_individual_pan_card_file);
          }
        }
      } catch (error) {
        // console.error('Error fetching company information:', error);
        // enqueueSnackbar('Failed to load company information', { variant: 'error' });
      }
    };

    fetchCompanyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.reset]);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // ----------------------------------------------------------------------

  const handlePanUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('pan_card_file', file);

      const response = await axiosInstance.post('/api/kyc/issuer_kyc/pan-extraction/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = response.data;
      console.log('PAN extraction result:', data);

      if (data) {
        setValue('panNumber', data.pan_number || '');
        setValue('panHoldersName', data.pan_holder_name || '');
        setValue('dateOfBirth', data.date_of_birth ? new Date(data.date_of_birth) : null);
        enqueueSnackbar('PAN details fetched successfully!', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to extract PAN details', { variant: 'error' });
    }
  };

  const [hasExistingData, setHasExistingData] = useState(false);

  // Check if we have existing data when component mounts
  useEffect(() => {
    const checkExistingData = async () => {
      const companyId = sessionStorage.getItem('company_information_id');
      if (companyId) {
        try {
          const response = await axiosInstance.get(`/api/kyc/issuer_kyc/company-info/${companyId}/`);
          setHasExistingData(!!response.data?.data);
        } catch (error) {
          console.error('Error checking existing data:', error);
          setHasExistingData(false);
        }
      }
    };
    checkExistingData();
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      console.info('Form Data:', formData);

      // Get token from session storage
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        enqueueSnackbar('Authentication token not found', { variant: 'error' });
        return;
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all fields to FormData
      formDataToSend.append('corporate_identification_number', formData.cin || '');
      formDataToSend.append('company_name', formData.companyName || '');
      formDataToSend.append('gstin', formData.gstin || '');
      
      // Format dates to YYYY-MM-DD
      if (formData.dateOfIncorporation) {
        formDataToSend.append('date_of_incorporation', dayjs(formData.dateOfIncorporation).format('YYYY-MM-DD'));
      } else {
        formDataToSend.append('date_of_incorporation', '');
      }
      
      formDataToSend.append('msme_udyam_registration_no', formData.msmeUdyamRegistrationNo || '');
      
      if (formData.dob) {
        formDataToSend.append('dob', dayjs(formData.dob).format('YYYY-MM-DD'));
      } else {
        formDataToSend.append('dob', '');
      }
      
      formDataToSend.append('country', formData.country || '');
      formDataToSend.append('place_of_incorporation', formData.city || '');
      formDataToSend.append('state_of_incorporation', formData.state || '');
      formDataToSend.append('entity_type', formData.entityType || '');
      
      // Handle PAN card file - only append if it's a new file
      if (formData.panFile) {
        formDataToSend.append('company_or_individual_pan_card_file', formData.panFile);
      } else if (!formData.panFile && !hasExistingData) {
        // If no file and no existing data, add empty file to trigger validation
        formDataToSend.append('company_or_individual_pan_card_file', '');
      }
      
      if (formData.dateOfBirth) {
        formDataToSend.append('date_of_birth', dayjs(formData.dateOfBirth).format('YYYY-MM-DD'));
      } else {
        formDataToSend.append('date_of_birth', '');
      }
      
      formDataToSend.append('pan_holder_name', formData.panHoldersName || '');

      console.log('Sending FormData:', Object.fromEntries(formDataToSend.entries()));
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const companyId = sessionStorage.getItem('company_information_id');
      
      if (!hasExistingData) {
        // Create new company info
        const response = await axiosInstance.post('/api/kyc/issuer_kyc/company-info/', formDataToSend, config);
        // Store the company ID in session storage for future updates
        if (response.data?.data?.id) {
          sessionStorage.setItem('company_information_id', response.data.data.id);
        }
      } else {
        // Update existing company info
        await axiosInstance.patch(
          `/api/kyc/issuer_kyc/company-info/${companyId}/update/`,
          formDataToSend,
          config
        );
      }

      reset();
      enqueueSnackbar(currentInfo ? 'Update success!' : 'Create success!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar(
        typeof error === 'string' ? error : error?.error?.message || 'Error occurred',
        {
          variant: 'error',
        }
      );
    }
  });

  // ----------------------------------------------------------------------

  return (
    <Container>
      <KYCStepper />
      <KYCTitle
        title="Welcome to Bond Issuer"
        subtitle={"Let's get you started please provide your details"}
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Left Section */}
            <Grid xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:user-rounded-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      CIN
                    </Box>
                  </Box>
                  <RHFTextField name="cin" />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:buildings-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Company Name
                    </Box>
                  </Box>
                  <RHFTextField name="companyName" />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:percentage-circle-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      GSTIN
                    </Box>
                  </Box>
                  <RHFTextField name="gstin" />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:calendar-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Date of Incorporation
                    </Box>
                  </Box>
                  <Controller
                    name="dateOfIncorporation"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        format="yyyy-MM-dd"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:buildings-2-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      MSME/Udyam Registration No.
                    </Box>
                  </Box>
                  <RHFTextField name="msmeUdyamRegistrationNo" />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:map-point-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Place of Incorporation
                    </Box>
                  </Box>
                  <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                    <RHFTextField name="city" placeholder="City" sx={{ flex: 1 }} />
                    <RHFSelect
                      name="state"
                      sx={{ flex: 1 }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) =>
                          selected ? selected : <Box sx={{ color: 'text.disabled' }}>State</Box>,
                      }}
                    >
                      {/* <MenuItem value="">State</MenuItem> */}
                      <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                    </RHFSelect>
                    <RHFAutocomplete
                      name="country"
                      placeholder="Country"
                      sx={{ flex: 1 }}
                      options={countries.map((country) => country.label)}
                      getOptionLabel={(option) => option}
                      renderOption={(props, option) => {
                        const { code, label, phone } = countries.find(
                          (country) => country.label === option
                        );
                        return (
                          <li {...props} key={label}>
                            <Iconify
                              key={label}
                              icon={`circle-flags:${code.toLowerCase()}`}
                              width={28}
                              sx={{ mr: 1 }}
                            />
                            {label} ({code}) +{phone}
                          </li>
                        );
                      }}
                    />
                  </Stack>
                </Box>

                <Box>
                  <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Iconify icon="solar:buildings-2-bold" width={24} />
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          Entity Type
                        </Box>
                      </Box>
                      <RHFSelect name="entityType" placeholder="Select Entity Type">
                        <MenuItem value="">Select Entity Type</MenuItem>
                        <MenuItem value="private">Private Limited</MenuItem>
                        <MenuItem value="Public Limited">Public Limited</MenuItem>
                        <MenuItem value="LLP">LLP</MenuItem>
                        <MenuItem value="OPC">OPC</MenuItem>
                        <MenuItem value="Partnership Firm">Partnership Firm</MenuItem>
                        <MenuItem value="Proprietorship Firm">Proprietorship Firm</MenuItem>
                        <MenuItem value="Trust/Society/NGO">Trust/Society/NGO</MenuItem>
                      </RHFSelect>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Iconify icon="solar:chart-2-bold" width={24} />
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          Sector
                        </Box>
                      </Box>
                      <RHFSelect name="sector" placeholder="Select Sector">
                        <MenuItem value="">Select Sector</MenuItem>
                        <MenuItem value="IT & ITES">IT & ITES</MenuItem>
                        <MenuItem value="Banking & Financial Services">
                          Banking & Financial Services
                        </MenuItem>
                        <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                        <MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
                        <MenuItem value="Automobile">Automobile</MenuItem>
                        <MenuItem value="Chemicals">Chemicals</MenuItem>
                        <MenuItem value="Consumer Durables">Consumer Durables</MenuItem>
                        <MenuItem value="FMCG">FMCG</MenuItem>
                        <MenuItem value="Metals & Mining">Metals & Mining</MenuItem>
                        <MenuItem value="Oil & Gas">Oil & Gas</MenuItem>
                        <MenuItem value="Power">Power</MenuItem>
                        <MenuItem value="Real Estate">Real Estate</MenuItem>
                        <MenuItem value="Telecom">Telecom</MenuItem>
                        <MenuItem value="Textiles">Textiles</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </RHFSelect>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box
                  sx={{
                    height: { xs: 'auto', md: 'calc(3.82 * (56px + 24px))' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: { xs: 0, md: 0 },
                  }}
                >
                  <Box
                    component="img"
                    src="/assets/images/kyc/kyc-basic-info/kyc-img.svg"
                    alt="KYC Illustration"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:calendar-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Upload PAN to Fill Details Automatically
                    </Box>
                  </Box>
                  <Controller
                    name="panFile"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <PANUploadArea
                        value={field.value}
                        onChange={async (file) => {
                          field.onChange(file);
                          setValue('panFile', file, { shouldValidate: true });
                          await handlePanUpload(file);
                        }}
                        error={!!error}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:calendar-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      PAN Number
                    </Box>
                  </Box>
                  <RHFTextField name="panNumber" placeholder="Your PAN Number" />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:calendar-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Date of Birth
                    </Box>
                  </Box>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        format="yyyy-MM-dd"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            placeholder: 'DD-MM-YYYY',
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="solar:calendar-bold" width={24} />
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      PAN Holder's Name
                    </Box>
                  </Box>
                  <RHFTextField name="panHoldersName" placeholder="Enter Name as per PAN" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, mb: 4 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{
              bgcolor: 'grey.800',
              color: 'common.white',
              borderRadius: 1,
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: 'grey.900' },
            }}
            endIcon={<Iconify icon="eva:arrow-forward-fill" />}
          >
            Save & Continue
          </LoadingButton>
        </Box>
      </FormProvider>
      <KYCFooter />
    </Container>
  );
}

KYCBasicInfo.propTypes = {
  currentInfo: PropTypes.object,
};
