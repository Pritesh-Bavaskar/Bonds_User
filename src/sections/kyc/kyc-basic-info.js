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
import RHFFileUploadBox from 'src/components/custom-file-upload/file-upload';
import { Card } from '@mui/material';
import YupErrorMessage from 'src/components/error-field/yup-error-messages';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function KYCBasicInfo() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [panFileToken, setPanFileToken] = useState('');
  const [humanInteraction, setHumanInteraction] = useState({
    companyName: false,
    gstin: false,
    dateOfIncorporation: false,
    msmeUdyamRegistrationNo: false,
    city: false,
    state: false,
    country: false,
    entityType: false,
    panNumber: false,
    dateOfBirth: false,
    panHoldersName: false,
    sector: false,
  });

  const handleHumanInteraction = (fieldName) => {
    if (!humanInteraction[fieldName]) {
      console.log(`User interacted with field: ${fieldName}`);
      const newInteractionState = {
        ...humanInteraction,
        [fieldName]: true,
      };
      console.log('Updated humanInteraction state:', newInteractionState);
      setHumanInteraction(newInteractionState);
    }
  };

  const NewUserSchema = Yup.object().shape({
    cin: Yup.string().required('CIN is required'),
    companyName: Yup.string().required('Company Name is required'),
    gstin: Yup.string().required('GSTIN is required'),
    dateOfIncorporation: Yup.date().required('Date of Incorporation is required'),
    msmeUdyamRegistrationNo: Yup.string().required('MSME Udyam Registration No is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    entityType: Yup.string().required('Entity Type is required'),
    panFile: Yup.mixed().when('hasExistingData', {
      is: false,
      then: (schema) => schema.required('Pan File is required'),
      otherwise: (schema) => schema.nullable(),
    }),
    panNumber: Yup.string().required('Pan Number is required'),
    dateOfBirth: Yup.date().required('Date Of Birth is required'),
    panHoldersName: Yup.string().required('Pan Holders Name is required'),
    sector: Yup.string().required('Sector is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = useMemo(
    () => ({
      cin: '',
      companyName: '',
      gstin: '',
      dateOfIncorporation: null,
      msmeUdyamRegistrationNo: '',
      city: '',
      state: '',
      country: 'India',
      entityType: '',
      panFile: null,
      panNumber: '',
      dateOfBirth: null,
      panHoldersName: '',
      sector: '',
      password: '',
      confirmPassword: '',
      humanInteraction: { ...humanInteraction },
    }),
    [humanInteraction]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = methods;

  // ----------------------------------------------------------------------

  const handlePanUpload = async (file) => {
    console.log('handlePanUpload - File selected:', file);
    console.log('Current humanInteraction state before PAN upload:', humanInteraction);
    try {
      const formData = new FormData();
      formData.append('pan_card_file', file);

      console.log('Sending PAN for extraction...');
      const response = await axiosInstance.post('/api/kyc/issuer_kyc/pan-extraction/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        const { pan_number, pan_holder_name, date_of_birth, file_token } = response.data.data;
        console.log('PAN extraction successful, updating form fields', {
          pan_number,
          pan_holder_name,
          date_of_birth,
          file_token: file_token ? '***' : 'No token',
        });
        // Set values without triggering human interaction
        setValue('panNumber', pan_number || '', { shouldValidate: true, shouldDirty: true });
        setValue('panHoldersName', pan_holder_name || '', {
          shouldValidate: true,
          shouldDirty: true,
        });
        if (date_of_birth) {
          setValue('dateOfBirth', new Date(date_of_birth), {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        // Store the file token for later use in form submission
        setPanFileToken(file_token || '');
        enqueueSnackbar('PAN details extracted successfully', { variant: 'success' });
      } else {
        enqueueSnackbar(response.data.message || 'Failed to extract PAN details', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error uploading PAN:', error);
      enqueueSnackbar('Error uploading PAN. Please try again.', { variant: 'error' });
    }
  };

  const onSubmit = handleSubmit(async (formData) => {
    // Check if any field was manually edited by the user
    const hasHumanInteraction = Object.values(humanInteraction).some(Boolean);

    console.log('Form submission - Human interaction detected:', hasHumanInteraction);

    // Add humanInteraction to the form data before submission
    formData.humanInteraction = humanInteraction;
    console.log('Form submitted with human interaction data:', {
      formData: {
        ...formData,
        // Don't log sensitive data
        password: formData.password ? '***' : undefined,
        confirmPassword: formData.confirmPassword ? '***' : undefined,
      },
      humanInteraction,
    });
    try {
      console.info('Form Data:', formData);

      // Get token from session storage
      // const token = sessionStorage.getItem('accessToken');
      // if (!token) {
      //   enqueueSnackbar('Authentication token not found', { variant: 'error' });
      //   return;
      // }

      // Get user details from local storage
      const userFullName = localStorage.getItem('userFullName') || '';
      const userPhone = localStorage.getItem('userPhone') || '';
      const userEmail = localStorage.getItem('userEmail') || '';

      console.log('Retrieved user details from local storage:', {
        userFullName,
        userPhone,
        userEmail,
      });

      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Add all fields to FormData
      formDataToSend.append('mobile_number', userPhone);
      formDataToSend.append('email', userEmail);
      formDataToSend.append('full_name', userFullName);
      formDataToSend.append('password', formData.password || '');
      formDataToSend.append('role', 'ISSUER');
      formDataToSend.append('human_intervention', hasHumanInteraction);
      formDataToSend.append('corporate_identification_number', formData.cin || '');
      formDataToSend.append('company_name', formData.companyName || '');
      formDataToSend.append('gstin', formData.gstin || '');

      // Format dates to YYYY-MM-DD for the API
      if (formData.dateOfIncorporation) {
        formDataToSend.append(
          'date_of_incorporation',
          dayjs(formData.dateOfIncorporation).format('YYYY-MM-DD')
        );
      } else {
        formDataToSend.append('date_of_incorporation', '');
      }

      formDataToSend.append('msme_udyam_registration_no', formData.msmeUdyamRegistrationNo || '');

      if (formData.dob) {
        formDataToSend.append('date_of_birth', dayjs(formData.dob).format('YYYY-MM-DD'));
      } else {
        formDataToSend.append('date_of_birth', '');
      }

      formDataToSend.append('country_of_incorporation', formData.country || 'India');
      formDataToSend.append('city_of_incorporation', formData.city || '');
      formDataToSend.append('state_of_incorporation', formData.state || '');
      formDataToSend.append('entity_type', formData.entityType || '');
      formDataToSend.append('company_pan_number', formData.panNumber || '');
      formDataToSend.append('pan_holder_name', formData.panHoldersName || '');

      // Handle PAN card file - use token if available, otherwise use the file
      if (panFileToken) {
        // If we have a token from PAN extraction, send that instead of the file
        formDataToSend.append('file_token', panFileToken);
      }

      if (formData.dateOfBirth) {
        formDataToSend.append('date_of_birth', dayjs(formData.dateOfBirth).format('YYYY-MM-DD'));
      } else {
        formDataToSend.append('date_of_birth', '');
      }

      formDataToSend.append('pan_holder_name', formData.panHoldersName || '');
      formDataToSend.append('sector', formData.sector || '');

      // Add file token if available
      if (panFileToken) {
        formDataToSend.append('file_token', panFileToken);
      }

      // Convert FormData to object for logging (won't show file data)
      const formDataObj = {};
      formDataToSend.forEach((value, key) => {
        formDataObj[key] = value;
      });
      console.log('Sending FormData:', formDataObj);

      const config = {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      // Create new company info
      const response = await axiosInstance.post(
        '/api/kyc/issuer_kyc/register-company/',
        formDataToSend,
        config
      );

      if (response.data && response.data.success) {
        enqueueSnackbar(response.data.message || 'Registration submitted successfully', {
          variant: 'success',
        });

        // Redirect based on verification status
        if (response.data.data?.verification_status === 'PENDING') {
          navigate('/kyc/pending');
        } else {
          navigate('/kyc/success');
        }
      } else {
        throw new Error(response.data?.message || 'Registration failed');
      }

      reset();
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

  const requiredFields = [
    'cin',
    'companyName',
    'gstin',
    'dateOfIncorporation',
    'msmeUdyamRegistrationNo',
    'city',
    'state',
    'country',
    'entityType',
    'panFile',
    'panNumber',
    'dateOfBirth',
    'panHoldersName',
    'sector',
  ];

  const allValues = methods.watch();
  const errors = methods.formState.errors;

  const calculatePercent = () => {
    let validCount = 0;

    requiredFields.forEach((field) => {
      const value = allValues[field];

      const hasError = !!errors[field];

      // VALID when:
      //   - field is not empty
      //   - AND no validation error from Yup
      if (value && !hasError) {
        validCount++;
      }
    });

    return Math.round((validCount / requiredFields.length) * 100);
  };

  // ----------------------------------------------------------------------

  return (
    <Container>
      <KYCTitle
        title="Welcome to Bond Issuer"
        subtitle={"Let's get you started please provide your details"}
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card
          sx={{
            p: { xs: 2, sm: 3, md: 4 }, // responsive padding
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Grid container spacing={3} sx={{ py: 4 }}>
            {/* Password Field */}
            <Grid xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:lock-password-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Set Your Password*
                  </Box>
                </Box>
                <RHFTextField
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  fullWidth
                />
              </Box>
            </Grid>

            {/* Confirm Password Field */}
            <Grid xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:lock-password-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Confirm Password*
                  </Box>
                </Box>
                <RHFTextField
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:user-rounded-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    CIN*
                  </Box>
                </Box>
                <RHFTextField
                  name="cin"
                  placeholder="Enter your CIN"
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: '#00328A',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: '6px',
                          ml: 1,
                          '&:hover': { bgcolor: '#00328A' },
                        }}
                        onClick={async () => {
                          const cinValue = getValues('cin');
                          if (!cinValue) {
                            enqueueSnackbar('Please enter a CIN before fetching.', {
                              variant: 'warning',
                            });
                            return;
                          }

                          try {
                            const response = await axiosInstance.get(
                              `/api/kyc/issuer_kyc/company-info/cin/${cinValue}/`
                            );

                            const data = response.data.data;
                            if (response.data.success && data) {
                              // Set all the form fields from the response without triggering human interaction
                              setValue('companyName', data.company_name || '', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              setValue('gstin', data.gstin || '', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              setValue(
                                'dateOfIncorporation',
                                data.date_of_incorporation
                                  ? new Date(data.date_of_incorporation)
                                  : null,
                                { shouldValidate: true, shouldDirty: true }
                              );
                              setValue('city', data.city_of_incorporation || '', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              setValue('state', data.state_of_incorporation || '', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              setValue('country', data.country_of_incorporation || 'India', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              setValue('sector', data.sector || '', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              setValue('entityType', data.entity_type || '', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              setValue('panNumber', data.company_pan_number || '', {
                                shouldValidate: true,
                                shouldDirty: true,
                              });

                              enqueueSnackbar('CIN data fetched successfully', {
                                variant: 'success',
                              });
                            } else {
                              throw new Error(response.data.message || 'Failed to fetch CIN data');
                            }
                          } catch (error) {
                            console.error('Error fetching CIN:', error);
                            enqueueSnackbar(
                              error.response?.data?.message ||
                                'Failed to fetch CIN data. Please check CIN or try again.',
                              { variant: 'error' }
                            );
                          }
                        }}
                      >
                        Fetch
                      </Button>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:buildings-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Company Name*
                  </Box>
                </Box>
                <RHFTextField
                  name="companyName"
                  placeholder="Enter your Company Name"
                  onFocus={() => handleHumanInteraction('companyName')}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:percentage-circle-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    GSTIN*
                  </Box>
                </Box>
                <RHFTextField
                  name="gstin"
                  placeholder="Enter your GSTIN"
                  onFocus={() => handleHumanInteraction('gstin')}
                />
              </Box>
            </Grid>
            <Grid xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                sx={{
                  height: { xs: 'auto', md: 'calc(3.82 * (56px + 24px))' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: { xs: 0, md: 3 },
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
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:calendar-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Date of Incorporation*
                  </Box>
                </Box>
                <Controller
                  name="dateOfIncorporation"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                        handleHumanInteraction('dateOfIncorporation');
                      }}
                      onOpen={() => handleHumanInteraction('dateOfIncorporation')}
                      format="dd-MM-yyyy"
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

              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:buildings-2-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    MSME/Udyam Registration No.*
                  </Box>
                </Box>
                <RHFTextField
                  name="msmeUdyamRegistrationNo"
                  placeholder="Enter your MSME/Udyam Registration No."
                  // onFocus={() => handleHumanInteraction('msmeUdyamRegistrationNo')}
                />
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:map-point-bold" width={24} />
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Place of Incorporation*
                  </Box>
                </Box>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                  <RHFTextField
                    name="city"
                    placeholder="City"
                    sx={{ flex: 1 }}
                    onFocus={() => handleHumanInteraction('city')}
                  />
                  <RHFSelect
                    name="state"
                    sx={{ flex: 1 }}
                    onFocus={() => handleHumanInteraction('state')}
                    SelectProps={{
                      displayEmpty: true,
                      onOpen: () => handleHumanInteraction('state'),
                      renderValue: (selected) =>
                        selected ? selected : <Box sx={{ color: 'text.disabled' }}>State</Box>,
                    }}
                  >
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                  </RHFSelect>
                  <RHFAutocomplete
                    name="country"
                    placeholder="Country"
                    sx={{ flex: 1 }}
                    readOnly
                    onOpen={() => handleHumanInteraction('country')}
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
              <Box sx={{ mb: 3 }}>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Iconify icon="solar:buildings-2-bold" width={24} />
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        Entity Type*
                      </Box>
                    </Box>
                    <RHFSelect
                      name="entityType"
                      placeholder="Select Entity Type"
                      // onFocus={() => handleHumanInteraction('entityType')}
                      // SelectProps={{
                      //   onOpen: () => handleHumanInteraction('entityType'),
                      // }}
                    >
                      <MenuItem value="">Select Entity Type</MenuItem>
                      <MenuItem value="PRIVATE_LTD">Private Limited</MenuItem>
                      <MenuItem value="PUBLIC_LTD">Public Limited</MenuItem>
                      <MenuItem value="LLP">LLP</MenuItem>
                      <MenuItem value="OPC">OPC</MenuItem>
                      <MenuItem value="PARTNERSHIP_FIRM">Partnership Firm</MenuItem>
                      <MenuItem value="PROPRIETORSHIP_FIRM">Proprietorship Firm</MenuItem>
                      <MenuItem value="TRUST/SOCIETY/NGO">Trust/Society/NGO</MenuItem>
                    </RHFSelect>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Iconify icon="solar:chart-2-bold" width={24} />
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        Sector*
                      </Box>
                    </Box>
                    <RHFSelect
                      name="sector"
                      placeholder="Select Sector"
                      // onFocus={() => handleHumanInteraction('sector')}
                      // SelectProps={{
                      //   onOpen: () => handleHumanInteraction('sector'),
                      // }}
                    >
                      <MenuItem value="">Select Sector</MenuItem>
                      <MenuItem value="BANKING">Banking</MenuItem>
                      <MenuItem value="INFRASTRUCTURE">Infrastructure</MenuItem>
                      <MenuItem value="POWER">Power</MenuItem>
                      <MenuItem value="REAL ESTATE">Real Estate</MenuItem>
                      <MenuItem value="MANUFACTURING">Manufacturing</MenuItem>
                      <MenuItem value="IT">IT & Software</MenuItem>
                      <MenuItem value="PUBLIC SECTOR UNDERTAKING">
                        Public Sector Undertaking
                      </MenuItem>
                      <MenuItem value="OTHERS">Others</MenuItem>
                    </RHFSelect>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid xs={12} md={12}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:document-upload-bold" width={24} />
                <Box component="span" sx={{ fontWeight: 600 }}>
                  Upload PAN to Fill Details Automatically*
                </Box>
              </Box>
              <RHFFileUploadBox
                name="panFile"
                label="Upload PAN Card"
                icon="mdi:earth"
                color="#1e88e5"
                acceptedTypes="pdf,xls,docx,jpeg"
                maxSizeMB={10}
                onDrop={async (acceptedFiles) => {
                  const file = acceptedFiles[0];
                  if (file) {
                    setValue('panFile', file, { shouldValidate: true });
                    await handlePanUpload(file);
                  }
                }}
              />
              <YupErrorMessage name="panFile" />
            </Box>
          </Grid>
          <Grid container spacing={3}>
            {/* PAN Number (Left) */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:card-bold" width={24} />
                <Box component="span" sx={{ fontWeight: 600 }}>
                  PAN Number*
                </Box>
              </Box>
              <RHFTextField
                name="panNumber"
                placeholder="Your PAN Number"
                onFocus={() => handleHumanInteraction('panNumber')}
              />
            </Grid>

            {/* Date of Birth (Right) */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:calendar-bold" width={24} />
                <Box component="span" sx={{ fontWeight: 600 }}>
                  Date of Birth*
                </Box>
              </Box>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                      handleHumanInteraction('dateOfBirth');
                    }}
                    onOpen={() => handleHumanInteraction('dateOfBirth')}
                    format="dd-MM-yyyy"
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
            </Grid>

            {/* PAN Holder’s Name (Full width below) */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="solar:user-bold" width={24} />
                <Box component="span" sx={{ fontWeight: 600 }}>
                  PAN Holder's Name*
                </Box>
              </Box>
              <RHFTextField
                name="panHoldersName"
                placeholder="Enter Name as per PAN"
                onFocus={() => handleHumanInteraction('panHoldersName')}
              />
            </Grid>
          </Grid>
        </Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4,
            mb: 4,
            gap: 3,
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src="/assets/images/kyc/kyc-trust.svg"
                alt="Trust"
                sx={{ width: 28, height: 28 }}
              />
              <Typography variant="body2">
                Trusted by{' '}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  100+ Issuers
                </Box>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src="/assets/images/kyc/kyc-shield.svg"
                alt="Security"
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="body2">Your data is encrypted and secured</Typography>
            </Box>
          </Box>
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
