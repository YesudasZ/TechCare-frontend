// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PeopleIcon from '@mui/icons-material/People';
// import BuildIcon from '@mui/icons-material/Build';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// const drawerWidth = 300;

// const menuItems = [
//   { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
//   { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
//   { text: 'Technicians', icon: <BuildIcon />, path: '/admin/technicians' },
//   { text: 'Categories', icon: <AssignmentIcon />, path: '/admin/categories' },
//   { text: 'Services', icon: <AssignmentIcon />, path: '/admin/services' },
//   { text: 'Offers', icon: <LocalOfferIcon />, path: '/admin/offers' },
// ];

// const AdminSidebar = () => {
//   const location = useLocation();
//   const isDarkMode = useSelector((state) => state.theme.darkMode);

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           backgroundColor: isDarkMode ? '#121212' : '#ffffff',
//           color: isDarkMode ? '#e0e0e0' : '#000000',
//           transition: 'background-color 0.3s ease, color 0.3s ease',
//         },
//       }}
//       variant="permanent"
//       anchor="left"
//     >
//       <Toolbar
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: (theme) => theme.spacing(2),
//         }}
//       >
//         <Typography
//           variant="h4"
//           noWrap
//           component="div"
//           sx={{
//             fontWeight: 'bold',
//             color: isDarkMode ? '#90caf9' : '#1976d2',
//             transition: 'color 0.3s ease',
//             '& span': {
//               color: isDarkMode ? '#e0e0e0' : '#000000',
//               transition: 'color 0.3s ease',
//             },
//           }}
//         >
//           Tech<span>Care</span>
//         </Typography>
//       </Toolbar>
//       <List>
//         {menuItems.map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             component={Link}
//             to={item.path}
//             selected={location.pathname === item.path}
//             sx={{
//               '&.Mui-selected': {
//                 backgroundColor: isDarkMode ? '#1976d2' : '#e3f2fd',
//                 color: isDarkMode ? '#ffffff' : '#1976d2',
//                 '& .MuiListItemIcon-root': {
//                   color: isDarkMode ? '#ffffff' : '#1976d2',
//                 },
//                 transition: 'background-color 0.3s ease, color 0.3s ease',
//               },
//               '&:hover': {
//                 backgroundColor: isDarkMode ? '#424242' : '#e0e0e0',
//                 transition: 'background-color 0.3s ease',
//               },
//               transition: 'background-color 0.3s ease, color 0.3s ease',
//             }}
//           >
//             <ListItemIcon sx={{ color: 'inherit', transition: 'color 0.3s ease' }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default AdminSidebar;


// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';


// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PeopleIcon from '@mui/icons-material/People';
// import BuildIcon from '@mui/icons-material/Build';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
// // import  CategoryIcon   from '@mui/icons-material';

// const menuItems = [
//   { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
//   { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
//   { text: 'Technicians', icon: <BuildIcon />, path: '/admin/technicians' },
//   { text: 'Categories', icon: <AssignmentIcon />, path: '/admin/categories' },
//   { text: 'Services', icon: <ElectricalServicesIcon />, path: '/admin/services' },
//   { text: 'Offers', icon: <LocalOfferIcon />, path: '/admin/offers' },
// ];

// const AdminSidebar = () => {
//   const location = useLocation();
//   const isDarkMode = useSelector((state) => state.theme.darkMode);

//   return (
//     <div className={`h-full w-64 bg-${isDarkMode ? 'gray-900' : 'white'} shadow-lg`}>
//       <div className="flex items-center justify-center py-4">
//         <h1 className={`text-3xl font-bold text-${isDarkMode ? 'white' : 'gray-900'}`}>
//           Tech<span className="text-blue-500">Care</span>
//         </h1>
//       </div>
//       <nav className="mt-10">
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.text} className="mb-2">
//               <Link
//                 to={item.path}
//                 className={`flex items-center p-4 text-lg font-medium rounded-lg transition-colors duration-200 ${
//                   location.pathname === item.path
//                     ? `bg-${isDarkMode ? 'blue-700' : 'blue-100'} text-${isDarkMode ? 'white' : 'blue-700'}`
//                     : `text-${isDarkMode ? 'gray-300' : 'gray-700'} hover:bg-${isDarkMode ? 'gray-700' : 'gray-200'}`
//                 }`}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 {item.text}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;



import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import CategoryIcon from '@mui/icons-material/Category';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const drawerWidth = 250;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
  { text: 'Technicians', icon: <BuildIcon />, path: '/admin/technicians' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
  { text: 'Services', icon: <MiscellaneousServicesIcon />, path: '/admin/services' },
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
              paddingY: 1.5,  // Added padding for space between items
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
