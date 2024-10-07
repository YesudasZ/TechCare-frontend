import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { verifyOTP, resendOTP, clearError, verifyForgetPasswordOTP } from "../store/authSlice";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";

const OTPVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state) => state.auth || {});
  
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    } 
  }, [user, navigate]);
  
  const purpose = location.state?.purpose || 'signup';

  useEffect(() => {
    if (user) {
      navigate("/");
    } 
  }, [user, navigate]);
  
  useEffect(() => {
    const storedEmail = localStorage.getItem(purpose === "resetPassword" ? "resetEmail" : "signupEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate(purpose === "resetPassword" ? "/forget-password" : "/signup");
    }

    return () => {
      dispatch(clearError());
    };
  }, [navigate, dispatch, purpose]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setOtp(value);
    
    if (value.length !== 6) {
      setOtpError("OTP must be 6 digits long");
    } else {
      setOtpError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits long");
      return;
    }
    const action = purpose === 'resetPassword' ? verifyForgetPasswordOTP : verifyOTP;
    dispatch(action({ otp, email }))
      .unwrap()
      .then(() => {
        if (purpose === 'resetPassword') {
          navigate("/reset-password");
        } else if (purpose === 'technicianSignup') {
          toast.success("Account created successfully");
          navigate("/login-technician");
        } else {
          toast.success("Account created successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.message || "OTP verification failed");
      });
  };

  const handleResendOTP = () => {
    if (canResend) {
      dispatch(resendOTP({ email }))
        .unwrap()
        .then(() => {
          toast.info("New OTP sent to your email");
          setTimer(60);
          setCanResend(false);
        })
        .catch((err) => {
          toast.error(err.message || "Failed to resend OTP");
        });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#6B7280, #000000 )",
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
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
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
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Verify Your Email
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
              label="Enter OTP"
              name="otp"
              type="text"
              required
              value={otp}
              onChange={handleOtpChange}
              variant="outlined"
              error={!!otpError}
              helperText={otpError || "Enter the 6-digit OTP sent to your email"}
              InputProps={{
                sx: {
                  '& input': {
                    textAlign: 'center',
                    letterSpacing: '0.5em',
                    fontSize: '1.2em',
                  },
                  ...(otp.length === 6 && !otpError && {
                    '& fieldset': {
                      borderColor: 'green',
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
                background: 'linear-gradient(45deg, #6366F1 30%, #8B5CF6 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4F46E5 30%, #7C3AED 90%)',
                },
              }}
              disabled={isLoading || otp.length !== 6}
              startIcon={<IoCheckmarkCircleOutline />}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              onClick={handleResendOTP}
              disabled={!canResend || isLoading}
              sx={{
                color: canResend ? 'primary.main' : 'text.disabled',
                '&:hover': {
                  backgroundColor: canResend ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                },
              }}
            >
              {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OTPVerify;