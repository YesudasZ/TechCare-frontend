import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPlus,
  FiArrowRight,
  FiPhone,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../utils/axiosConfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { updateUserAddress, getUserAddresses } from "../store/authSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Schedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAddresses();
    fetchServiceType();
  }, [id]);

  const fetchServiceType = async () => {
    try {
      const response = await axios.get(`/auth/service-type/${id}`);
      setServiceType(response.data);
    } catch (error) {
      console.error("Error fetching service type:", error);
      showSnackbar("Error fetching service type", "error");
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("/auth/addresses");
      setAddresses(response.data.addresses);
      if (response.data.addresses.length > 0) {
        setSelectedAddress(response.data.addresses[0]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      showSnackbar("Error fetching addresses", "error");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "street":
      case "city":
      case "state":
      case "country":
        if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          error = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must contain only letters and spaces.`;
        }
        break;
      case "postalCode":
        if (!/^\d{6}$/.test(value.trim())) {
          error = "Postal code must be exactly 6 digits.";
        }
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value.trim())) {
          error = "Phone number must be exactly 10 digits.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleAddressFieldChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const isFormValid = (address) => {
    const newErrors = {};
    Object.keys(address).forEach((key) => {
      const error = validateField(key, address[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = async () => {
    if (!isFormValid(newAddress)) {
      showSnackbar("Please fix the errors in the form", "error");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(updateUserAddress(newAddress)).unwrap();
      showSnackbar("Address added successfully", "success");
      setIsAddressModalOpen(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phoneNumber: "",
      });
      fetchAddresses();
      dispatch(getUserAddresses());
    } catch (error) {
      showSnackbar(error.message || "Failed to add address", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!selectedDate) {
      showSnackbar("Please select a date", "warning");
      return;
    }
    if (!selectedTime) {
      showSnackbar("Please select a time slot", "warning");
      return;
    }
    if (!selectedAddress) {
      showSnackbar("Please select an address", "warning");
      return;
    }

    navigate("/payment", {
      state: {
        serviceType,
        selectedDate,
        selectedTime,
        selectedAddress,
      },
    });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => {
      setSnackbar({ ...snackbar, open: false });
    }, 3000);
  };

  const getAvailableTimeSlots = () => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);

    const isToday = selectedDateTime.toDateString() === now.toDateString();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const allTimeSlots = [
      { display: "09:00 AM - 10:00 AM", hour: 9 },
      { display: "10:00 AM - 11:00 AM", hour: 10 },
      { display: "11:00 AM - 12:00 PM", hour: 11 },
      { display: "12:00 PM - 01:00 PM", hour: 12 },
      { display: "02:00 PM - 03:00 PM", hour: 14 },
      { display: "03:00 PM - 04:00 PM", hour: 15 },
      { display: "04:00 PM - 05:00 PM", hour: 16 },
      { display: "05:00 PM - 06:00 PM", hour: 17 },
    ];

    if (!isToday) return allTimeSlots.map((slot) => slot.display);
    return allTimeSlots
      .filter((slot) => {
        if (slot.hour > currentHour) return true;
        if (slot.hour === currentHour && currentMinutes < 45) return true;
        return false;
      })
      .map((slot) => slot.display);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-black pt-20 pb-12">
      <div className="max-w-5xl mt-20 mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Schedule Your Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FiCalendar className="mr-2 text-blue-500" />
                  Select Date
                </h3>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={new Date()}
                  className="border rounded-lg p-2 w-full"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FiClock className="mr-2 text-blue-500" />
                  Select Time
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {getAvailableTimeSlots().map((slot) => (
                    <motion.button
                      key={slot}
                      onClick={() => handleTimeChange(slot)}
                      className={`p-2 rounded-lg ${
                        selectedTime === slot
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {slot}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {serviceType && (
                <div className="shadow-md mb-8 p-4 rounded-lg bg-gray-50">
                  <h3 className="text-xl font-semibold mb-2 text-blue-600">
                    {serviceType.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {serviceType.description}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{serviceType.rate}
                  </p>
                  {serviceType.imageUrl && serviceType.imageUrl[0] && (
                    <img
                      src={serviceType.imageUrl[0]}
                      alt={serviceType.name}
                      className="mt-4 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FiMapPin className="mr-2 text-blue-500" />
                  Select Address
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {addresses.map((address) => (
                    <motion.div
                      key={address._id}
                      onClick={() => handleAddressChange(address)}
                      className={`p-4 rounded-lg cursor-pointer ${
                        selectedAddress?._id === address._id
                          ? "bg-blue-100 border-2 border-blue-500"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm">
                        {address.street}, {address.city}, {address.state},{" "}
                        {address.country} - {address.postalCode}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="mt-4 flex items-center text-blue-500 hover:text-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus className="mr-1" /> Add New Address
                </motion.button>
              </div>
            </div>
          </div>
          <motion.button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Checkout
            <FiArrowRight className="ml-2" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isAddressModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
              <div className="space-y-4">
                {[
                  { name: "street", label: "Street", icon: FiMapPin },
                  { name: "city", label: "City", icon: FiMapPin },
                  { name: "state", label: "State", icon: FiMapPin },
                  { name: "country", label: "Country", icon: FiMapPin },
                  { name: "postalCode", label: "Postal Code", icon: FiMapPin },
                  { name: "phoneNumber", label: "Phone Number", icon: FiPhone },
                ].map(({ name, label, icon: Icon }) => (
                  <div key={name}>
                    <div className="relative">
                      <Icon className="absolute top-3 left-3 text-gray-400" />
                      <input
                        type="text"
                        name={name}
                        placeholder={label}
                        value={newAddress[name]}
                        onChange={handleAddressFieldChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors[name]
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:ring-blue-200"
                        }`}
                      />
                    </div>
                    {errors[name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleAddAddress}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Address"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
    </div>
  );
};

export default Schedule;