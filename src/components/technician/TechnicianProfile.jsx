import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  TextField,
  Typography,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Grid,
  Box,
} from "@mui/material";
import { CameraAlt, Loop, Upload } from "@mui/icons-material";
import {
  updateTechnicianProfile,
  updateTechnicianPassword,
  updateTechnicianProfilePicture,
  completeTechnicianProfile,
} from "../../store/technicianSlice";

const TechnicianProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isProfileComplete = user?.isProfileComplete || false;
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    profilePicture: user?.profilePicture || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [documentData, setDocumentData] = useState({
    registrationNo: user?.registrationNo || "",
    aadharNo: user?.aadharNo || "",
    aadharPicture: user?.aadharPicture || "",
    certificatePicture: user?.certificatePicture || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [enlargedFile, setEnlargedFile] = useState({ type: "", file: "" });
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        profilePicture: user.profilePicture || "",
      });
      setDocumentData({
        registrationNo: user.registrationNo || "",
        aadharNo: user.aadharNo || "",
        aadharPicture: user.aadharPicture || "",
        certificatePicture: user.certificatePicture || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleDocumentInputChange = (e) => {
    setDocumentData({ ...documentData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    try {
      setIsLoading(true);
      await dispatch(updateTechnicianProfile(profileData)).unwrap();
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "New passwords do not match",
        severity: "error",
      });
      return;
    }
    try {
      setIsLoading(true);
      await dispatch(
        updateTechnicianPassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        })
      ).unwrap();
      setOpenPasswordDialog(false);
      setSnackbar({
        open: true,
        message: "Password updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update password",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          setIsLoading(true);
          const result = await dispatch(
            updateTechnicianProfilePicture({ image: reader.result })
          ).unwrap();
          setProfileData((prevState) => ({
            ...prevState,
            profilePicture: result.profilePicture,
          }));
          setSnackbar({
            open: true,
            message: "Profile picture updated successfully",
            severity: "success",
          });
        } catch (error) {
          setSnackbar({
            open: true,
            message: error.message || "Failed to update profile picture",
            severity: "error",
          });
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentData((prevState) => ({
          ...prevState,
          [field]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteProfile = async () => {
    try {
      setIsLoading(true);
      await dispatch(completeTechnicianProfile(documentData)).unwrap();
      setSnackbar({
        open: true,
        message: "Profile completed successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to complete profile",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isImageFile = (fileUrl) => /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
  const isPdfFile = (fileUrl) => /\.pdf$/i.test(fileUrl);

  const handleFileClick = (fileUrl) => {
    if (isImageFile(fileUrl) || isPdfFile(fileUrl)) {
      setEnlargedFile({
        type: isPdfFile(fileUrl) ? "pdf" : "image",
        file: fileUrl,
      });
    }
  };

  const renderFilePreview = (fieldName, fileUrl) => {
    if (!fileUrl) return null;

    if (isImageFile(fileUrl)) {
      return (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Image Preview:</Typography>
          <img
            src={fileUrl}
            alt={`${fieldName} Preview`}
            style={{
              maxHeight: "100px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleFileClick(fileUrl)}
          />
        </Box>
      );
    } else if (isPdfFile(fileUrl)) {
      return (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">PDF Preview:</Typography>
          <Button
            variant="outlined"
            onClick={() => handleFileClick(fileUrl)}
            sx={{ mt: 1 }}
          >
            View PDF
          </Button>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 5 }}>
      <CardHeader title="Technician Profile" />
      <CardContent>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
        >
          <Tab label="Personal Info" />
          <Tab label="Documents" />
          <Tab label="Security" />
        </Tabs>

        {tabValue === 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={profileData.profilePicture || user?.profilePicture}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="icon-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CameraAlt />}
                  disabled={isLoading}
                >
                  Change Picture
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ""}
                disabled
                margin="normal"
              />
              <Button
                variant="contained"
                onClick={handleProfileUpdate}
                disabled={isLoading}
                startIcon={isLoading ? <Loop /> : null}
                sx={{ mt: 2 }}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Aadhaar Card
              </Typography>
              <TextField
                fullWidth
                label="Aadhaar Number"
                name="aadharNo"
                value={documentData.aadharNo}
                onChange={handleDocumentInputChange}
                margin="normal"
                disabled={isProfileComplete}
              />
              <input
                accept="image/*,application/pdf"
                id="aadhar-file"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleDocumentUpload(e, "aadharPicture")}
                disabled={isProfileComplete}
              />
              <label htmlFor="aadhar-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<Upload />}
                  sx={{ mt: 1 }}
                  disabled={isProfileComplete}
                >
                  Upload Aadhaar Picture
                </Button>
              </label>
              {renderFilePreview("aadharPicture", documentData.aadharPicture)}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Certificate
              </Typography>
              <TextField
                fullWidth
                label="Registration Number"
                name="registrationNo"
                value={documentData.registrationNo}
                onChange={handleDocumentInputChange}
                margin="normal"
                disabled={isProfileComplete}
              />
              <input
                accept="image/*,application/pdf"
                id="certificate-file"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleDocumentUpload(e, "certificatePicture")}
                disabled={isProfileComplete}
              />
              <label htmlFor="certificate-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<Upload />}
                  sx={{ mt: 1 }}
                  disabled={isProfileComplete}
                >
                  Upload Certificate Picture
                </Button>
              </label>
              {renderFilePreview(
                "certificatePicture",
                documentData.certificatePicture
              )}
            </Grid>

            {!isProfileComplete && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleCompleteProfile}
                  disabled={isLoading}
                  startIcon={isLoading ? <Loop /> : null}
                  sx={{ mt: 2 }}
                >
                  {isLoading ? "Submitting..." : "Complete Profile"}
                </Button>
              </Grid>
            )}
          </Grid>
        )}

        {tabValue === 2 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                margin="normal"
              />
              <Button
                variant="contained"
                onClick={() => setOpenPasswordDialog(true)}
                sx={{ mt: 2 }}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>

      <Dialog
        open={!!enlargedFile.file}
        onClose={() => setEnlargedFile({ type: "", file: "" })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Enlarged File</DialogTitle>
        <DialogContent>
          {enlargedFile.type === "image" ? (
            <img
              src={enlargedFile.file}
              alt="Enlarged"
              style={{ width: "100%" }}
            />
          ) : (
            <object
              data={enlargedFile.file}
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>
                It appears you don't have a PDF plugin for this browser. You can{" "}
                <a
                  href={enlargedFile.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here to download the PDF file.
                </a>
              </p>
            </object>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEnlargedFile({ type: "", file: "" })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      >
        <DialogTitle>Confirm Password Change</DialogTitle>
        <DialogContent>
          Are you sure you want to change your password? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePasswordUpdate}
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default TechnicianProfile;



