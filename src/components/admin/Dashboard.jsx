// import { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Card, 
//   CardContent, 
//   Typography, 
//   Grid, 
//   Select, 
//   MenuItem, 
//   FormControl, 
//   InputLabel,
//   Paper,
//   useTheme
// } from '@mui/material';
// import { 
//   Person as PersonIcon, 
//   Assignment as AssignmentIcon,
//   Build as BuildIcon,
//   ListAlt as ListAltIcon 
// } from '@mui/icons-material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
// import axios from '../../utils/axiosConfig';

// const StatCard = ({ title, value, icon: Icon, change, color }) => {
//   const theme = useTheme();
  
//   return (
//     <Card sx={{ 
//       position: 'relative', 
//       overflow: 'hidden',
//       transition: 'transform 0.2s',
//       '&:hover': {
//         transform: 'translateY(-4px)',
//         boxShadow: theme.shadows[8]
//       }
//     }}>
//       <Box sx={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: `linear-gradient(45deg, ${theme.palette[color].light}, ${theme.palette[color].main})`,
//         opacity: 0.1
//       }} />
//       <CardContent>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={8}>
//             <Typography variant="subtitle2" color="textSecondary">
//               {title}
//             </Typography>
//             <Typography variant="h4" component="div">
//               {value}
//             </Typography>
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: change > 0 ? 'success.main' : 'error.main',
//                 display: 'flex',
//                 alignItems: 'center',
//                 mt: 1
//               }}
//             >
//               {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from yesterday
//             </Typography>
//           </Grid>
//           <Grid item xs={4}>
//             <Box 
//               sx={{ 
//                 backgroundColor: `${color}.light`,
//                 borderRadius: '50%', 
//                 p: 1.5, 
//                 display: 'flex', 
//                 justifyContent: 'center',
//                 transition: 'transform 0.2s',
//                 '&:hover': {
//                   transform: 'rotate(10deg)'
//                 }
//               }}
//             >
//               <Icon sx={{ fontSize: 40, color: `${color}.main` }} />
//             </Box>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// const ChartContainer = ({ title, children }) => (
//   <Paper sx={{ p: 3, height: '100%' }}>
//     <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
//     <Box sx={{ height: 300 }}>
//       {children}
//     </Box>
//   </Paper>
// );

