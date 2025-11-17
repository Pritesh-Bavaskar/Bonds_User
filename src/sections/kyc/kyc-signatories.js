import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from 'src/components/iconify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// components
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
// import { useConfirm } from 'src/components/confirm-dialog';
import KYCTitle from './kyc-title';
import KYCFooter from './kyc-footer';
import KYCAddSignatoriesForm from './kyc-add-signatories-form';
import KYCStepper from './kyc-stepper';

// ----------------------------------------------------------------------

const StyledSearch = styled(TextField)(({ theme }) => ({
  width: 300,
  '& .MuiOutlinedInput-root': {
    height: 40,
    '& fieldset': {
      borderColor: theme.palette.grey[500],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// ----------------------------------------------------------------------

const COMPANY_ID = sessionStorage.getItem('company_information_id');

export default function KYCSignatories() {
  const [open, setOpen] = useState(false);
  const [viewSignatory, setViewSignatory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [signatories, setSignatories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [signatoryToDelete, setSignatoryToDelete] = useState(null);
  // const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = (signatory = null) => {
    setOpen(true);
    if (signatory) {
      setViewSignatory(signatory);
      setIsViewMode(false);
      setIsEditMode(true);
      console.log('Signatory provided');
    } else {
      setViewSignatory(null);
      setIsViewMode(false);
      setIsEditMode(false);
      console.log('Signatory not provided');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsViewMode(false);
    setIsEditMode(false);
    setViewSignatory(null);
  };

  const handleViewSignatory = async (signatoryId) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get(
        `${process.env.REACT_APP_HOST_API}/api/kyc/issuer_kyc/company/${signatoryId}/signatories/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 'success') {
        setViewSignatory(response.data.data);
        setIsViewMode(true);
        setOpen(true);
      }
    } catch (err) {
      console.error('Error fetching signatory details:', err);
      enqueueSnackbar('Failed to fetch signatory details', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchSignatories = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get(
        `${process.env.REACT_APP_HOST_API}/api/kyc/issuer_kyc/company/${COMPANY_ID}/signatories/list?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 'success') {
        setSignatories(response.data.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching signatories:', err);
      setError(err.response?.data?.message || 'Failed to fetch signatories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignatories();
  }, [page]);

  const filteredSignatories = signatories.filter((signatory) =>
    Object.values(signatory).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSignatoryAdded = () => {
    fetchSignatories(); // Refresh the list after adding a new signatory
  };

  const handleDeleteSignatory = async (signatoryId) => {
    setSignatoryToDelete(signatoryId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!signatoryToDelete) return;

    try {
      setLoading(true);
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('No authentication token found');

      await axios.delete(
        `${process.env.REACT_APP_HOST_API}/api/kyc/issuer_kyc/company/${signatoryToDelete}/signatories/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the list after successful deletion
      fetchSignatories();
      enqueueSnackbar('Signatory deleted successfully', { variant: 'success' });
    } catch (err) {
      console.error('Error deleting signatory:', err);
      enqueueSnackbar(err.response?.data?.message || 'Failed to delete signatory', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setSignatoryToDelete(null);
    }
  };

  return (
    <Container sx={{ position: 'relative', py: { xs: 6, sm: 8, md: 0 } }}>
      <KYCStepper />
      <KYCTitle
        title="Authorized Signatories"
        subtitle={'Add director and authorized signatories for your company'}
      />

      <Box
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            //   boxShadow: '0px 0px 12px 0px #00000040',
            // p: { xs: 2, sm: 3, md: 4 },
            // borderRadius: '23px',
          }}
        >
          <Typography variant="h4" sx={{ mb: { xs: 1, sm: 0 } }}>
            Add Signatories
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <StyledSearch
              placeholder="Search signatories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: { xs: '100%', sm: 300 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => handleOpen()}
              sx={{
                height: 40,
                width: { xs: '100%', sm: 'auto' },
                order: { xs: -1, sm: 1 },
              }}
            >
              Add Signatory
            </Button>

            <KYCAddSignatoriesForm
              open={open}
              onClose={handleClose}
              onSuccess={handleSignatoryAdded}
              companyId={COMPANY_ID}
              currentUser={viewSignatory}
              isViewMode={isViewMode}
              isEditMode={isEditMode}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete Signatory</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this signatory? This action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  color="error"
                  variant="contained"
                  autoFocus
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Delete'}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ mb: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="signatories table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">DIN</TableCell>
                <TableCell align="left">Designation</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">PAN</TableCell>
                <TableCell align="left">Aadhaar</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Alert severity="error">{error}</Alert>
                  </TableCell>
                </TableRow>
              ) : filteredSignatories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No signatories found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSignatories.map((signatory) => (
                  <TableRow
                    key={signatory.signatory_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {signatory.name_of_signatory}
                    </TableCell>
                    <TableCell align="left">{signatory.din}</TableCell>
                    <TableCell align="left">{signatory.designation}</TableCell>
                    <TableCell align="left">{signatory.email_address}</TableCell>
                    <TableCell align="left">{signatory.pan_number || '-'}</TableCell>
                    <TableCell align="left">{signatory.aadhaar_number || '-'}</TableCell>
                    <TableCell align="left">
                      <Box
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          color: signatory.status === 'PENDING' ? 'warning.dark' : 'success.dark',
                          bgcolor:
                            signatory.status === 'PENDING' ? 'warning.lighter' : 'success.lighter',
                          textTransform: 'capitalize',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {signatory.status.toLowerCase()}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          color="info"
                          aria-label="view"
                          onClick={() => handleViewSignatory(signatory.signatory_id)}
                          disabled={loading}
                        >
                          <Iconify icon="eva:eye-outline" />
                        </IconButton>
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          onClick={() => handleOpen(signatory)}
                          disabled={loading}
                        >
                          <Iconify icon="eva:edit-outline" />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="delete"
                          onClick={() => handleDeleteSignatory(signatory.signatory_id)}
                          disabled={loading}
                        >
                          <Iconify icon="eva:trash-2-outline" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
        <Button component={RouterLink} href={paths.KYCBankDetails} variant="outlined">
          Back
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to={paths.KYCReviewAndSubmit}
          // loading={isSubmitting}
        >
          Next
        </Button>
      </Box>
      <KYCFooter />
    </Container>
  );
}
