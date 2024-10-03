import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const drawerWidth = 250;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
  { text: 'Technicians', icon: <BuildIcon />, path: '/admin/technicians' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
  { text: 'Services', icon: <MiscellaneousServicesIcon />, path: '/admin/services' },
  { text: 'Tasks', icon: <AssignmentIcon />, path: '/admin/tasks' },
  { text: 'Complaints', icon: <ReportProblemIcon />, path: '/admin/complaints' },
  { text: 'Wallet', icon: <AccountBalanceWalletIcon />, path: '/admin/wallet' },
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
              paddingY: 1.5,  
              '&.Mui-selected': {
                backgroundColor: isDarkMode ? '#1976d2' : '#e3f2fd',
                color: isDarkMode ? '#ffffff' : '#1976d2',
                '& .MuiListItemIcon-root': {
                  color: isDarkMode ? '#ffffff' : '#1976d2',
                },
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
              '&:hover': {
                backgroundColor: isDarkMode ? '#424242' : '#f5f5f5',
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
