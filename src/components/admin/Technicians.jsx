import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Modal,
  Avatar,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../../utils/axiosConfig";

const Technicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [totalTechnicians, setTotalTechnicians] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState("");
  const [enlargedFile, setEnlargedFile] = useState({ type: "", file: "" });
  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const fetchServiceCategories = async () => {
    try {
      const response = await axios.get("/admin/service-categories");
      setServiceCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch service categories:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch service categories",
        severity: "error",
      });
    }
  };

  const handleOpenModal = (technician) => {
    setSelectedTechnician(technician);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openDialog = (action) => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const isImageFile = (fileUrl) => /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
  const isPdfFile = (fileUrl) => /\.pdf$/i.test(fileUrl);

  const handleFileClick = (fileUrl) => {
    if (isImageFile(fileUrl)) {
      setEnlargedFile({ type: "image", file: fileUrl });
    } else if (isPdfFile(fileUrl)) {
      setEnlargedFile({ type: "pdf", file: fileUrl });
    }
  };

  const renderFilePreview = (fieldName, fileUrl) => {
    if (!fileUrl) return null;

    if (isImageFile(fileUrl)) {
      return (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">{fieldName} Preview:</Typography>
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
          <Typography variant="body2">{fieldName} Preview:</Typography>
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

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get("/admin/users", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
          role: "technician",
        },
      });
      setTechnicians(
        response.data.users.filter((user) => user.role === "technician")
      );
      setTotalTechnicians(
        response.data.users.filter((user) => user.role === "technician").length
      );
    } catch (error) {
      console.error("Failed to fetch technicians:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch technicians",
        severity: "error",
      });
    }
  };

  const handleBlockUnblock = async (userId, isVerified) => {
    try {
      await axios.patch(`/admin/users/${userId}/block`);
      setSnackbar({
        open: true,
        message: `Technician ${
          isVerified ? "blocked" : "unblocked"
        } successfully`,
        severity: "success",
      });
      fetchTechnicians();
      handleCloseModal();
      closeDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update technician status",
        severity: "error",
      });
    }
  };

  const handleAuthorize = async (userId, isAuthorised) => {
    if (!isAuthorised && !selectedCategory) {
      setSnackbar({
        open: true,
        message: "Please select a service category before authorizing",
        severity: "warning",
      });
      return;
    }

    try {
      const payload = isAuthorised ? {} : {serviceCategoryId: selectedCategory}
      await axios.patch(`/admin/users/${userId}/authorize`, payload);
      setSnackbar({
        open: true,
        message: `Technician ${
          isAuthorised ? "unauthorised" : "authorised"
        } successfully`,
        severity: "success",
      });
      fetchTechnicians();
      handleCloseModal();
      closeDialog();
      setSelectedCategory("");
    } catch (error) {
      console.error("Error in authorization:", error);
      setSnackbar({
        open: true,
        message: "Failed to update technician authorization",
        severity: "error",
      });
    }
  };

 

  useEffect(() => {
    fetchTechnicians();
    fetchServiceCategories();
  }, [page, rowsPerPage, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "black",
          marginBottom: 4,
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Technicians Management
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
          width: "60%",
          maxWidth: "600px",
        }}
      >
        <SearchIcon sx={{ color: "text.secondary", mr: 1, my: 0.5 }} />
        <TextField
          label="Search Technicians"
          variant="standard"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: 1 }}
        />
      </Paper>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: 2,
          overflow: "hidden",
          width: "80%",
          maxWidth: "1400px",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Sl. No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Technician
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Join Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technicians.map((technician, index) => (
              <TableRow
                key={technician._id}
                sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
              >
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={technician?.firstName}
                      src={technician?.profilePicture}
                      sx={{ marginRight: "8px" }}
                    />
                    <Typography>
                      {technician.firstName} {technician.lastName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(technician.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: technician.isVerified ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {technician.isVerified ? "Active" : "Blocked"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenModal(technician)}
                    sx={{ borderRadius: 20 }}
                  >
                    More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 2,
          width: "80%",
          maxWidth: "1000px",
        }}
      >
        <TablePagination
          component="div"
          count={totalTechnicians}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {selectedTechnician && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="technician-details-title"
          aria-describedby="technician-details-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Typography
              id="technician-details-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: 2 }}
            >
              Technician Details
            </Typography>
            <Typography id="technician-details-description" sx={{ mt: 2 }}>
              Name: {selectedTechnician.firstName} {selectedTechnician.lastName}
            </Typography>
            <Typography>Email: {selectedTechnician.email}</Typography>
            <Typography>Phone: {selectedTechnician.phoneNumber}</Typography>
            <Typography>
              Status: {selectedTechnician.isVerified ? "Active" : "Blocked"}
            </Typography>
            <Typography>
              Authorized: {selectedTechnician.isAuthorised ? "Yes" : "No"}
            </Typography>
            <Typography>
              Registration No: {selectedTechnician.registrationNo}
            </Typography>
            <Typography>Aadhar No: {selectedTechnician.aadharNo}</Typography>
            {renderFilePreview(
              "Aadhar Picture",
              selectedTechnician.aadharPicture
            )}
            {renderFilePreview(
              "Certificate Picture",
              selectedTechnician.certificatePicture
            )}
            {!selectedTechnician.isAuthorised && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="service-category-label">Service Category</InputLabel>
            <Select
              labelId="service-category-label"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Service Category"
            >
              {serviceCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
              }}
            >
              <Button
                variant="contained"
                color={selectedTechnician.isVerified ? "error" : "success"}
                onClick={() =>
                  openDialog(
                    selectedTechnician.isVerified ? "block" : "unblock"
                  )
                }
              >
                {selectedTechnician.isVerified ? "Block" : "Unblock"}
              </Button>
              <Button
                variant="contained"
                color={selectedTechnician.isAuthorised ? "warning" : "info"}
                onClick={() =>
                  openDialog(
                    selectedTechnician.isAuthorised
                      ? "unauthorize"
                      : "authorize"
                  )
                }
                disabled={!selectedTechnician.isAuthorised && !selectedCategory}
              >
                {selectedTechnician.isAuthorised
                  ? "Unauthorize"
                  : "Authorize"}
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { borderRadius: 12, padding: "16px" } }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          {dialogAction === "block"
            ? "Block Technician"
            : dialogAction === "unblock"
            ? "Unblock Technician"
            : dialogAction === "authorize"
            ? "Authorize Technician"
            : "Unauthorize Technician"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to {dialogAction} this technician?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (dialogAction === "block" || dialogAction === "unblock") {
                handleBlockUnblock(
                  selectedTechnician._id,
                  selectedTechnician.isVerified
                );
              } else {
                handleAuthorize(
                  selectedTechnician._id,
                  selectedTechnician.isAuthorised
                );
              }
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Yes, do it
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {enlargedFile.file && (
        <Modal
          open={!!enlargedFile.file}
          onClose={() => setEnlargedFile({ type: "", file: "" })}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "1000px",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
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
                  It appears you don't have a PDF plugin for this browser. You
                  can{" "}
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
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Technicians;
