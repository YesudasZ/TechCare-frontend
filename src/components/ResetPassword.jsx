import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../store/authSlice';
import { toast } from 'react-toastify';
import { IoLockClosedOutline } from "react-icons/io5";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Container,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const {  user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/");
    } 
  }, [user, navigate]);
  const dispatch = useDispatch();
  

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (!value) {
      setPasswordError('Password is required');
    } else if (!validatePassword(value)) {
      setPasswordError('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (!value) {
      setConfirmPasswordError('Confirm password is required');
    } else if (value !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
    if (!validatePassword(newPassword)) {
      setPasswordError('Password does not meet the requirements');
      return;
    }
    try {
      const email = localStorage.getItem("resetEmail");
      await dispatch(resetPassword({ newPassword, email })).unwrap();
      toast.success('Password reset successful');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
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
              Reset Your Password
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError || 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character'}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  ...(newPassword && !passwordError && {
                    '& fieldset': {
                      borderColor: 'green',
                      borderWidth: 2,
                    },
                  }),
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError || 'Re-enter your new password'}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  ...(confirmPassword && !confirmPasswordError && {
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
              disabled={!newPassword || !confirmPassword || !!passwordError || !!confirmPasswordError}
              startIcon={<IoLockClosedOutline />}
            >
              Reset Password
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;