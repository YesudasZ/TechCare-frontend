import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader,
  MessageCircle,
  User,
  Star,
  ChevronLeft,
  ChevronRight,
  Flag,
  Upload,
} from "lucide-react";
import axios from "../utils/axiosConfig";
import ChatWindow from "./ChatWindow";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
} from "@mui/material";

const Bookings = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackNote, setFeedbackNote] = useState("");
  const user = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(3);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportNote, setReportNote] = useState("");
  const [reportImages, setReportImages] = useState([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get("/auth/user-bookings");
        console.log("res", response.data);

        setServices(response.data);
        setSnackbar({
          open: true,
          message: "Bookings loaded successfully",
          severity: "success",
        });
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
        setSnackbar({
          open: true,
          message: "Failed to load bookings",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "cancelled":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <Loader className="animate-spin text-yellow-500 w-5 h-5" />;
    }
  };

  const handleChatClick = (service) => {
    setSelectedService(service);
    setChatOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFeedbackClick = (service) => {
    setSelectedService(service);
    setFeedbackDialogOpen(true);
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axios.post("/auth/feedback", {
        serviceId: selectedService._id,
        rating: feedbackRating,
        feedback: feedbackNote,
      });

      setFeedbackDialogOpen(false);
      setFeedbackRating(0);
      setFeedbackNote("");
      setSnackbar({
        open: true,
        message: "Feedback submitted successfully",
        severity: "success",
      });
      const response = await axios.get("/auth/user-bookings");
      setServices(response.data);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to submit feedback",
        severity: "error",
      });
    }
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const handleReportClick = (service) => {
    setSelectedService(service);
    setReportDialogOpen(true);
  };

  const handleReportImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setReportImages((prevImages) => [...prevImages, ...images]);
    });
  };

  const handleReportSubmit = async () => {
    try {
      await axios.post("/auth/submit-report", {
        serviceId: selectedService._id,
        reportNote,
        reportImages,
      });

      setReportDialogOpen(false);
      setReportNote("");
      setReportImages([]);
      setSnackbar({
        open: true,
        message: "Report submitted successfully",
        severity: "success",
      });
      const response = await axios.get("/auth/user-bookings");
      setServices(response.data);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to submit report",
        severity: "error",
      });
    }
  };

  const handleCancelClick = (service) => {
    setSelectedService(service);
    setCancelDialogOpen(true);
  };

  const handleCancelSubmit = async () => {
    try {
      await axios.put("/auth/cancel-service", {
        serviceId: selectedService._id,
        reason: cancelReason,
      });

      setCancelDialogOpen(false);
      setCancelReason("");
      setSnackbar({
        open: true,
        message: "Service cancelled successfully",
        severity: "success",
      });
      const response = await axios.get("/auth/user-bookings");
      setServices(response.data);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to cancel service",
        severity: "error",
      });
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-b from-gray-500 to-black pt-20 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-white mb-8"
      >
        My Bookings
      </motion.h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-blue-500 w-12 h-12" />
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4"
          role="alert"
        >
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentServices.map((service) => (
              <motion.div
                key={service._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={service.servicePicture}
                    alt={service.serviceName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 m-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        service.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : service.status === "cancelled"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {service.serviceName}
                    </h2>
                    <span className="text-sm font-medium text-gray-500">
                      {service.categoryName}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.serviceDescription}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span>
                        {new Date(service.appointmentDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span>
                        {new Date(service.appointmentTime).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span>
                        {`${service.address.city}, ${service.address.state}`}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                      <span>{service.amount}</span>
                    </div>
                  </div>

                  {service.technician && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Technician
                      </h4>
                      <div className="flex items-center mb-4">
                        <img
                          src={
                            service.technician.profilePicture ||
                            "/default-avatar.png"
                          }
                          alt={`${service.technician.firstName} ${service.technician.lastName}`}
                          className="w-12 h-12 rounded-full mr-3 object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {`${service.technician.firstName} ${service.technician.lastName}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {service.technician.phoneNumber}
                          </p>
                        </div>
                      </div>
                      {service.status !== "completed" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleChatClick(service)}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" /> Chat with
                          Technician
                        </motion.button>
                      )}
                    </div>
                  )}
                  {service.status === "completed" && !service.feedback && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFeedbackClick(service)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out mt-4"
                    >
                      <Star className="w-5 h-5 mr-2" /> Leave Feedback
                    </motion.button>
                  )}

                  {service.feedback && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Your Feedback
                      </h4>
                      <div className="flex items-center mb-2">
                        <Rating value={service.feedback.rating} readOnly />
                        <span className="ml-2 text-gray-600">
                          {service.feedback.rating}/5
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {service.feedback.feedback}
                      </p>
                    </div>
                  )}

                  {service.status === "completed" && !service.report && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReportClick(service)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out mt-4"
                    >
                      <Flag className="w-5 h-5 mr-2" /> Submit Report
                    </motion.button>
                  )}
                  {service.status !== "completed" && service.status !== "cancelled" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancelClick(service)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out mt-4"
                  >
                    <XCircle className="w-5 h-5 mr-2" /> Cancel Service
                  </motion.button>
                )}

                  {service.report && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Report Submitted
                      </h4>
                      <p className="text-gray-700">
                        Status: {service.report.status}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && services.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-white">You have no booked services.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {services.length > servicesPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({
              length: Math.ceil(services.length / servicesPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === index + 1
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(services.length / servicesPerPage)
              }
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}

      {chatOpen && selectedService && (
        <ChatWindow
          service={selectedService}
          onClose={() => setChatOpen(false)}
          currentUser={user}
        />
      )}

      <Dialog
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
      >
        <DialogTitle>Leave Feedback</DialogTitle>
        <DialogContent>
          <Rating
            name="feedback-rating"
            value={feedbackRating}
            onChange={(event, newValue) => setFeedbackRating(newValue)}
            size="large"
            className="mb-4"
          />
          <TextField
            autoFocus
            margin="dense"
            id="feedback-note"
            label="Feedback Note"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedbackNote}
            onChange={(e) => setFeedbackNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleFeedbackSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
      >
        <DialogTitle>Submit Report</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="report-note"
            label="Report Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={reportNote}
            onChange={(e) => setReportNote(e.target.value)}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="report-image-upload"
            type="file"
            multiple
            onChange={handleReportImageUpload}
          />
          <label htmlFor="report-image-upload">
            <Button
              component="span"
              startIcon={<Upload />}
              variant="outlined"
              className="mt-4"
            >
              Upload Images
            </Button>
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {reportImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Report image ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleReportSubmit} color="primary">
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cancel-reason"
            label="Reason for Cancellation"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Back</Button>
          <Button onClick={handleCancelSubmit} color="primary">
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Bookings;
