import { useState, useEffect } from 'react';
import axios from '../../utils/axiosConfig';
import { 
  Button, Dialog, DialogActions, Chip, DialogContent, 
  DialogContentText, DialogTitle, TextField, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Pagination, CircularProgress,
  Select, MenuItem, FormControl, InputLabel, Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';

const Complaints = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [totalReports, setTotalReports] = useState(0);
  const [newStatus, setNewStatus] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const itemsPerPage = 5;

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/reports', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
        },
      });
      
      setReports(response.data.reports);
      setTotalPages(response.data.totalPages);
      setTotalReports(response.data.totalReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      showSnackbar('Error fetching reports', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [currentPage, searchQuery]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDetails = (report) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setDetailsDialogOpen(true);
  };

  const handleBlock = () => {
    setBlockDialogOpen(true);
  };

  const handleConfirmBlock = async () => {
    if (selectedReport) {
      try {
        const response = await axios.patch(`/admin/reports/${selectedReport._id}/block-technician`);
        setBlockDialogOpen(false);
        showSnackbar(`Technician ${response.data.isBlocked ? 'blocked' : 'unblocked'} successfully`);
        fetchReports();
      } catch (error) {
        console.error('Error toggling technician block status:', error);
        showSnackbar('Error updating technician status', 'error');
      }
    }
  };

  const handleStatusChange = async () => {
    if (selectedReport && newStatus !== selectedReport.status) {
      try {
        await axios.patch(`/admin/reports/${selectedReport._id}/status`, {
          status: newStatus
        });
        setDetailsDialogOpen(false);
        showSnackbar('Report status updated successfully');
        fetchReports();
      } catch (error) {
        console.error('Error updating report status:', error);
        showSnackbar('Error updating report status', 'error');
      }
    }
  };

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl my-20 mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8 my-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Service Complaints</h1>
            {/* <TextField
              label="Search by Customer Name"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
            /> */}
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Service Category</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Technician</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No complaints found
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report, index) => (
                    <TableRow key={report._id}>
                      <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <img
                            src={report.user.profilePicture || '/default-avatar.png'}
                            alt={report.user.firstName}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          {report.user.firstName} {report.user.lastName}
                        </div>
                      </TableCell>
                      <TableCell>{report.service.serviceCategory.name}</TableCell>
                      <TableCell>{report.service.serviceType.name}</TableCell>
                      <TableCell>{report.technician.firstName} {report.technician.lastName}</TableCell>
                      <TableCell>
                        <Chip 
                          label={report.status} 
                          color={
                            report.status === 'resolved' ? 'success' :
                            report.status === 'in-review' ? 'primary' :
                            'warning'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleDetails(report)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </div>
          )}

          <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogContent>
              {selectedReport && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold">Description:</h3>
                    <p>{selectedReport.description}</p>
                  </div>
                  {selectedReport.imageUrls && selectedReport.imageUrls.length > 0 && (
                    <div>
                      <h3 className="font-bold">Images:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedReport.imageUrls.map((url, index) => (
                          <img key={index} src={url} alt={`Report image ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                        ))}
                      </div>
                    </div>
                  )}
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-review">In Review</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="contained" 
                      color={selectedReport.technician.isVerified ? "error" : "success"}
                      onClick={handleBlock}
                    >
                      {selectedReport.technician.isVerified ? "Block" : "Unblock"} Technician
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleStatusChange}>
                      Update Status
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={blockDialogOpen} onClose={() => setBlockDialogOpen(false)}>
            <DialogTitle>
              Confirm {selectedReport?.technician.isVerified ? 'Block' : 'Unblock'} Technician
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to {selectedReport?.technician.isVerified ? 'block' : 'unblock'} this technician?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setBlockDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmBlock} color={selectedReport?.technician.isVerified ? "error" : "success"}>
                {selectedReport?.technician.isVerified ? 'Block' : 'Unblock'}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar 
            open={snackbar.open} 
            autoHideDuration={4000} 
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </motion.div>
    </div>
  );
};

export default Complaints;