// const Dashboard = () => {
//   const [timeframe, setTimeframe] = useState('weekly');
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const response = await axios.get(`/admin/dashboard-stats?timeframe=${timeframe}`);
//         setStats(response.data);
//       } catch (error) {
//         console.error('Error fetching dashboard stats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, [timeframe]);

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   const statCards = [
//     { title: "Total Users", value: stats.totalUsers, icon: PersonIcon, change: 8.5, color: 'primary' },
//     { title: "Completed Services", value: stats.completedServices, icon: AssignmentIcon, change: 1.3, color: 'success' },
//     { title: "Total Technicians", value: stats.totalTechnicians, icon: BuildIcon, change: -4.3, color: 'warning' },
//     { title: "Total Services", value: stats.totalServices, icon: ListAltIcon, change: 1.8, color: 'info' }
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4">Dashboard</Typography>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Timeframe</InputLabel>
//           <Select
//             value={timeframe}
//             onChange={(e) => setTimeframe(e.target.value)}
//             label="Timeframe"
//           >
//             <MenuItem value="weekly">Weekly</MenuItem>
//             <MenuItem value="monthly">Monthly</MenuItem>
//             <MenuItem value="yearly">Yearly</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>
      
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         {statCards.map((card, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatCard {...card} />
//           </Grid>
//         ))}
//       </Grid>

//       <ChartContainer title="Services Overview">
//         <ResponsiveContainer>
//           <LineChart data={stats.servicesData}>
//             <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//             <XAxis dataKey="_id" stroke={theme.palette.text.secondary} />
//             <YAxis stroke={theme.palette.text.secondary} />
//             <Tooltip 
//               contentStyle={{ 
//                 backgroundColor: theme.palette.background.paper,
//                 border: `1px solid ${theme.palette.divider}`
//               }}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="count" 
//               stroke={theme.palette.primary.main}
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartContainer>

//       <Grid container spacing={3} sx={{ mt: 3 }}>
//         <Grid item xs={12} md={6}>
//           <ChartContainer title="Top Services">
//             <ResponsiveContainer>
//               <BarChart data={stats.topServices}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis dataKey="serviceTypeInfo.name" stroke={theme.palette.text.secondary} />
//                 <YAxis stroke={theme.palette.text.secondary} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: theme.palette.background.paper,
//                     border: `1px solid ${theme.palette.divider}`
//                   }}
//                 />
//                 <Legend />
//                 <Bar dataKey="completed" fill={theme.palette.primary.main} name="Completed" />
//                 <Bar dataKey="pending" fill={theme.palette.secondary.main} name="Pending" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <ChartContainer title="Top Technicians">
//             <ResponsiveContainer>
//               <BarChart data={stats.topTechnicians}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis dataKey="technicianInfo.firstName" stroke={theme.palette.text.secondary} />
//                 <YAxis stroke={theme.palette.text.secondary} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: theme.palette.background.paper,
//                     border: `1px solid ${theme.palette.divider}`
//                   }}
//                 />
//                 <Legend />
//                 <Bar dataKey="completed" fill={theme.palette.primary.main} name="Completed" />
//                 <Bar dataKey="pending" fill={theme.palette.secondary.main} name="Pending" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;


import { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Paper,
  useTheme
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Assignment as AssignmentIcon,
  Build as BuildIcon,
  ListAlt as ListAltIcon 
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import axios from '../../utils/axiosConfig';

const StatCard = ({ title, value, icon: Icon, change, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      position: 'relative', 
      overflow: 'hidden',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
      }
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(45deg, ${theme.palette[color].light}, ${theme.palette[color].main})`,
        opacity: 0.1
      }} />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: change > 0 ? 'success.main' : 'error.main',
                display: 'flex',
                alignItems: 'center',
                mt: 1
              }}
            >
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from yesterday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box 
              sx={{ 
                backgroundColor: `${color}.light`,
                borderRadius: '50%', 
                p: 1.5, 
                display: 'flex', 
                justifyContent: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'rotate(10deg)'
                }
              }}
            >
              <Icon sx={{ fontSize: 40, color: `${color}.main` }} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const ChartContainer = ({ title, children }) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
    <Box sx={{ height: 300 }}>
      {children}
    </Box>
  </Paper>
);

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(`/admin/dashboard-stats?timeframe=${timeframe}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [timeframe]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: PersonIcon, change: 8.5, color: 'primary' },
    { title: "Completed Services", value: stats.completedServices, icon: AssignmentIcon, change: 1.3, color: 'success' },
    { title: "Total Technicians", value: stats.totalTechnicians, icon: BuildIcon, change: -4.3, color: 'warning' },
    { title: "Total Services", value: stats.totalServices, icon: ListAltIcon, change: 1.8, color: 'info' }
  ];

  return (
    <Box sx={{ p: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            label="Timeframe"
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <ChartContainer title="Services Overview">
        <ResponsiveContainer>
          <LineChart data={stats.servicesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="_id" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <ChartContainer title="Top Services">
            <ResponsiveContainer>
              <BarChart data={stats.topServices}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="serviceTypeInfo.name" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill={theme.palette.primary.main} name="Completed" />
                <Bar dataKey="pending" fill={theme.palette.secondary.main} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartContainer title="Top Technicians">
            <ResponsiveContainer>
              <BarChart data={stats.topTechnicians}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="technicianInfo.firstName" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill={theme.palette.primary.main} name="Completed" />
                <Bar dataKey="pending" fill={theme.palette.secondary.main} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
