
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceType, selectedDate, selectedTime, selectedAddress } =
    location.state;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
      setIsLoading(true);
      try {
        const orderResponse = await axios.post("/auth/payment/create-order", {
          amount: serviceType.rate * 100, 
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderResponse.data.order.amount,
          currency: "INR",
          name: "TechCare",
          description: `Payment for ${serviceType.name}`,
          order_id: orderResponse.data.order.id,
          handler: async function (response) {
         
            try {
              const paymentData = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              };
  
              const verificationResponse = await axios.post('/auth/payment/verify', paymentData);
              if (verificationResponse.data.success === true) {
                const serviceRequestData = {
                  serviceType: serviceType._id,
                  appointmentDate: selectedDate.toISOString().split('T')[0],
                  appointmentTime: selectedTime,
                  address: selectedAddress,
                  amount: serviceType.rate,
                  paymentId: response.razorpay_payment_id,
                };
  
                const serviceResponse = await axios.post('/auth/service/create', serviceRequestData);
          
              navigate('/booking-confirmation', { 
                state: { 
                  service: serviceResponse.data.service
                } 
              });
              } else {
                alert('Payment verification failed test. Please try again.');
              }
            } catch (error) {
              console.error('Payment verification failed:', error);
              alert('Payment verification failed. Please try again.');
            }
          },
          prefill: {
            name: 'John Doe', 
            email: 'john@example.com',
            contact: '9876543210',
          },
          theme: {
            color: '#3399cc',
          },
        };
  
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error('Payment initiation failed:', error);
        alert('Failed to initiate payment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-black pt-20 pb-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Service Details
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-600">
                {serviceType.name}
              </p>
              <p className="text-gray-600">{serviceType.description}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Appointment
            </h3>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <FiCalendar className="text-blue-500 mr-2" />
                <span>{selectedDate.toDateString()}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="text-blue-500 mr-2" />
                <span>{selectedTime}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Service Address
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg flex items-start">
              <FiMapPin className="text-blue-500 mr-2 mt-1" />
              <div>
                <p>{selectedAddress.street}</p>
                <p>
                  {selectedAddress.city}, {selectedAddress.state}
                </p>
                <p>
                  {selectedAddress.country} - {selectedAddress.postalCode}
                </p>
                <p>{selectedAddress.phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg flex items-start">
              <FiAlertCircle className="text-yellow-500 mr-2 mt-1" />
              <p className="text-sm text-yellow-700">
                Please note: Additional parts required for your service may
                incur extra charges. These will need to be paid directly to the
                technician.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Amount to Pay
            </h3>
            <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
              <span className="text-lg font-semibold text-green-700">
                Total:
              </span>
              <span className="text-2xl font-bold text-green-600">
                ₹{serviceType.rate}
              </span>
            </div>
          </div>

          <motion.button
        onClick={handlePayment}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
      >
        {isLoading ? (
          "Processing..."
        ) : (
          <>
            <FiDollarSign className="mr-2" />
            Pay Now
          </>
        )}
      </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
