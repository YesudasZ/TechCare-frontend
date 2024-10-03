import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Select, MenuItem, Avatar, TablePagination 
} from '@mui/material';
import axios from '../../utils/axiosConfig';

const TechnicianServices = () => {
  const [acceptedServices, setAcceptedServices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchAcceptedServices();
  }, []);

  const fetchAcceptedServices = async () => {
    try {
      const response = await axios.get('/technician/accepted-services');
      setAcceptedServices(response.data);
    } catch (error) {
      console.error('Error fetching accepted services:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (service) => {
    setSelectedService(service);
    setNewStatus(service.status);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedService(null);
    setNewStatus('');
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.patch(`/technician/update-service-status/${selectedService._id}`, { status: newStatus });
      fetchAcceptedServices();
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  return (
    <Box sx={{ padding: 15 }}>
      <Typography variant="h4" gutterBottom>
        Accepted Services
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {acceptedServices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service) => (
                <TableRow key={service._id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={service.user.profilePicture} alt={service.user.firstName} sx={{ marginRight: 1 }} />
                      {service.user.firstName} {service.user.lastName}
                    </Box>
                  </TableCell>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell>{new Date(service.appointmentDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(service.appointmentTime).toLocaleTimeString()}</TableCell>
                  <TableCell>{service.address.city}</TableCell>
                  <TableCell>{service.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpenDialog(service)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={acceptedServices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Service Details</DialogTitle>
        <DialogContent>
          {selectedService && (
            <DialogContentText>
              <Typography variant="body1"><strong>User:</strong> {selectedService.user.firstName} {selectedService.user.lastName}</Typography>
              <Typography variant="body1"><strong>Service:</strong> {selectedService.serviceName}</Typography>
              <Typography variant="body1"><strong>Date:</strong> {new Date(selectedService.appointmentDate).toLocaleDateString()}</Typography>
              <Typography variant="body1"><strong>Time:</strong> {new Date(selectedService.appointmentTime).toLocaleTimeString()}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {selectedService.address.street}, {selectedService.address.city}, {selectedService.address.state}, {selectedService.address.country}, {selectedService.address.postalCode}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {selectedService.address.phoneNumber}</Typography>
              <Typography variant="body1"><strong>Current Status:</strong> {selectedService.status}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1"><strong>Update Status:</strong></Typography>
                <Select
                  value={newStatus}
                  onChange={handleStatusChange}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="accepted">Accepted</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </Box>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TechnicianServices;
