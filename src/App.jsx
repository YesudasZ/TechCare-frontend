import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOTP" element={<OTPVerify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forget-password" element={<ForgetPasswordEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/login-technician" element ={<Login role="technician"/>}/>
          <Route path="/signup-technician" element={<Signup role="technician"/>}/>

             <Route path="/technician" element={<TechnicianLayout/>}>
             <Route index element={<TechnicianDashboard/>}/>
             </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="technicians" element={<Technicians />} />
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
