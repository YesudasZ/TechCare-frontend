import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { MessageCircle, User } from 'react-feather';
import axios from '../../utils/axiosConfig';
import ChatWindow from '../ChatWindow';

const TechnicianChats = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/technician/accepted-services');
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to fetch services');
      setLoading(false);
    }
  };

  const handleOpenChat = (service) => {
    setSelectedService(service);
  };

  const handleCloseChat = () => {
    setSelectedService(null);
  };

  return (
    <Box sx={{ padding: 20, background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)' }}>
      <Toaster position="top-right" />
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
        Technician Chats
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {services.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  mb: 2,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <ListItemAvatar>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Avatar
                      alt={service.user.firstName}
                      src={service.user.profilePicture}
                      sx={{ width: 56, height: 56 }}
                    >
                      <User />
                    </Avatar>
                  </motion.div>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" color="primary">
                      {`${service.user.firstName} ${service.user.lastName}`}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                        {service.serviceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {service.status}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenChat(service)}
                  startIcon={<MessageCircle />}
                  sx={{
                    borderRadius: 20,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  Open Chat
                </Button>
              </ListItem>
            </motion.div>
          ))}
        </List>
      )}

      {selectedService && (
        <ChatWindow
          service={selectedService}
          onClose={handleCloseChat}
          currentUser={user}
        />
      )}
    </Box>
  );
};

export default TechnicianChats;