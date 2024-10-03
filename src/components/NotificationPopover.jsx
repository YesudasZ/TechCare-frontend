import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  Notifications as NotificationsIcon,
  Clear as ClearIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  fetchNotifications,
  markNotificationAsRead,
  clearAllNotifications,
  removeNotification,
} from '../store/notificationSlice';
import sound from '../../pictures/noti.wav';

const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
}));

const NotificationList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
  padding: 0,
}));

const NotificationItem = styled(ListItem)(({ theme, read }) => ({
  transition: 'all 0.3s ease',
  backgroundColor: read ? 'transparent' : theme.palette.action.hover,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ClearAllButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const NotificationAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 40,
  height: 40,
}));

const NotificationPopover = ({ anchorEl, onClose, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      dispatch(fetchNotifications())
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [open, dispatch]);

  useEffect(() => {
    const audio = new Audio(sound);
    if (unreadCount > 0) {
      audio.play();
    }
  }, [unreadCount]);

  const handleNotificationClick = (notification) => {
    dispatch(markNotificationAsRead(notification._id));
    switch (notification.type) {
      case 'service_accepted':
      case 'new_service_request':
        navigate(`/bookings/${notification.serviceId}`);
        break;
      case 'new_chat_message':
        navigate(`/chats/${notification.serviceId}`);
        break;
      default:
        break;
    }
    onClose();
  };

  const handleClearAll = () => {
    dispatch(clearAllNotifications());
    onClose();
  };

  const handleClearNotification = (id, event) => {
    event.stopPropagation();
    dispatch(removeNotification(id));
  };

  return (
    <StyledPopover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <NotificationList>
        <NotificationHeader>
          <Typography variant="h6">Notifications</Typography>
          <ClearAllButton onClick={handleClearAll} startIcon={<ClearIcon />}>
            Clear All
          </ClearAllButton>
        </NotificationHeader>
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <AnimatePresence>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <NotificationItem
                    button
                    read={notification.read}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <NotificationAvatar>
                      <NotificationsIcon />
                    </NotificationAvatar>
                    <ListItemText
                      primary={notification.content}
                      secondary={new Date(notification.createdAt).toLocaleString()}
                      sx={{ ml: 2 }}
                    />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(event) => handleClearNotification(notification._id, event)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </NotificationItem>
                </motion.div>
              ))
            ) : (
              <ListItem>
                <Typography>No notifications</Typography>
              </ListItem>
            )}
          </AnimatePresence>
        </Box>
      </NotificationList>
    </StyledPopover>
  );
};

export default NotificationPopover;


