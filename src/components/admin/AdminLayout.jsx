
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import AdminNavbar from '../admin/AdminNavbar';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AdminNavbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;