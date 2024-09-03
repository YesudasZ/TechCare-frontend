import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TechnicianSidebar from './TechnicianSidebar';
import TechnicianNavbar from './TechnicianNavbar';

const TechnicianLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TechnicianSidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <TechnicianNavbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default TechnicianLayout;
