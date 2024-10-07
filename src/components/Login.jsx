import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { loginUser, setUser } from "../store/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../utils/axiosConfig.js";
import { toast } from "react-toastify";
import picture from "../../pictures/login.png"
import { 
  Mail, 
  Lock, 
  EyeIcon, 
  EyeOffIcon, 
  LogIn, 
  AlertCircle,
  Loader2
} from 'lucide-react';

const Login = ({ role = "user" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnimating(true);
    try {
      const result = await dispatch(loginUser({ email, password }));
      
      if (loginUser.fulfilled.match(result)) {
        toast.success("Welcome back! You've successfully logged in.", {
          icon: "👋",
          position: "top-right",
          autoClose: 3000,
        });
        
        const redirectPath = {
          admin: "/admin",
          technician: "/technician",
          user: "/"
        }[result.payload.user.role || role] || "/";
        
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.", {
        icon: "😕"
      });
    } finally {
      setIsAnimating(false);
    }
  };

  const handleGoogleSuccess = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsAnimating(true);
      try {
        const response = await axios.post(
          "/auth/google",
          { code: codeResponse.code, role },
          { withCredentials: true }
        );

        if (response.data.user) {
          dispatch(setUser(response.data.user));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Successfully signed in with Google!");
          navigate(role === "technician" ? "/technician" : "/", { replace: true });
        } else {
          toast.error("Failed to authenticate with Google");
        }
      } catch (error) {
        toast.error("Error during Google sign-up");
      } finally {
        setIsAnimating(false);
      }
    },
    flow: "auth-code",
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-500 to-black flex items-center justify-center p-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        <motion.div 
          className="hidden lg:block w-1/2 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
          <motion.img
              src={picture}
            alt="TechCare Technician"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-12 text-white z-20"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Welcome to TechCare</h2>
            <p className="text-lg">Your trusted partner in technical solutions</p>
          </motion.div>
        </motion.div>
        <div className="w-full lg:w-1/2 p-12">
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <motion.h1 
                className="text-4xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-blue-600">Tech</span>
                <span className="text-gray-900">Care</span>
              </motion.h1>
              <p className="text-gray-600 mt-2">
                {role === "technician" ? "Sign in as Technician" : "Sign in to your account"}
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg flex items-center"
                >
                  <AlertCircle className="mr-2" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <RouterLink
                  to="/forget-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Forgot Password?
                </RouterLink>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || isAnimating}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium ${
                  isLoading || isAnimating
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                } transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading || isAnimating ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <LogIn className="w-5 h-5 mr-2" />
                )}
                {isLoading || isAnimating ? "Signing in..." : "Sign in"}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <motion.button
                onClick={handleGoogleSuccess}
                className="mt-4 w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                  />
                </svg>
                Sign in with Google
              </motion.button>
            </div>

            <motion.p 
              className="mt-8 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Don't have an account?{" "}
              <RouterLink
                to={role === "technician" ? "/signup-technician" : "/signup"}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign Up
              </RouterLink>
            </motion.p>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="fixed top-20 right-4"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <RouterLink
          to={role === "user" ? "/login-technician" : "/login"}
          className="inline-flex items-center px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {role === "user" ? "Login for Technicians" : "Login for Users"}
        </RouterLink>
      </motion.div>
    </motion.div>
  );
};

export default Login;