import React, { useEffect, useState } from "react";
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
  // IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
import axios from "../../utils/axiosConfig";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/admin/users", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
        },
      });
      setCustomers( response.data.users.filter((user) => user.role === "user"));
      setTotalUsers(response.data.users.filter((user) => user.role === "user").length);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch customers",
        severity: "error",
      });
    }
  };

  const handleBlockUnblock = async (userId, isVerified) => {
    try {
      await axios.patch(`/admin/users/${userId}/block`);
      setSnackbar({
        open: true,
        message: `User ${isVerified ? "blocked" : "unblocked"} successfully`,
        severity: "success",
      });
      fetchCustomers();
      handleCloseModal();
      closeDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update user status",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchCustomers();
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
        Customers
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
          label="Search Customers"
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
                Customer
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
            {customers.map((customer, index) => (
              <TableRow
                key={customer._id}
                sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
              >
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={customer?.firstName}
                      src={customer?.profilePicture}
                      sx={{ marginRight: "8px" }}
                    />
                    <Typography>
                      {customer.firstName} {customer.lastName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(customer.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: customer.isVerified ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {customer.isVerified ? "Active" : "Blocked"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenModal(customer)}
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
          count={totalUsers}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {selectedCustomer && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="customer-details-title"
          aria-describedby="customer-details-description"
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
            }}
          >
            <Typography
              id="customer-details-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: 2 }}
            >
              Customer Details
            </Typography>
            <Typography id="customer-details-description" sx={{ mt: 2 }}>
              Name: {selectedCustomer.firstName} {selectedCustomer.lastName}
            </Typography>
            <Typography>Email: {selectedCustomer.email}</Typography>
            <Typography>Phone: {selectedCustomer.phoneNumber}</Typography>
            <Typography>
              Status: {selectedCustomer.isVerified ? "Active" : "Blocked"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
              }}
            >
              <Button
                variant="contained"
                color={selectedCustomer.isVerified ? "error" : "success"}
                onClick={openDialog}
              >
                {selectedCustomer.isVerified ? "Block" : "Unblock"}
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
        PaperProps={{
          style: {
            borderRadius: 12,
            padding: "16px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          {selectedCustomer?.isVerified ? "Block User" : "Unblock User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            {selectedCustomer?.isVerified ? "block" : "unblock"} this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleBlockUnblock(
                selectedCustomer._id,
                selectedCustomer.isVerified
              )
            }
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
    </Box>
  );
};

export default Customers;
