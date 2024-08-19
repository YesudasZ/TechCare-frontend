import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OTPVerify from "./components/OTPverify";
import Home from './components/Home';
import Profile from './components/Profile';
import ForgetPasswordEmail from './components/ForgetPasswordEmail';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verifyOTP" element={<OTPVerify />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forget-password" element={<ForgetPasswordEmail />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
