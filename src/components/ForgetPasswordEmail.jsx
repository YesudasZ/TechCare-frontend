import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initiateForgetPassword } from "../store/authSlice";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Container,
  Button,
} from "@mui/material";

const ForgetPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value) {
      setEmailError("Email is required");
    } else if (!validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    try {
      await dispatch(initiateForgetPassword({ email })).unwrap();
      localStorage.setItem("resetEmail", email);
      toast.success("OTP sent to your email");
      navigate("/verifyOTP", { state: { purpose: "resetPassword" } });
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    }
  };

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
            backgroundColor: "white",
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
              Forgot Password
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
              Enter your email address to receive a password reset OTP
            </Typography>
          </Box>

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
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError || "Enter your registered email address"}
              variant="outlined"
              InputProps={{
                sx: {
                  ...(email &&
                    !emailError && {
                      "& fieldset": {
                        borderColor: "green",
                        borderWidth: 2,
                      },
                    }),
                },
              }}
            />

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
              disabled={!email || !!emailError}
            >
              Send Reset OTP
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgetPasswordEmail;
