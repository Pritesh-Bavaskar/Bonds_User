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
import { format } from 'date-fns';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
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
import KYCAuditedFinancialStatement from './kyc-audited-financial-statement';
import KYCAuditedIncomeTaxReturn from './kyc-audited-income-tax-return';
import KYCAuditedGSTR9 from './kyc-audited-gstr9';
import KYCAuditedGST3B from './kyc-audited-gst3b';
// ----------------------------------------------------------------------

export default function KYCAuditedFinancial() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear - i;
    return {
      value: year.toString(),
      label: `${year - 1} - ${year}`, // Shows as "2023 - 2024" for FY 2023-24
    };
  });

  const methods = useForm({
    defaultValues: {
      documentType: '',
      baseYear: currentYear.toString(),
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {});

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid
        container
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1.5,
          p: 3,
          mt: 3,
          mb: 2,
        }}
      >
        <Grid xs={12}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Base Year (Latest Financial Year)
          </Typography>

          <Controller
            name="baseYear"
            control={control}
            render={({ field }) => (
              <RHFSelect
                {...field}
                select
                fullWidth
                placeholder="Select Year"
                sx={{ maxWidth: 200 }}
              >
                {years.map((yearData) => (
                  <MenuItem key={yearData.value} value={yearData.value}>
                    {yearData.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            )}
          />

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
            Select your latest financial year. Previous years will be auto populated
          </Typography>
        </Grid>
      </Grid>

      <KYCAuditedFinancialStatement />
      <KYCAuditedIncomeTaxReturn />
      <KYCAuditedGSTR9 />
      <KYCAuditedGST3B />
    </FormProvider>
  );
}
