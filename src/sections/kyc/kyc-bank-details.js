// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { RHFUploadBox } from 'src/components/hook-form/rhf-upload';
import { alpha, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// components
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import { useForm, useWatch } from 'react-hook-form';

// sections
import KYCTitle from './kyc-title';
import KYCFooter from './kyc-footer';
import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify';
import KYCStepper from './kyc-stepper';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import YupErrorMessage from 'src/components/error-field/yup-error-messages';
import RHFFileUploadBox from 'src/components/custom-file-upload/file-upload';

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

const steps = ['Auto-Fill', 'Verify'];

export default function KYCBankDetails() {
  const { enqueueSnackbar } = useSnackbar();
  const [showDemat, setShowDemat] = useState(false);
  const [preview, setPreview] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const NewSchema = Yup.object().shape({
    documentType: Yup.string().required('Document Type is required'),
    bankName: Yup.string().required('Bank Name is required'),
    branchName: Yup.string().required('Branch Name is required'),
    accountNumber: Yup.string().required('Account Number is required'),
    ifscCode: Yup.string().required('IFSC Code is required'),
    accountType: Yup.string().required('Account Type is required'),
    addressProof: Yup.mixed().required('Address proof is required'),
    dpId: Yup.string().required('DP ID is required'),
    dpName: Yup.string().required('DP Name is required'),
    beneficiaryClientId: Yup.string().required('Beneficiary/Client ID is required'),
    dematAccountNumber: Yup.string().required('Demat Account Number is required'),
    depository: Yup.string().required('Depository is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      documentType: 'passbook',
      bankName: '',
      branchName: '',
      accountNumber: '',
      ifscCode: '',
      accountType: 'SAVINGS',
      addressProof: null,
      dpId: '',
      dpName: '',
      beneficiaryClientId: '',
      dematAccountNumber: '',
      depository: '',
    },
  });
  const {
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();
  const addressProof = useWatch({ control, name: 'addressProof' });
  const documentType = useWatch({ control, name: 'documentType' });
  const COMPANY_ID = sessionStorage.getItem('company_information_id');

  const verifyBankDetail = async (data) => {
    console.log('Verifying bank details with values:');

    const bankPayload = {
      account_number: data.accountNumber,
      bank_name: data.bankName,
      branch_name: data.branchName,
      account_type: data.accountType,
      ifsc_code: data.ifscCode,
    };

    try {
      const data = methods.getValues();

      const payload = {
        account_number: data.accountNumber,
        bank_name: data.bankName,
        branch_name: data.branchName,
        account_type: data.accountType,
        ifsc_code: data.ifscCode,
      };

      const res = await axiosInstance.post(
        `/api/kyc/issuer_kyc/bank-details/verify/`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      enqueueSnackbar(res.data?.message || 'Bank details verified successfully ✅', {
        variant: 'success',
      });

      // ✅ Open the Demat section on success
      const resSubmit = await axiosInstance.post(
        `/api/kyc/issuer_kyc/bank-details/submit/`,
        bankPayload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      enqueueSnackbar(resSubmit.data?.message || 'Bank details submitted successfully ✅', {
        variant: 'success',
      });
      setShowDemat(true);
    } catch (error) {
      console.error('❌ Error verifying bank details:', error.response?.data || error);

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.errors?.[Object.keys(error.response?.data?.errors || {})[0]]?.[0] ||
        'Bank verification failed. Please check your details and try again.';

      // ✅ Use snackbar for error message
      enqueueSnackbar(errMsg, { variant: 'error' });
    }
  };

  const handleDrop = (acceptedFiles) => {
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
      extractBankDetails(file);
    }
  };

  const handleRemove = () => {
    setValue('addressProof', null, { shouldValidate: true });
    setPreview(null);
  };

  const extractBankDetails = async (file) => {
    try {
      const formData = new FormData();
      formData.append('document_type', documentType); // ✅ from form
      formData.append('file', file); // ✅ backend expects 'document'

      const res = await axiosInstance.post(
        `/api/kyc/issuer_kyc/bank-details/extract/`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('Extracted data:', res.data);

      const extracted = res.data?.data?.extracted_data?.data;
      if (!extracted) throw new Error('Invalid response structure');

      // ✅ Auto-fill fields from extracted data
      setValue('bankName', extracted.bank_name || '', { shouldValidate: true });
      setValue('branchName', extracted.branch_name || '', { shouldValidate: true });
      setValue('accountNumber', extracted.account_number || '', { shouldValidate: true });
      setValue('ifscCode', extracted.ifsc_code || '', { shouldValidate: true });
      setValue('accountType', extracted.account_type || 'SAVINGS', {
        shouldValidate: true,
        // shouldDirty: true,
      });
    } catch (error) {
      console.error('Error extracting bank details:', error);
      alert(error.response?.data?.message || 'Failed to extract bank details. Please try again.');
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      // ✅ BANK PAYLOAD
      // const bankPayload = {
      //   account_number: data.accountNumber,
      //   bank_name: data.bankName,
      //   branch_name: data.branchName,
      //   account_type: data.accountType,
      //   ifsc_code: data.ifscCode,
      // };

      // ✅ DEMAT PAYLOAD
      const dematPayload = {
        dp_name: data.dpName,
        depository_participant: data.depository, // NSDL/CDSL
        dp_id: Number(data.dpId),
        demat_account_number: Number(data.dematAccountNumber),
        client_id_bo_id: Number(data.beneficiaryClientId),
      };

      // console.log('📤 Submitting Bank Payload:', bankPayload);
      console.log('📤 Submitting Demat Payload:', dematPayload);

      // ✅ Parallel API Calls
      const [bankRes, dematRes] = await Promise.all([
        // axiosInstance.post(`/api/kyc/issuer_kyc/bank-details/${COMPANY_ID}/submit/`, bankPayload, {
        //   headers: { 'Content-Type': 'application/json' },
        // }),
        axiosInstance.post(`/api/kyc/issuer_kyc/company/demat/`, dematPayload, {
          headers: { 'Content-Type': 'application/json' },
        }),
      ]);

      // ✅ Handle Success
      // enqueueSnackbar(bankRes.data?.message || 'Bank details submitted successfully ✅', {
      //   variant: 'success',
      // });
      enqueueSnackbar(dematRes.data?.message || 'Demat details submitted successfully ✅', {
        variant: 'success',
      });

      // console.log('✅ Bank Response:', bankRes.data);
      console.log('✅ Demat Response:', dematRes.data);

      // Optional: Move to next page
      // navigate(paths.KYCSignatories);
    } catch (error) {
      console.error('❌ Error in submitting bank or demat details:', error.response?.data || error);

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.errors?.[Object.keys(error.response?.data?.errors || {})[0]]?.[0] ||
        'Submission failed. Please check details and try again.';

      enqueueSnackbar(errMsg, { variant: 'error' });
    }
  });

  console.log('values', values);

  return (
    <Container>
      <KYCStepper />
      <KYCTitle
        title="Bank & Demat Details"
        subtitle={'Add your bank and demat account information'}
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Paper
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Stack direction="column">
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                Auto-Fill Details
              </Typography>
              <Typography variant="h5" sx={{ mb: 1, color: 'text.primary' }}>
                Upload Passbook/cancel cheque/bank statement to fill the details automatically
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={2} sx={{ my: 2, alignItems: 'start' }}>
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
                      { value: 'passbook', label: 'Passbook' },
                      { value: 'cheque', label: 'Cheque' },
                      { value: 'bank_statement', label: 'Bank Statement' },
                    ];
                    const selectedOption = options.find((option) => option.value === value);
                    return selectedOption ? selectedOption.label : value;
                  },
                }}
              >
                <MenuItem value="passbook">Passbook</MenuItem>
                <MenuItem value="cheque">Cheque</MenuItem>
                <MenuItem value="bank_statement">Bank Statement</MenuItem>
              </RHFSelect>
            </Box>
          </Stack>
          {/* Address Proof Section */}
          <Stack spacing={4}>
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
                        Upload Document
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
                  (watch('documentType') === 'passbook' && 'Passbook') ||
                  (watch('documentType') === 'cheque' && 'Cheque') ||
                  (watch('documentType') === 'bank_statement' && 'Bank Statement')
                }`}
                icon="mdi:file-document-outline"
                color="#1e88e5"
                acceptedTypes="pdf,xls,docx,jpeg"
                maxSizeMB={10}
                onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
              />
            )}
            <YupErrorMessage name="addressProof" />
          </Stack>
          <Box sx={{ py: 4 }}>
            <Grid container spacing={3}>
              {/* Left Section (9 columns) */}
              <Grid xs={12} md={9} order={{ xs: 2, md: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Bank Name */}
                  <Box>
                    <Box sx={{ mb: 1, fontWeight: 600 }}>Bank Name</Box>
                    {/* <RHFSelect
                      name="bankName"
                      placeholder="Select Bank"
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) =>
                          value || <Box sx={{ color: 'text.disabled' }}>Select Bank</Box>,
                      }}
                    >
                      <MenuItem value="">Select Bank</MenuItem>
                    </RHFSelect> */}
                    <RHFTextField name="bankName" placeholder="Enter Name"
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                    >
                      This will be filled automatically after verifying your IFSC code
                    </Typography>
                  </Box>

                  {/* Branch Name */}
                  <Box>
                    <Box sx={{ mb: 1, fontWeight: 600 }}>Branch Name</Box>
                    <RHFTextField name="branchName" placeholder="Enter Branch Name" />
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                    >
                      Branch name is automatically detected once IFSC code is confirmed.
                    </Typography>
                  </Box>

                  {/* Account Number */}
                  <Box>
                    <Box sx={{ mb: 1, fontWeight: 600 }}>Account Number</Box>
                    <RHFTextField name="accountNumber" placeholder="Enter Account Number" />
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                    >
                      Your account number is encrypted and secure.
                    </Typography>
                  </Box>

                  {/* IFSC Code + Verify */}
                  <Box>
                    <Box sx={{ mb: 1, fontWeight: 600 }}>IFSC Code</Box>
                    <RHFTextField
                      name="ifscCode"
                      placeholder="Enter IFSC Code (E.G., SBIN001234)"
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                    >
                      Enter your IFSC code to auto-detect your bank and branch details.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        type="button"
                        onClick={() => verifyBankDetail(values)}
                      >
                        Verify
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right Section (3 columns) */}
              <Grid xs={12} md={3} order={{ xs: 1, md: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Account Type */}
                  <Box>
                    <Box sx={{ mb: 1, fontWeight: 600 }}>Account Type</Box>
                    <RHFSelect name="accountType" placeholder="Select Account Type">
                      <MenuItem value="">Select Account Type</MenuItem>
                      <MenuItem value="SAVINGS">Savings</MenuItem>
                      <MenuItem value="CURRENT">Current</MenuItem>
                    </RHFSelect>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                    >
                      Select your account type to proceed.
                    </Typography>
                  </Box>

                  {/* Illustration */}
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src="/assets/images/kyc/kyc-basic-info/kyc-autofill.svg"
                      alt="Bank details illustration"
                      sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* </FormProvider> */}

        {/* {showDemat && ( */}
        {/* <> */}
        <Paper
          sx={{
            mt: 3,
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 3, mb: 2 }}>
            Demat Account Details
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
            Required for bond transactions
          </Typography>
          {/* <FormProvider methods={dematMethods} onSubmit={onSubmitDemat}> */}
          <Box sx={{ py: 2 }}>
            <Grid container spacing={3}>
              {/* Left Section (9 columns) */}
              <Grid xs={12} md={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button variant="contained">Fetch</Button>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <Box>
                        <Box sx={{ mb: 1, fontWeight: 600 }}>DP ID</Box>
                        <RHFTextField name="dpId" placeholder="Enter DP ID (8 Digits)" />
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                        >
                          Depository Participant Identification
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Box>
                        <Box sx={{ mb: 1, fontWeight: 600 }}>DP Name</Box>
                        <RHFTextField name="dpName" placeholder="zerodha broking ltd (fetch)" />
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                        >
                          Beneficial Owner Identification
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Box>
                        <Box sx={{ mb: 1, fontWeight: 600 }}>Client ID / BO ID</Box>
                        <RHFTextField name="beneficiaryClientId" placeholder="123456678" />
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                        >
                          Enter A Number of Client ID / BO ID
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Box>
                        <Box sx={{ mb: 1, fontWeight: 600 }}>Demat ID</Box>
                        <RHFTextField
                          name="dematAccountNumber"
                          placeholder="Enter 16 digit Number "
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                        >
                          Enter a Depository Participant Identification & Client ID
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Box>
                        <Box sx={{ mb: 1, fontWeight: 600 }}>Depository</Box>
                        <RHFSelect
                          name="depository"
                          placeholder="Select Depository"
                          SelectProps={{
                            displayEmpty: true,
                            renderValue: (value) =>
                              value || <Box sx={{ color: 'text.disabled' }}>CDSL</Box>,
                          }}
                        >
                          <MenuItem value="CDSL">CDSL</MenuItem>
                          <MenuItem value="NSDL">NSDL</MenuItem>
                        </RHFSelect>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}
                        >
                          Depository Participant Identification
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'flex' },
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          component="img"
                          src="/assets/images/kyc/kyc-demat-img.svg"
                          alt="Bank details illustration"
                          sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Right Section (3 columns) */}
              {/* <Grid xs={12} md={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    <Box
                      component="img"
                      src="/assets/images/kyc/kyc-basic-info/kyc-autofill.svg"
                      alt="Demat illustration"
                      sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                  </Box>
                </Grid> */}
            </Grid>
          </Box>

          {/* Demat Account Information Tip */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              border: '1px solid #0049C6',
              borderRadius: 1,
              backgroundColor: 'rgba(0, 111, 255, 0.05)',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#006FFF', fontWeight: 600, mb: 1 }}>
              Demat Account Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Your DP ID and BO ID can be found on your demat account statement. These details are
              required to facilitate bond transactions and settlements.
            </Typography>
          </Box>

          {/* Account Verification Section */}
          <Box
            sx={{
              mt: 3,
              p: 3,
              backgroundColor: '#FFF7EA',
              borderRadius: 1,
              border: '1px solid #FFEBD0',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#7B332B', fontWeight: 600, mb: 1 }}>
              Account Verification
            </Typography>
            <Typography variant="body2" sx={{ color: '#BE5149', mb: 2 }}>
              Your bank and demat account details will be verified during the compliance review
              process. Please ensure all information is accurate to avoid delays
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0, '& li': { color: '#ED9B00', mb: 0.5 } }}>
              <Typography component="li" variant="body2">
                Bank account should be in the company's name
              </Typography>
              <Typography component="li" variant="body2">
                Demat account should be linked to the same company
              </Typography>
              <Typography component="li" variant="body2">
                All details will be cross-verified with regulatory databases
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
          <Button component={RouterLink} href={paths.KYCCompanyDetails} variant="outlined">
            Back
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </FormProvider>

      <KYCFooter />
    </Container>
  );
}
