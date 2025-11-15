import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// sections
import KYCTitle from './kyc-title';
import KYCFooter from './kyc-footer';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import KYCStepper from './kyc-stepper';
import KYCAuditedDocuments from './kyc-audited-documents';
import axiosInstance from 'src/utils/axios';
import dayjs from 'dayjs';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  width: '100%',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  borderRadius: 1,
  border: `1px dashed ${theme.palette.divider}`,
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

export default function KYCAuditedGSTR9() {
  const [auditorName, setAuditorName] = useState('');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      year: '2022-23',
      file: null,
      status: 'Pending',
      reportDate: null,
    },
    {
      id: 2,
      year: '2023-24',
      file: null,
      status: 'Uploaded',
      reportDate: new Date('2024-03-31'),
    },
    {
      id: 3,
      year: '2024-25',
      file: null,
      status: 'Invalid',
      reportDate: new Date('2025-03-31'),
    },
  ]);

  const handleFileUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === id ? { ...doc, file: file, status: 'Uploaded', reportDate: new Date() } : doc
        )
      );
    }
  };

  const handleDateChange = (date, id) => {
    setDocuments((docs) => docs.map((doc) => (doc.id === id ? { ...doc, reportDate: date } : doc)));
  };

  const handleDelete = (id) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === id ? { ...doc, file: null, status: 'Pending', reportDate: null } : doc
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Uploaded':
        return 'success';
      case 'Invalid':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Container disableGutters>
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
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Audited GSTR-9 Annual Returns (Last 3 Years)
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Upload your company's audited balance sheets, P&L statements and reports.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Auditor Name
            </Typography>
            <RHFTextField
              name="auditorName"
              placeholder="Enter auditor name"
              fullWidth
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
            />
          </Box>

          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1.5fr 120px',
                border: '1px solid',
                borderColor: 'divider',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                overflow: 'hidden',
                '& > *': {
                  p: 1.5,
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderRight: 'none',
                  },
                },
              }}
            >
              <Typography variant="subtitle2">Year</Typography>
              <Typography variant="subtitle2">Upload File</Typography>
              <Typography variant="subtitle2">Status</Typography>
              <Typography variant="subtitle2">Report Date</Typography>
              <Typography variant="subtitle2" align="center">
                Actions
              </Typography>
            </Box>

            {documents.map((doc) => (
              <Box
                key={doc.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1.5fr 120px',
                  border: '1px solid',
                  borderTop: 'none',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  },
                  '& > *': {
                    p: 1.5,
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    '&:last-child': {
                      borderRight: 'none',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <Typography variant="body2">{doc.year}</Typography>
                <Box>
                  {!doc.file ? (
                    <label htmlFor={`file-upload-${doc.id}`}>
                      <StyledDropZone>
                        <Iconify icon="solar:upload-minimalistic-bold" width={16} />
                        <Typography variant="caption">Click to upload</Typography>
                      </StyledDropZone>
                      <input
                        id={`file-upload-${doc.id}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, doc.id)}
                      />
                    </label>
                  ) : (
                    <Typography variant="body2">{doc.file.name}</Typography>
                  )}
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: (theme) =>
                        alpha(theme.palette[getStatusColor(doc.status)].main, 0.16),
                      color: (theme) => theme.palette[getStatusColor(doc.status)].dark,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: (theme) => theme.palette[getStatusColor(doc.status)].main,
                        mr: 1,
                      }}
                    />
                    <Typography variant="caption">{doc.status}</Typography>
                  </Box>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={doc.reportDate}
                      onChange={(date) => handleDateChange(date, doc.id)}
                      format="dd MMM yyyy"
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          variant: 'outlined',
                          placeholder: 'Select date',
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ gap: 1, display: 'flex' }}>
                  {doc.file && (
                    <IconButton size="small" color="primary">
                      <Iconify icon="solar:eye-bold" width={20} />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => document.getElementById(`file-upload-${doc.id}`)?.click()}
                  >
                    <Iconify icon="solar:refresh-bold" width={20} />
                  </IconButton>
                  {doc.file && (
                    <IconButton size="small" color="error" onClick={() => handleDelete(doc.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" width={20} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
