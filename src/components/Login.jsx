import { IoLogInOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { useState, useEffect } from "react";

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
  const { isLoading, error, user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   } 
  // }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("terst frontend");
      
      const result = await dispatch(loginUser({ email, password }));
      console.log("test",result);

      if (loginUser.fulfilled.match(result)) {
        toast.success("Login successful");
        if (result.payload.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (role === "technician") {
          navigate("/technician", { replace: true });
        } else {
          navigate("/", { replace: true });
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
          { code: codeResponse.code, role:role },
          { withCredentials: true }
        );

        if (response.data.user) {
          dispatch(setUser(response.data.user));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          if (role === "technician") {
            navigate("/technician", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
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
<div className="min-h-screen bg-gradient-to-b from-gray-500 to-black flex items-center justify-center py-12 px-4">
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
            ) : (
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
            )}
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
        ) : (
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
      </div>
  );
};

export default Login;