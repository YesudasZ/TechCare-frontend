import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  signupUser,
  signupTechnician,
  clearError,
  setUser,
} from "../store/authSlice.js";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../utils/axiosConfig.js";
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
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = ({ role = "user" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    registrationNo: "",
    aadharNo: "",
    aadharPicture: "",
    certificatePicture: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[A-Za-z]+$/.test(value)) {
          error = `${
            name === "firstName" ? "First" : "Last"
          } name must contain only letters.`;
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must contain exactly 10 digits.";
        }
        break;
      case "registrationNo":
        if (!/^[A-Za-z0-9]+$/.test(value)) {
          error = "Registration number must contain only letters and numbers.";
        }
        break;
      case "aadharNo":
        if (!/^\d{12}$/.test(value)) {
          error = "Aadhar number must contain exactly 12 digits.";
        }
        break;
      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          error =
            "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    if (Object.values(formErrors).some((error) => error)) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    const action = role === "technician" ? signupTechnician : signupUser;

    dispatch(action(formData))
      .unwrap()
      .then(() => {
        localStorage.setItem("signupEmail", formData.email);
        if (action === signupTechnician) {
          navigate("/verifyOTP", { state: { purpose: "technicianSignup" } });
        } else {
          navigate("/verifyOTP");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
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
        console.error("Error during Google sign-up:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred during Google sign-up"
        );
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
      <Container maxWidth="sm">
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
                ? "Create Technician Account"
                : "Create your account"}
            </Typography>
          </Box>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                name="firstName"
                label="First Name"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                error={!!formErrors.firstName}
                helperText={
                  formErrors.firstName ||
                  "First name must contain only letters."
                }
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                name="lastName"
                label="Last Name"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                error={!!formErrors.lastName}
                helperText={
                  formErrors.lastName || "Last name must contain only letters."
                }
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                name="email"
                label="Email address"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                error={!!formErrors.email}
                helperText={formErrors.email || "Enter a valid email address."}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                error={!!formErrors.phoneNumber}
                helperText={
                  formErrors.phoneNumber || "Phone number must be 10 digits."
                }
              />
            </FormControl>

            {role === "technician" && (
              <>
                <FormControl fullWidth margin="normal">
                  <TextField
                    name="registrationNo"
                    label="Registration No."
                    type="text"
                    required
                    value={formData.registrationNo}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!formErrors.registrationNo}
                    helperText={
                      formErrors.registrationNo ||
                      "Registration number must contain only letters and numbers."
                    }
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    name="aadharNo"
                    label="Aadhar No."
                    type="text"
                    required
                    value={formData.aadharNo}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!formErrors.aadharNo}
                    helperText={
                      formErrors.aadharNo || "Aadhar number must be 12 digits."
                    }
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2, mb: 2 }}
                    error={!!formErrors.aadharPicture}
                  >
                    Upload Aadhar Picture
                    <input
                      type="file"
                      name="aadharPicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                  {formData.aadharPicture && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2">Preview:</Typography>
                      <img
                        src={formData.aadharPicture}
                        alt="Aadhar Preview"
                        style={{ maxHeight: "100px", borderRadius: "5px" }}
                      />
                    </Box>
                  )}
                  <FormHelperText>{formErrors.aadharPicture}</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2, mb: 2 }}
                    error={!!formErrors.certificatePicture}
                  >
                    Upload Certificate Picture
                    <input
                      type="file"
                      name="certificatePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                  {formData.certificatePicture && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2">Preview:</Typography>
                      <img
                        src={formData.certificatePicture}
                        alt="Certificate Preview"
                        style={{ maxHeight: "100px", borderRadius: "5px" }}
                      />
                    </Box>
                  )}
                  <FormHelperText>
                    {formErrors.certificatePicture}
                  </FormHelperText>
                </FormControl>
              </>
            )}

            <FormControl fullWidth margin="normal">
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                error={!!formErrors.password}
                helperText={
                  formErrors.password ||
                  "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
                }
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
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                error={!!formErrors.confirmPassword}
                helperText={
                  formErrors.confirmPassword || "Passwords must match."
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

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
              startIcon={<IoPersonAddOutline />}
            >
              {isLoading ? "Signing up..." : "Sign up"}
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
                Sign up with Google
              </Button>
            </>
          )}
          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            {role === "technician" ? (
              <>
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login-technician"
                  color="primary"
                  underline="hover"
                >
                  Sign in as Technician
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  color="primary"
                  underline="hover"
                >
                  Sign in
                </Link>
              </>
            )}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
