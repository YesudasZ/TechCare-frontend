import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { IoLogInOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,  Link } from 'react-router-dom';
import { loginUser, setUser } from '../store/authSlice';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import axios from "../utils/axiosConfig.js";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error} = useSelector(state => state.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        toast.success('Login successful');
        navigate('/');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post("/auth/google", { 
          code: codeResponse.code 
        }, {
          withCredentials: true
        });
        
        if (response.data.user) {
          dispatch(setUser(response.data.user));
          localStorage.setItem("user", JSON.stringify(response.data.user) );
          navigate("/");
        } else {
          toast.error("Failed to authenticate with Google");
        }
      } catch (error) {
        console.error('Error during Google sign-up:', error);
        toast.error(error.response?.data?.message || "An error occurred during Google sign-up");
      }
    },
    flow: 'auth-code',
  });
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-2xl font-extrabold">
            <span className="text-gray-400 drop-shadow-md">Tech</span>
            <span className="text-purple-00 drop-shadow-md">Care</span>
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Link to="/forget-password" className="text-sm text-purple-600 hover:text-purple-500">
  Forgot Password?
</Link>
     

          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <IoLogInOutline className="h-5 w-5 text-purple-300 group-hover:text-purple-200" aria-hidden="true" />
              </span>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
      <button
        onClick={handleGoogleSuccess}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <FaGoogle className="mr-2 text-red-500" />
        Sign up with Google
      </button>
    </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?    <Link to="/signup"   className="font-medium text-purple-600 hover:text-purple-500">
                Sign Up
              </Link>
          </p>
        </div>
      </div>
      
      <div className="absolute top-20 right-4">
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Login for Technicians
        </button>
      </div>
    </div>
  );
};

export default Login;