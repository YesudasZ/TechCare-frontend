// import { IoLogInOutline } from "react-icons/io5";
// import { FaGoogle } from "react-icons/fa";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link as RouterLink } from "react-router-dom";
// import { loginUser, setUser } from "../store/authSlice";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "../utils/axiosConfig.js";
// import { toast } from "react-toastify";

// import {
//   Box,
//   TextField,
//   Typography,
//   Link,
//   Divider,
//   Paper,
//   Container,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";

// const Login = () => {
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [showPassword, setShowPassword] = useState(false);
// const dispatch = useDispatch();
// const navigate = useNavigate();
// const { isLoading, error } = useSelector((state) => state.user);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const result = await dispatch(loginUser({ email, password }));
//     if (loginUser.fulfilled.match(result)) {
//       toast.success("Login successful");
//       if (result.payload.user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     }
//   } catch (err) {
//     toast.error(err.message || "Login failed");
//   }
// };

// const handleGoogleSuccess = useGoogleLogin({
//   onSuccess: async (codeResponse) => {
//     console.log(codeResponse);
//     try {
//       const response = await axios.post(
//         "/auth/google",
//         { code: codeResponse.code },
//         { withCredentials: true }
//       );

//       if (response.data.user) {
//         dispatch(setUser(response.data.user));
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         if (response.data.user.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       } else {
//         toast.error("Failed to authenticate with Google");
//       }
//     } catch (error) {
//       console.error("Error during Google sign-up:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "An error occurred during Google sign-up"
//       );
//     }
//   },
//   flow: "auth-code",
// });

//   return (
//     <Box
//       sx={{
//         minHeight: "60vh",
//         background: "linear-gradient(to bottom right, #E0E7FF, #C7D2FE)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         py: 12,
//         px: 4,

//       }}
//     >
//       <Container maxWidth="sm" >
//         <Paper elevation={24} sx={{ p: 4, borderRadius: 4 }}>
//           <Box sx={{ mb: 4, textAlign: "center" }}>
//             <Typography variant="h4" component="h1" fontWeight="bold">
//               <Box component="span" sx={{ color: "text.secondary" }}>
//                 Tech
//               </Box>
//               <Box component="span" sx={{ color: "primary.main" }}>
//                 Care
//               </Box>
//             </Typography>
//             <Typography variant="h5" sx={{ mt: 2 }}>
//               Sign in to your account
//             </Typography>
//           </Box>

//           {error && (
//             <Typography color="error" align="center" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           )}

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Email address"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               autoComplete="current-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Box sx={{ mt: 2, textAlign: "right" }}>
//               <Link
//                 component={RouterLink}
//                 to="/forget-password"
//                 color="primary"
//                 underline="hover"
//               >
//                 Forgot Password?
//               </Link>
//             </Box>
//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
//                 disabled={isLoading}
//               >
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   <IoLogInOutline
//                     className="h-5 w-5 text-purple-300 group-hover:text-purple-200"
//                     aria-hidden="true"
//                   />
//                 </span>
//                 {isLoading ? "Signing in..." : "Sign in"}
//               </button>
//             </div>
//           </form>

//           <Divider sx={{ my: 3 }}>Or continue with</Divider>

//           <div className="mt-6">
//             <button
//               onClick={handleGoogleSuccess}
//               className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//             >
//               <FaGoogle className="mr-2 text-red-500" />
//               Sign up with Google
//             </button>
//           </div>

//           <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//             Don't have an account?{" "}
//             <Link
//               component={RouterLink}
//               to="/signup"
//               color="primary"
//               underline="hover"
//             >
//               Sign Up
//             </Link>
//           </Typography>
//         </Paper>
//       </Container>
//       <div className="absolute top-20 right-4">
//         <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
//           {" "}
//           Login for Technicians
//         </button>
//       </div>
//     </Box>
//   );
// };

// export default Login;

// import { IoLogInOutline } from "react-icons/io5";
// import { FaGoogle } from "react-icons/fa";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link as RouterLink } from "react-router-dom";
// import { loginUser, setUser } from "../store/authSlice";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "../utils/axiosConfig.js";
// import { toast } from "react-toastify";

// import {
//   Box,
//   TextField,
//   Typography,
//   Link,
//   Divider,
//   Paper,
//   Container,
//   IconButton,
//   InputAdornment,
//   Button,
// } from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state) => state.user);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(loginUser({ email, password }));
//       if (loginUser.fulfilled.match(result)) {
//         toast.success("Login successful");
//         if (result.payload.user.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (err) {
//       toast.error(err.message || "Login failed");
//     }
//   };

//   const handleGoogleSuccess = useGoogleLogin({
//     onSuccess: async (codeResponse) => {
//       console.log(codeResponse);
//       try {
//         const response = await axios.post(
//           "/auth/google",
//           { code: codeResponse.code },
//           { withCredentials: true }
//         );

//         if (response.data.user) {
//           dispatch(setUser(response.data.user));
//           localStorage.setItem("user", JSON.stringify(response.data.user));
          // if (response.data.user.role === "admin") {
          //   navigate("/admin");
          // } else {
          //   navigate("/");
          // }
//         } else {
//           toast.error("Failed to authenticate with Google");
//         }
//       } catch (error) {
//         console.error("Error during Google sign-up:", error);
//         toast.error(
//           error.response?.data?.message ||
//             "An error occurred during Google sign-up"
//         );
//       }
//     },
//     flow: "auth-code",
//   });
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom right, #E0E7FF, #C7D2FE)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         py: 12,
//         px: 4,
//       }}
//     >
//       <Container maxWidth="xs"  sx={{
//             color: 'white',

//           }}>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             borderRadius: 4,
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//             color: '',
//             background: '',
//           }}
//         >
//           <Box sx={{ mb: 4, textAlign: "center" }}>
//             <Typography variant="h4" component="h1" fontWeight="bold">
//               <Box component="span" sx={{ color: "blue" }}>
//                 Tech
//               </Box>
//               <Box component="span" sx={{ color: "black" }}>
//                 Care
//               </Box>
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
//               Sign in to your account
//             </Typography>
//           </Box>

//           {error && (
//             <Typography color="error" align="center" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           )}

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Email address"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               autoComplete="current-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               variant="outlined"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Box sx={{ mt: 2, textAlign: "right" }}>
//               <Link
//                 component={RouterLink}
//                 to="/forget-password"
//                 color="primary"
//                 underline="hover"
//               >
//                 Forgot Password?
//               </Link>
//             </Box>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 3,
//                 mb: 2,
//                 py: 1.5,
//                 background: 'linear-gradient(45deg, #6366F1 30%, #8B5CF6 90%)',
//                 '&:hover': {
//                   background: 'linear-gradient(45deg, #4F46E5 30%, #7C3AED 90%)',
//                 },
//               }}
//               disabled={isLoading}
//               startIcon={<IoLogInOutline />}
//             >
//               {isLoading ? "Signing in..." : "Sign in"}
//             </Button>
//           </form>

//           <Divider sx={{ my: 3 }}>Or continue with</Divider>

//     <Button
//       onClick={handleGoogleSuccess}
//       fullWidth
//       variant="outlined"
//       sx={{
//         py: 1.5,
//         color: 'text.secondary',
//         borderColor: 'rgba(0, 0, 0, 0.23)',
//         '&:hover': {
//           backgroundColor: 'rgba(0, 0, 0, 0.04)',
//         },
//       }}
//       startIcon={<FaGoogle style={{ color: '#DB4437' }} />}
//     >
//       Sign in with Google
//     </Button>

//     <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//       Don't have an account?{" "}
//       <Link
//         component={RouterLink}
//         to="/signup"
//         color="primary"
//         underline="hover"
//       >
//         Sign Up
//       </Link>
//     </Typography>
//   </Paper>
// </Container>
// <Box
//   sx={{
//     position: 'absolute',
//     top: 100,
//     right: 20,
//   }}
// >
//   <Button
//     variant="contained"
//     sx={{
//       background: 'linear-gradient(45deg, #6366F1 30%, #8B5CF6 90%)',
//       color: 'white',
//       px: 3,
//       py: 1,
//       borderRadius: '50px',
//       boxShadow: '0 3px 5px 2px rgba(99, 102, 241, .3)',
//       '&:hover': {
//         background: 'linear-gradient(45deg, #4F46E5 30%, #7C3AED 90%)',
//       },
//     }}
//   >
//     Login for Technicians
//   </Button>
// </Box>
//     </Box>
//   );
// };

// export default Login;

import { IoLogInOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { loginUser, setUser } from "../store/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../utils/axiosConfig.js";
import { toast } from "react-toastify";

import {
  Box,
  TextField,
  Typography,
  Link,
  Divider,
  Paper,
  Container,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ role = "user" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password }));
      // console.log("test",result.payload.user);
      
      if (loginUser.fulfilled.match(result)) {
        toast.success("Login successful");
        if (result.payload.user.role === "admin") {
          navigate("/admin");
        } else if (role === "technician") {
          navigate("/technician"); 
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleGoogleSuccess = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(
          "/auth/google",
          { code: codeResponse.code },
          { withCredentials: true }
        );

        if (response.data.user) {
          dispatch(setUser(response.data.user));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/");
        } else {
          toast.error("Failed to authenticate with Google");
        }
      } catch (error) {
        toast.error("Error during Google sign-up");
      }
    },
    flow: "auth-code",
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #E0E7FF, #C7D2FE)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 12,
        px: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              <Box component="span" sx={{ color: "blue" }}>
                Tech
              </Box>
              <Box component="span" sx={{ color: "black" }}>
                Care
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
              {role === "technician"
                ? "Sign in as Technician"
                : "Sign in to your account"}
            </Typography>
          </Box>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Link
                component={RouterLink}
                to="/forget-password"
                color="primary"
                underline="hover"
              >
                Forgot Password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: "linear-gradient(45deg, #6366F1 30%, #8B5CF6 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #4F46E5 30%, #7C3AED 90%)",
                },
              }}
              disabled={isLoading}
              startIcon={<IoLogInOutline />}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {role === "user" && (
            <>
              <Divider sx={{ my: 3 }}>Or continue with</Divider>
              <Button
                onClick={handleGoogleSuccess}
                fullWidth
                variant="outlined"
                sx={{
                  py: 1.5,
                  color: "text.secondary",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
                startIcon={<FaGoogle style={{ color: "#DB4437" }} />}
              >
                Sign in with Google
              </Button>
            </>
          )}

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          {role === "technician" ? (
              <>
                 Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/signup-technician"
                  color="primary"
                  underline="hover"
                >
                   Sign Up
                </Link>
              </>
            ) :  (
              <>
                 Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/signup"
                  color="primary"
                  underline="hover"
                >
                   Sign Up
                </Link>
              </>
            ) }
          </Typography>
        </Paper>
      </Container>
      <Box
        sx={{
          position: "absolute",
          top: 100,
          right: 20,
        }}
      >
{role === "user" ? (
          <>
            <Link component={RouterLink} to="/login-technician">
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #6366F1 30%, #8B5CF6 90%)",
                  color: "white",
                  px: 3,
                  py: 1,
                  borderRadius: "50px",
                  boxShadow: "0 3px 5px 2px rgba(99, 102, 241, .3)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #4F46E5 30%, #7C3AED 90%)",
                  },
                }}
              >
                Login for Technicians
              </Button>
            </Link>
          </>
        ):(
          <>
            <Link component={RouterLink} to="/login">
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #6366F1 30%, #8B5CF6 90%)",
                  color: "white",
                  px: 3,
                  py: 1,
                  borderRadius: "50px",
                  boxShadow: "0 3px 5px 2px rgba(99, 102, 241, .3)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #4F46E5 30%, #7C3AED 90%)",
                  },
                }}
              >
                Login for users
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Login;
