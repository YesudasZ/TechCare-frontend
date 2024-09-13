import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OTPVerify from "./components/OTPverify";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ForgetPasswordEmail from "./components/ForgetPasswordEmail";
import ResetPassword from "./components/ResetPassword";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AdminLayout from "../src/components/admin/AdminLayout";
import Dashboard from "../src/components/admin/Dashboard";
import Customers from "../src/components/admin/Customers";
import Technicians from "../src/components/admin/Technicians";
import TechnicianLayout from "./components/technician/TechnicianLayout";
import TechnicianDashboard from "./components/technician/TechnicianDashboard";
import ServiceCategories from "./components/admin/Categories";
import Services from "./components/admin/Services";
import Task from "./components/Services";
import TechnicianProfile from "../src/components/technician/TechnicianProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Schedule from "./components/Schedule";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Bookings from "./components/Bookings";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isTechnicianRoute = location.pathname.startsWith("/technician");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && !isTechnicianRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Task />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOTP" element={<OTPVerify />} />
          <Route path="/forget-password" element={<ForgetPasswordEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/login-technician"
            element={<Login role="technician" />}
          />
          <Route
            path="/signup-technician"
            element={<Signup role="technician" />}
          />

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/schedule/:id" element={<Schedule />}></Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/payment" element={<Checkout />}></Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/booking-Confirmation" element={<Confirmation />}></Route>
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/bookings" element={<Bookings />}></Route>
          </Route>



          {/* <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule/:id" element={<Schedule />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/booking-confirmation" element={<Confirmation />} />
            <Route path="/bookings" element={<Bookings />} />
          </Route> */}

          <Route element={<ProtectedRoute allowedRoles={["technician"]} />}>
            <Route path="/technician" element={<TechnicianLayout />}>
              <Route index element={<TechnicianDashboard />} />
              <Route path="profile" element={<TechnicianProfile />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="technicians" element={<Technicians />} />
              <Route path="categories" element={<ServiceCategories />} />
              <Route path="services" element={<Services />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && !isTechnicianRoute && <Footer />}
    </div>
  );
}

function App() {
  let isDarkMode = useSelector((state) => state.theme.darkMode);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <AppLayout />
        </Router>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
