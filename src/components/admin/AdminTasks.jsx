import { useState, useEffect } from 'react';
import axios from '../../utils/axiosConfig';
import { 
  Button, Dialog, DialogActions, Chip, DialogContent, 
  DialogContentText, DialogTitle, TextField, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Pagination, CircularProgress 
} from '@mui/material';
import { motion } from 'framer-motion';

const AdminTasks = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [totalServices, setTotalServices] = useState(0);

  const itemsPerPage = 5;

  const fetchServiceRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/service-requests', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
        },
      });
      
      setServices(response.data.services);
      setTotalPages(response.data.totalPages);
      setTotalServices(response.data.totalServices);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, [currentPage, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePay = (service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (selectedService) {
      try {
        await axios.post(`/admin/pay-technician/${selectedService._id}`);
        setDialogOpen(false);
        setSelectedService(null);
        fetchServiceRequests(); 
      } catch (error) {
        console.error('Error processing payment:', error);
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
            <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>
            <TextField
              label="Search by Customer Name"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
            />
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
                ) : services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No service requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service, index) => (
                    <TableRow key={service._id}>
                      <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <img
                            src={service.user.profilePicture || '/default-avatar.png'}
                            alt={service.user.firstName}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          {service.user.firstName} {service.user.lastName}
                        </div>
                      </TableCell>
                      <TableCell>{service.serviceCategory.name}</TableCell>
                      <TableCell>{service.serviceType.name}</TableCell>
                      <TableCell>
                        {service.technician 
                          ? `${service.technician.firstName} ${service.technician.lastName}` 
                          : 'Not Assigned'}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={service.status} 
                          color={
                            service.status === 'completed' ? 'success' :
                            service.status === 'in-progress' ? 'primary' :
                            service.status === 'pending' ? 'warning' : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {service.status === 'completed' && !service.isPayTechnician ? (
                          <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => handlePay(service)}
                          >
                            Pay
                          </Button>
                        ) : service.isPayTechnician ? (
                          <Chip label="Paid" color="success" />
                        ) : null}
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

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to send service task payment to the technician's wallet?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirmPayment} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTasks;