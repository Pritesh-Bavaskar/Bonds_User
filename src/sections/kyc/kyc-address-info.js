import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Iconify from 'src/components/iconify';
// components
import RHFTextField from 'src/components/hook-form/rhf-text-field';
import { RHFUploadBox } from 'src/components/hook-form/rhf-upload';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
// sections
import KYCTitle from './kyc-title';
import KYCFooter from './kyc-footer';
import KYCStepper from './kyc-stepper';
import RHFFileUploadBox from 'src/components/custom-file-upload/file-upload';
import { IconButton, MenuItem, Tooltip } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';
import YupErrorMessage from 'src/components/error-field/yup-error-messages';

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  width: '100%',
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  borderRadius: 1,
  border: '2px dashed',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.neutral,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer',
  },
}));

export default function KycAddressInfo() {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [addressExists, setAddressExists] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const router = useRouter();
  const companyId = sessionStorage.getItem('company_information_id');

  const AddressSchema = Yup.object().shape({
    documentType: Yup.string().required('Please select document type'),
    registeredAddressLine1: Yup.string().required('Address Line 1 is required'),
    registeredAddressLine2: Yup.string(),
    registeredCountry: Yup.string().required('Country is required'),
    registeredCity: Yup.string().required('City is required'),
    registeredState: Yup.string().required('State is required'),
    registeredPincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]+$/, 'Must be a valid pincode'),
    registeredEmail: Yup.string().email('Invalid email').required('Email is required'),
    registeredPhone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number'),

    sameAsRegistered: Yup.boolean(),

    correspondenceAddressLine1: Yup.string().when('sameAsRegistered', {
      is: false,
      then: (schema) => schema.required('Address Line 1 is required'),
    }),
    correspondenceAddressLine2: Yup.string(),
    correspondenceCity: Yup.string().when('sameAsRegistered', {
      is: false,
      then: (schema) => schema.required('City is required'),
    }),
    correspondenceState: Yup.string().when('sameAsRegistered', {
      is: false,
      then: (schema) => schema.required('State is required'),
    }),
    correspondencePincode: Yup.string().when('sameAsRegistered', {
      is: false,
      then: (schema) =>
        schema
          .required('Pincode is required')
          .matches(/^[0-9]{6}$/, 'Must be a valid 6-digit pincode'),
    }),
    correspondenceEmail: Yup.string().when('sameAsRegistered', {
      is: false,
      then: (schema) => schema.email('Invalid email').required('Email is required'),
    }),
    correspondencePhone: Yup.string().when('sameAsRegistered', {
      is: false,
      then: (schema) =>
        schema
          .required('Phone number is required')
          .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number'),
    }),

    addressProof: Yup.mixed().required('Address Proof is required'),
  });

  const methods = useForm({
    resolver: yupResolver(AddressSchema),
    defaultValues: {
      registeredAddressLine1: '',
      registeredAddressLine2: '',
      registeredCountry: 'India',
      registeredCity: '',
      registeredState: '',
      registeredPincode: '',
      registeredEmail: '',
      registeredPhone: '',
      sameAsRegistered: true,
      correspondenceAddressLine1: '',
      correspondenceAddressLine2: '',
      correspondenceCity: '',
      correspondenceCountry: 'India',
      correspondenceState: '',
      correspondencePincode: '',
      correspondenceEmail: '',
      correspondencePhone: '',
      addressProof: null,
      documentType: 'electricityBill',
    },
  });

  const { handleSubmit, setValue, control, watch } = methods;
  const addressProof = useWatch({ control, name: 'addressProof' });
  const sameAsRegistered = useWatch({ control, name: 'sameAsRegistered' });

  // Watch for changes in Registered Address fields and sync with Correspondence Address when sameAsRegistered is true
  const registeredFields = useWatch({
    control,
    name: [
      'registeredAddressLine1',
      'registeredAddressLine2',
      'registeredCountry',
      'registeredCity',
      'registeredState',
      'registeredPincode',
      'registeredEmail',
      'registeredPhone',
    ],
  });

  useEffect(() => {
    if (sameAsRegistered) {
      const [addressLine1, addressLine2, country, city, state, pincode, email, phone] =
        registeredFields;

      setValue('correspondenceAddressLine1', addressLine1, { shouldValidate: true });
      setValue('correspondenceAddressLine2', addressLine2, { shouldValidate: true });
      setValue('correspondenceCountry', country, { shouldValidate: true });
      setValue('correspondenceCity', city, { shouldValidate: true });
      setValue('correspondenceState', state, { shouldValidate: true });
      setValue('correspondencePincode', pincode, { shouldValidate: true });
      setValue('correspondenceEmail', email, { shouldValidate: true });
      setValue('correspondencePhone', phone, { shouldValidate: true });
    }
  }, [registeredFields, sameAsRegistered, setValue]);

  useEffect(() => {
    const fetchAddress = async () => {
      const base = process.env.REACT_APP_HOST_API || '';
      try {
        const res = await fetch(`${base}/api/kyc/issuer_kyc/company/address/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        });
        if (!res.ok) return;
        let json = {};
        try {
          json = await res.json();
        } catch (e) {
          json = {};
        }

        console.log(json);
        const root = json?.addresses ?? json ?? {};
        const registered = root?.registered ?? {};
        const correspondence = root?.correspondence ?? {};

        const toStr = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v));
        const toTen = (v) => {
          const digits = String(v ?? '').replace(/\D/g, '');
          return digits.slice(-10);
        };

        // Registered mapping
        setValue('registeredAddressLine1', toStr(registered.registered_office), {
          shouldValidate: true,
        });
        setValue('registeredAddressLine2', toStr(registered.registered_office_line2), {
          shouldValidate: true,
        });
        // setValue('registeredCountry', toStr(registered.country), { shouldValidate: true });
        setValue('registeredCity', toStr(registered.city), { shouldValidate: true });
        setValue('registeredState', toStr(registered.state_ut), { shouldValidate: true });
        setValue('registeredPincode', toStr(registered.pin_code), { shouldValidate: true });
        setValue('registeredEmail', toStr(registered.contact_email), { shouldValidate: true });
        setValue('registeredPhone', toTen(registered.contact_phone), { shouldValidate: true });

        // Correspondence mapping (note: API uses same key 'registered_office' for address line)
        setValue(
          'correspondenceAddressLine1',
          toStr(correspondence.registered_office ?? correspondence.correspondence_address),
          { shouldValidate: true }
        );
        setValue(
          'correspondenceAddressLine2',
          toStr(
            correspondence.registered_office_line2 ?? correspondence.correspondence_address_line2
          ),
          { shouldValidate: true }
        );
        setValue(
          'correspondenceCity',
          toStr(correspondence.city ?? correspondence.correspondence_city),
          { shouldValidate: true }
        );
        setValue(
          'correspondenceCountry',
          toStr(correspondence.country ?? correspondence.correspondence_country),
          { shouldValidate: true }
        );
        setValue(
          'correspondenceState',
          toStr(correspondence.state_ut ?? correspondence.correspondence_state_ut),
          { shouldValidate: true }
        );
        setValue(
          'correspondencePincode',
          toStr(correspondence.pin_code ?? correspondence.correspondence_pin_code),
          { shouldValidate: true }
        );
        setValue(
          'correspondenceEmail',
          toStr(correspondence.contact_email ?? correspondence.correspondence_email),
          { shouldValidate: true }
        );
        setValue(
          'correspondencePhone',
          toTen(correspondence.contact_phone ?? correspondence.correspondence_phone),
          { shouldValidate: true }
        );

        // Derive sameAsRegistered by comparing core fields
        const same =
          toStr(registered.registered_office) ===
            toStr(correspondence.registered_office ?? correspondence.correspondence_address) &&
          toStr(registered.city) ===
            toStr(correspondence.city ?? correspondence.correspondence_city) &&
            // toStr(registered.country) ===
            // toStr(correspondence.city ?? correspondence.correspondence_country) &&
          toStr(registered.state_ut) ===
            toStr(correspondence.state_ut ?? correspondence.correspondence_state_ut) &&
          toStr(registered.pin_code) ===
            toStr(correspondence.pin_code ?? correspondence.correspondence_pin_code) &&
          toStr(registered.contact_email) ===
            toStr(correspondence.contact_email ?? correspondence.correspondence_email) &&
          toTen(registered.contact_phone) ===
            toTen(correspondence.contact_phone ?? correspondence.correspondence_phone);
        setValue('sameAsRegistered', same, { shouldValidate: true });

        // If server returned any address_id, mark as existing for PUT
        setAddressExists(Boolean(registered.address_id || correspondence.address_id));
      } catch (e) {
        // silent
      }
    };
    fetchAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const onSubmit = async (form) => {
    const base = process.env.REACT_APP_HOST_API || '';
    const payload = {};
    const add = (k, v) => {
      payload[k] = v ?? '';
    };

    // Map Registered (screenshot keys)
    add('is_same_address', String(!!form.sameAsRegistered));
    add('registered_office', form.registeredAddressLine1);
    add('country', form.registeredCountry);
    add('city', form.registeredCity);
    add('state_ut', form.registeredState);
    add('pin_code', form.registeredPincode);
    add('country', 'India');
    add('contact_email', form.registeredEmail);
    add(
      'contact_phone',
      form.registeredPhone?.startsWith('+') ? form.registeredPhone : `+91${form.registeredPhone}`
    );

    // Map Correspondence
    const corrSame = !!form.sameAsRegistered;
    const corrAddr1 = corrSame ? form.registeredAddressLine1 : form.correspondenceAddressLine1;
    const corrCountry = corrSame ? form.registeredCountry : form.correspondenceCountry;
    const corrCity = corrSame ? form.registeredCity : form.correspondenceCity;
    const corrState = corrSame ? form.registeredState : form.correspondenceState;
    const corrPin = corrSame ? form.registeredPincode : form.correspondencePincode;
    const corrEmail = corrSame ? form.registeredEmail : form.correspondenceEmail;
    const corrPhoneRaw = corrSame ? form.registeredPhone : form.correspondencePhone;
    const corrPhone = corrPhoneRaw?.startsWith('+') ? corrPhoneRaw : `+91${corrPhoneRaw || ''}`;

    add('correspondence_address', corrAddr1);
    add('correspondence_city', corrCountry);
    add('correspondence_city', corrCity);
    add('correspondence_state_ut', corrState);
    add('correspondence_pin_code', corrPin);
    add('correspondence_country', 'India');
    add('correspondence_email', corrEmail);
    add('correspondence_phone', corrPhone);

    try {
      setIsUploading(true);
      const method = addressExists ? 'PUT' : 'POST';
      const res = await fetch(`${base}/api/kyc/issuer_kyc/company/address/`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to save address');
      }
      // Navigate on success
      router.push(paths.KYCCompanyDetails);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    console.log('📂 Dropped Files:', acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      setValue('addressProof', file, { shouldValidate: true });
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      const base = process.env.REACT_APP_HOST_API || '';
      const formData = new FormData();
      formData.append('document', file);
      try {
        setIsUploading(true);
        const res = await fetch(`${base}/api/kyc/issuer_kyc/doc-extraction/`, {
          method: 'POST',
          headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: formData,
        });
        if (!res.ok) {
          throw new Error('Document upload failed');
        }
        let data = {};
        try {
          data = await res.json();
        } catch (e) {
          data = {};
        }
        const extracted = data?.data || {};
        const toStr = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v));
        // Prefill Registered Address fields; inputs remain editable
        setValue('registeredAddressLine1', toStr(extracted.address_line1), {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue('registeredAddressLine2', toStr(extracted.address_line2), {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue('registeredCountry', toStr(extracted.country), {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue('registeredCity', toStr(extracted.city), {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue('registeredState', toStr(extracted.state), {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue('registeredPincode', toStr(extracted.pin), {
          shouldDirty: true,
          shouldValidate: true,
        });
        console.log('Doc extraction response:', data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemove = () => {
    setValue('addressProof', null, { shouldValidate: true });
    setPreview(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <KYCStepper />

      <KYCTitle
        title="Fill Your Address Information"
        subtitle={'Provide registered and correspondence addresses'}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Address Proof Section */}
            <Stack spacing={4}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Stack direction="column">
                  <Typography variant="h4" sx={{ mb: 1, color: 'text.primary' }}>
                    Upload Address Proof
                    <Tooltip
                      title={
                        <>
                          Upload a document to confirm your address and fetch the details
                          automatically (e.g., utility bill, registered address and correspondence).
                          <br />
                          <strong>Maximum file size:</strong> 5 MB
                        </>
                      }
                      arrow
                      placement="right"
                    >
                      <IconButton size="small" sx={{ color: 'text.secondary', mt: -0.5 }}>
                        <Iconify icon="mdi:information-outline" width={20} />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="column" spacing={2} sx={{ mb: 2, alignItems: 'start' }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Select Document Type:
                </Typography>
                <Box sx={{ width: 200 }}>
                  <RHFSelect
                    name="documentType"
                    placeholder="Select Document Type"
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) => {
                        if (!value) {
                          return <Box sx={{ color: 'text.disabled' }}>Select Type</Box>;
                        }
                        const options = [
                          { value: 'electricityBill', label: 'Electricity Bill' },
                          { value: 'leaseAgreement', label: 'Lease Agreement' },
                        ];
                        const selectedOption = options.find((option) => option.value === value);
                        return selectedOption ? selectedOption.label : value;
                      },
                    }}
                  >
                    <MenuItem value="electricityBill">Electricity Bill</MenuItem>
                    <MenuItem value="leaseAgreement">Lease Agreement</MenuItem>
                  </RHFSelect>
                </Box>
              </Stack>

              {/* <Box sx={{ width: '100%' }}>
                {!addressProof ? (
                  <RHFUploadBox
                    name="addressProof"
                    onDrop={handleDrop}
                    maxSize={5 * 1024 * 1024} // 5MB
                    accept={{
                      'application/pdf': ['.pdf'],
                      'image/*': ['.jpeg', '.jpg', '.png'],
                    }}
                    sx={{
                      width: '100%',
                      height: 200,
                      m: 0,
                      bgcolor: 'transparent',
                      border: 'none',
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                    placeholder={
                      <StyledDropZone>
                        <Iconify
                          icon="solar:cloud-upload-bold"
                          width={48}
                          sx={{ color: 'text.disabled' }}
                        />
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                          Upload file
                        </Typography>
                        <Box
                          sx={{
                            textAlign: 'center',
                            bgcolor: '#D0E4FF',
                            p: 1,
                            borderRadius: 0.5,
                            width: { xs: '90%', md: '40%' },
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: 0.5 }}>
                            Electricity Bill / Lease Agreement
                          </Typography>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            Drag & drop or choose file
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Supported file types: PDF, JPG, PNG (Max 5MB)
                        </Typography>
                      </StyledDropZone>
                    }
                  />
                ) : (
                  <Box
                    sx={{
                      p: 2,
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      textAlign: 'center',
                    }}
                  >
                    {preview && addressProof.type.startsWith('image/') ? (
                      <Box
                        component="img"
                        src={preview}
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 150,
                          mb: 2,
                          borderRadius: 1,
                        }}
                        alt="Preview"
                      />
                    ) : (
                      <Iconify
                        icon="clarity:document-solid"
                        width={48}
                        sx={{ color: 'text.disabled', mb: 1 }}
                      />
                    )}
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                      {addressProof.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {(addressProof.size / 1024).toFixed(2)} KB
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                      onClick={handleRemove}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </Box> */}
              {watch('documentType') && (
                <RHFFileUploadBox
                  name="addressProof"
                  label={`Upload ${
                    watch('documentType')
                      ? watch('documentType')
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())
                      : 'address proof'
                  }`}
                  icon="mdi:file-document-outline"
                  color="#1e88e5"
                  acceptedTypes="pdf,xls,docx,jpeg"
                  maxSizeMB={10}
                  onDrop={async (acceptedFiles) => {
                    const file = acceptedFiles[0];
                    if (file) {
                      setValue('panFile', file, { shouldValidate: true });
                      await handleDrop(file);
                    }
                  }}
                />
              )}
              <YupErrorMessage name="addressProof" />
            </Stack>
            <Stack spacing={4} pt={2}>
              {/* Address Section */}
              <Box>
                <Grid container spacing={3}>
                  {/* Registered Address */}
                  <Grid xs={12} md={6}>
                    <Typography
                      variant="h5"
                      sx={{ mb: 3, mt: 0, fontWeight: 600, color: 'primary.main' }}
                    >
                      Registered Address
                    </Typography>
                    <Stack spacing={2}>
                      <RHFTextField
                        name="registeredAddressLine1"
                        label="Address Line 1 *"
                        fullWidth
                      />
                      <RHFTextField
                        name="registeredAddressLine2"
                        label="Address Line 2"
                        fullWidth
                      />
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <RHFTextField name="registeredCountry" label="Country *" fullWidth disabled/>
                        <RHFTextField name="registeredCity" label="City *" fullWidth />
                        <RHFTextField name="registeredState" label="State *" fullWidth />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <RHFTextField name="registeredEmail" label="Email *" fullWidth disabled />
                        <RHFTextField
                          name="registeredPhone"
                          label="Phone No. *"
                          fullWidth
                          disabled
                        />
                      </Box>
                      <RHFTextField
                        name="registeredPincode"
                        label="Pincode *"
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                        }}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/\D/g, '');
                          setValue('registeredPincode', onlyNums, { shouldValidate: true });
                        }}
                        fullWidth
                      />
                    </Stack>
                  </Grid>

                  {/* Correspondence Address */}
                  <Grid xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Correspondence Address
                      </Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="sameAsRegistered"
                            checked={sameAsRegistered}
                            onChange={(e) =>
                              setValue('sameAsRegistered', e.target.checked, {
                                shouldValidate: true,
                              })
                            }
                          />
                        }
                        label="Same as Registered Address"
                        sx={{ m: 0 }}
                      />
                    </Box>

                    <Stack spacing={2} sx={{ opacity: sameAsRegistered ? 0.6 : 1 }}>
                      <RHFTextField
                        name="correspondenceAddressLine1"
                        label="Address Line 1 *"
                        fullWidth
                        disabled={sameAsRegistered}
                      />
                      <RHFTextField
                        name="correspondenceAddressLine2"
                        label="Address Line 2"
                        fullWidth
                        disabled={sameAsRegistered}
                      />
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <RHFTextField
                          name="correspondenceCountry"
                          label="Country *"
                          fullWidth
                          disabled
                        />

                        <RHFTextField
                          name="correspondenceCity"
                          label="City *"
                          fullWidth
                          disabled={sameAsRegistered}
                        />
                        <RHFTextField
                          name="correspondenceState"
                          label="State *"
                          fullWidth
                          disabled={sameAsRegistered}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <RHFTextField
                          name="correspondenceEmail"
                          label="Email *"
                          fullWidth
                          disabled
                        />
                        <RHFTextField
                          name="correspondencePhone"
                          label="Phone No. *"
                          fullWidth
                          disabled
                        />
                      </Box>
                      <RHFTextField
                        name="correspondencePincode"
                        label="Pincode *"
                        fullWidth
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                        }}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/\D/g, '');
                          setValue('registeredPincode', onlyNums, { shouldValidate: true });
                        }}
                        disabled={sameAsRegistered}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Paper>
          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
            <Button component={RouterLink} href={paths.KYCBasicInfo} variant="outlined">
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isUploading}
              sx={{ minWidth: 120 }}
            >
              Next
            </Button>
          </Box>
        </form>
      </FormProvider>

      <KYCFooter />
    </Container>
  );
}
