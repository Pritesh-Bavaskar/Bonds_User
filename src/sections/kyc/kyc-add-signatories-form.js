import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import RHFFileUploadBox from 'src/components/custom-file-upload/file-upload';
import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';

const roles = ['Director', 'Signatory', 'Manager'];

export default function KYCAddSignatoriesForm({ currentUser, open, onClose, companyId, onSuccess, isViewMode = false }) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address')
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Please enter a valid email address'
      ),
    din: Yup.string()
      .required('DIN is required')
      .matches(/^[0-9]+$/, 'DIN must contain only numbers')
      .max(8, 'DIN must be exactly 8 digits')
      .min(8, 'DIN must be exactly 8 digits'),
    role: Yup.string().required('Role is required'),
    panCard: Yup.mixed()
      .required('PAN card is required')
      .test('fileSize', 'File size is too large', (value) => {
        if (!value) return false;
        return value.size <= 10 * 1024 * 1024; // 10MB
      }),
    aadhaarCard: Yup.mixed()
      .required('Aadhaar card is required')
      .test('fileSize', 'File size is too large', (value) => {
        if (!value) return false;
        return value.size <= 10 * 1024 * 1024; // 10MB
      }),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name_of_signatory || '',
      email: currentUser?.email_address || '',
      din: currentUser?.din || '',
      role: currentUser?.designation || '',
      panNumber: currentUser?.pan_number || '',
      aadhaarNumber: currentUser?.aadhaar_number || '',
      panCard: null,
      aadhaarCard: null,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  // Reset form when currentUser changes (for view mode)
  useEffect(() => {
    if (currentUser) {
      methods.reset({
        ...defaultValues,
      });
    }
  }, [currentUser, defaultValues, methods]);

    // Helper function to get error message for a field
  const getErrorMessage = (fieldName) => {
    if (!errors[fieldName]) return null;
    return (
      <Box component="span" sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, display: 'block' }}>
        {errors[fieldName]?.message}
      </Box>
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      // Add file data if exists
      if (data.panCard) {
        formData.append('document_file_pan', data.panCard);
      }
      if (data.aadhaarCard) {
        formData.append('document_file_aadhaar', data.aadhaarCard);
      }

      // Add other form fields
      formData.append('name_of_signatory', data.name);
      formData.append('email_address', data.email);
      formData.append('din', data.din);
      formData.append('designation', data.role);

      // Get token from sessionStorage
      const token = sessionStorage.getItem('accessToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_HOST_API}/api/kyc/issuer_kyc/company/${
          companyId || '01981cf1-60da-43be-b0db-9159768ecc97'
        }/signatories/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reset();
      enqueueSnackbar('Signatory added successfully!');
      console.info('API Response:', response.data);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('Error adding signatory:', error);
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to add signatory. Please try again.',
        { variant: 'error' }
      );
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{isViewMode ? 'View' : 'Add'} Authorized Signatory</DialogTitle>

        <DialogContent
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            overflowY: 'auto',
            maxHeight: '70vh',
            pr: 2,
          }}
        >
          <Box rowGap={3} display="grid">
            <RHFTextField
              name="name"
              label="Name"
              InputLabelProps={{ shrink: true }}
              disabled={isViewMode}
            />
            {getErrorMessage('name')}

            <RHFTextField
              name="email"
              label="Email"
              type="email"
              InputLabelProps={{ shrink: true }}
              disabled={isViewMode}
            />
            {getErrorMessage('email')}

            <RHFTextField
              name="din"
              label="DIN"
              InputLabelProps={{ shrink: true }}
              disabled={isViewMode}
            />
            {getErrorMessage('din')}

            <RHFSelect
              name="role"
              label="Designation"
              InputLabelProps={{ shrink: true }}
              disabled={isViewMode}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </RHFSelect>
            {getErrorMessage('role')}

            {isViewMode ? (
              <>
                <RHFTextField
                  name="panNumber"
                  label="PAN Number"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <RHFTextField
                  name="aadhaarNumber"
                  label="Aadhaar Number"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </>
            ) : (
              <>
                <RHFFileUploadBox
                  name="panCard"
                  label="Upload PAN (Required)"
                  accept="application/pdf,image/*"
                  fileType="pan"
                  required
                  error={!!errors.panCard}
                />
                {getErrorMessage('panCard')}

                <RHFFileUploadBox
                  name="aadhaarCard"
                  label="Upload Aadhaar (Required)"
                  accept="application/pdf,image/*"
                  fileType="aadhaar"
                  required
                  error={!!errors.aadhaarCard}
                />
                {getErrorMessage('aadhaarCard')}
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              {isViewMode ? 'Close' : 'Cancel'}
            </Button>

            {!isViewMode && (
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={isViewMode}
              >
                Add Signatory
              </LoadingButton>
            )}
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

KYCAddSignatoriesForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  open: PropTypes.bool.isRequired,
  isViewMode: PropTypes.bool,
  companyId: PropTypes.string,
};

