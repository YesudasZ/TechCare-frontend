import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
  { text: 'Technicians', icon: <BuildIcon />, path: '/admin/technicians' },
  { text: 'Services', icon: <AssignmentIcon />, path: '/admin/services' },
  { text: 'Offers', icon: <LocalOfferIcon />, path: '/admin/offers' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
          color: isDarkMode ? '#e0e0e0' : '#000000',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            fontWeight: 'bold',
            color: isDarkMode ? '#90caf9' : '#1976d2',
            transition: 'color 0.3s ease',
            '& span': {
              color: isDarkMode ? '#e0e0e0' : '#000000',
              transition: 'color 0.3s ease',
            },
          }}
        >
          Tech<span>Care</span>
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: isDarkMode ? '#1976d2' : '#e3f2fd',
                color: isDarkMode ? '#ffffff' : '#1976d2',
                '& .MuiListItemIcon-root': {
                  color: isDarkMode ? '#ffffff' : '#1976d2',
                },
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
              '&:hover': {
                backgroundColor: isDarkMode ? '#424242' : '#e0e0e0',
                transition: 'background-color 0.3s ease',
              },
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', transition: 'color 0.3s ease' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;