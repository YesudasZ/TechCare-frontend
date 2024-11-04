import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { Suspense } from 'react';
import { motion } from "framer-motion";
import { FiTool } from 'react-icons/fi';

const Header = React.lazy(() => import("./components/Header"));
const Footer = React.lazy(() => import("./components/Footer"));
const Login = React.lazy(() => import("./components/Login"));
const Signup = React.lazy(() => import("./components/Signup"));
const OTPVerify = React.lazy(() => import("./components/OTPverify"));
const Home = React.lazy(() => import("./components/Home"));
const Profile = React.lazy(() => import("./components/Profile"));
const ForgetPasswordEmail = React.lazy(() => import("./components/ForgetPasswordEmail"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword"));
const AdminLayout = React.lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = React.lazy(() => import("./components/admin/Dashboard"));
const Customers = React.lazy(() => import("./components/admin/Customers"));
const Technicians = React.lazy(() => import("./components/admin/Technicians"));
const TechnicianLayout = React.lazy(() => import("./components/technician/TechnicianLayout"));
const TechnicianDashboard = React.lazy(() => import("./components/technician/TechnicianDashboard"));
const ServiceCategories = React.lazy(() => import("./components/admin/Categories"));
const Services = React.lazy(() => import("./components/admin/Services"));
const Task = React.lazy(() => import("./components/Services"));
const TechnicianProfile = React.lazy(() => import("./components/technician/TechnicianProfile"));
const Schedule = React.lazy(() => import("./components/Schedule"));
const Checkout = React.lazy(() => import("./components/Checkout"));
const Confirmation = React.lazy(() => import("./components/Confirmation"));
const Bookings = React.lazy(() => import("./components/Bookings"));
const TechnicianServices = React.lazy(() => import("./components/technician/TechnicianServices"));
const TechnicianChats = React.lazy(() => import("./components/technician/TechnicianChats"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const Wallet = React.lazy(() => import("./components/Wallet"));
const AdminWallet = React.lazy(()=> import("./components/admin/AdminWallet"));
const AdminTasks = React.lazy(()=> import("./components/admin/AdminTasks"))
const Complaints = React.lazy(() => import("./components/admin/Complaints"));
const TechnicianWallet = React.lazy(() => import("./components/technician/TechnicianWallet"))
const PaymentFailure = React.lazy(() => import("./components/PaymentFailure") )
const AboutUs = React.lazy(()=> import("./components/AboutUs"))
const NotFound = React.lazy(() => import("./components/NotFound"));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear"}}
    >
      <FiTool className="text-4xl text-blue-500" />
    </motion.div>
  </div>
);

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isTechnicianRoute = location.pathname.startsWith("/technician");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && !isTechnicianRoute && (
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
        </Suspense>
      )}
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Task />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verifyOTP" element={<OTPVerify />} />
            <Route path="/forget-password" element={<ForgetPasswordEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login-technician" element={<Login role="technician" />} />
            <Route path="/signup-technician" element={<Signup role="technician" />} />
            <Route path="/about-us" element={<AboutUs />} />
            
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/schedule/:id" element={<Schedule />} />
              <Route path="/payment" element={<Checkout />} />
              <Route path="/booking-confirmation" element={<Confirmation />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/payment-failure" element={<PaymentFailure />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={["technician"]} />}>
              <Route path="/technician" element={<TechnicianLayout />}>
                <Route index element={<TechnicianDashboard />} />
                <Route path="profile" element={<TechnicianProfile />} />
                <Route path="services" element={<TechnicianServices />} />
                <Route path="chats" element={<TechnicianChats />} />
                <Route path="wallet" element={<TechnicianWallet />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="technicians" element={<Technicians />} />
                <Route path="categories" element={<ServiceCategories />} />
                <Route path="services" element={<Services />} />/
                <Route path="wallet" element={<AdminWallet />} />
                <Route path="tasks" element={<AdminTasks />} />
                <Route path="complaints" element={<Complaints />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && !isTechnicianRoute && (
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <AppLayout />
        </Suspense>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
