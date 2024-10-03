import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { Person, CalendarToday, LocationOn, AccessTime, Check } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from "../../utils/axiosConfig";

const TechnicianDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [weeklyServices, setWeeklyServices] = useState([]);
  const [weeklyEarnings, setWeeklyEarnings] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const SERVICE_TYPES = ['Repair', 'Installation', 'Maintenance'];

console.log("user test",user);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${SERVICE_TYPES[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    if (user.isAuthorised && user.isProfileComplete) {
      fetchServiceRequests();
      fetchWeeklyServices();
      fetchWeeklyEarnings();
    }
  }, [user, selectedWeek]);

  const fetchServiceRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/technician/service-requests", {
        params: { serviceCategoryId: user.serviceCategoryId },
      });
      setServiceRequests(response.data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
      setSnackbar({ open: true, message: 'Failed to fetch service requests' });
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyServices = async () => {
    try {
      const response = await axios.get("/technician/weekly-services", {
        params: { week: selectedWeek },
      });
      setWeeklyServices(response.data);
    } catch (error) {
      console.error("Error fetching weekly services:", error);
      setSnackbar({ open: true, message: 'Failed to fetch weekly services' });
    }
  };

  const fetchWeeklyEarnings = async () => {
    try {
      const response = await axios.get("/technician/weekly-earnings", {
        params: { week: selectedWeek },
      });
      setWeeklyEarnings(response.data);
    } catch (error) {
      console.error("Error fetching weekly earnings:", error);
      setSnackbar({ open: true, message: 'Failed to fetch weekly earnings' });
    }
  };

  const handleAcceptRequest = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleConfirmAccept = async () => {
    setLoading(true);
    try {
      await axios.patch(`/technician/accept-request/${selectedRequest._id}`);
      setOpenDialog(false);
      setSnackbar({ open: true, message: 'Service request accepted successfully' });
      fetchServiceRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
      setSnackbar({ open: true, message: 'Failed to accept service request' });
    } finally {
      setLoading(false);
    }
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ padding: 10 }}>
        {!user.isProfileComplete && (
          <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
            Your profile is incomplete. Please complete your profile to access all features.
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => navigate("/technician/profile")}
            >
              Complete Profile
            </Button>
          </Alert>
        )}

        {user.isAuthorised && user.isProfileComplete && (
          <>
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ mr: 2 }} src={user?.profilePicture} >
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.serviceCategoryName} Technician
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h5" gutterBottom>
                  Available Service Requests
                </Typography>

                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                  </Box>
                ) : serviceRequests.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User Name</TableCell>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Address</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <AnimatePresence>
                          {serviceRequests.map((request) => (
                            <motion.tr
                              key={request._id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Person fontSize="small" sx={{ mr: 1 }} />
                                  {request.user.firstName} {request.user.lastName}
                                </Box>
                              </TableCell>
                              <TableCell>{request.serviceName}</TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <LocationOn fontSize="small" sx={{ mr: 1 }} />
                                  {request.address.city}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                                  {new Date(request.appointmentDate).toLocaleDateString()}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <AccessTime fontSize="small" sx={{ mr: 1 }} />
                                  {new Date(request.appointmentTime).toLocaleTimeString()}
                                </Box>
                              </TableCell>
                              <TableCell>₹{request.amount}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleAcceptRequest(request)}
                                  startIcon={<Check />}
                                >
                                  Accept
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    There are currently no service requests available.
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Weekly Services</Typography>
                      <Select
                        value={selectedWeek}
                        onChange={handleWeekChange}
                        size="small"
                      >
                        <MenuItem value="This Week">This Week</MenuItem>
                        <MenuItem value="Last Week">Last Week</MenuItem>
                        <MenuItem value="Two Weeks Ago">Two Weeks Ago</MenuItem>
                      </Select>
                    </Box>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyServices}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="#8884d8" name="Completed" />
                        <Bar dataKey="pending" stackId="a" fill="#82ca9d" name="Pending" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
                <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Weekly Earnings by Service Type</Typography>
                  <Select
                    value={selectedWeek}
                    onChange={handleWeekChange}
                    size="small"
                  >
                    <MenuItem value="This Week">This Week</MenuItem>
                    <MenuItem value="Last Week">Last Week</MenuItem>
                    <MenuItem value="Two Weeks Ago">Two Weeks Ago</MenuItem>
                  </Select>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={weeklyEarnings}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      // label={renderCustomizedLabel}
                    >
                      {weeklyEarnings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    {/* <Tooltip formatter={(value) => `₹${value}`} /> */}
                    <Legend 
                      formatter={(value, entry) => `${value} (₹${entry.payload.value})`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
            </Grid>
          </>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Service Request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to accept this service request?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmAccept} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Box>
    </motion.div>
  );
};

export default TechnicianDashboard;