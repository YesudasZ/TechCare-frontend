import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Schedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  // const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [serviceType, setServiceType] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const handleAddAddress = async () => {
    try {
      await axios.patch("/auth/update-address", newAddress);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phoneNumber: "",
      });
      setIsAddressModalOpen(false);
      fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        serviceType,
        selectedDate,
        selectedTime,
        selectedAddress,
      },
    });
  };

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
  ];

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
                  {timeSlots.map((slot) => (
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
                  <p className="text-gray-600 mb-2">{serviceType.description}</p>
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
            disabled={!selectedDate || !selectedTime || !selectedAddress}
          >
            Proceed to Checkout
            <FiArrowRight className="ml-2" />
          </motion.button>
        </div>
      </div>

      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
            <div className="space-y-4">
              {["street", "city", "state", "country", "postalCode", "phoneNumber"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newAddress[field]}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [field]: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Address
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Schedule;

