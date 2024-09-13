import { useSelector } from "react-redux";
import { Box, Typography, Button, Alert } from "@mui/material";

const TechnicianDashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Technician Dashboard
      </Typography>

      {!user.isAuthorised && (
        <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
          Your account is not yet authorized. Please contact support for
          assistance.
        </Alert>
      )}

      {user.isAuthorised && !user.isProfileComplete && (
        <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
          Your profile is incomplete. Please complete your profile to access all
          features.
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            href="/technician/profile"
          >
            Complete Profile
          </Button>
        </Alert>
      )}

      {user.isAuthorised && user.isProfileComplete && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            You're all set! You can now start accepting and managing service
            requests.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TechnicianDashboard;
