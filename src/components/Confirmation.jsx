
// const Confirmation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { service } = location.state;

//   if (!service) {
//     return <div>No service details available</div>;
//   }

//   return (
//     <div >

//     </div>
//   );
// };

// export default Confirmation;



// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiFileText } from 'react-icons/fi';

// const Confirmation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { service } = location.state;

//   if (!service) {
//     return <div>No service details available</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 pt-20 pb-12">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
//       >
//         <motion.div 
//           className="h-48 bg-cover bg-center relative"
//           style={{ backgroundImage: `url(${service.servicePicture || '/default-banner.jpg'})` }}
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//             <h2 className="text-4xl font-bold text-white text-center">Booking Confirmed!</h2>
//           </div>
//         </motion.div>

//         <div className="p-8">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
//             className="mb-6 flex justify-center"
//           >
//             <FiCheckCircle className="text-6xl text-green-500" />
//           </motion.div>
          
//           <div className="mb-8">
//             <h3 className="text-2xl font-semibold mb-4 text-gray-800">Service Details</h3>
//             <motion.div 
//               className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg shadow-md"
//               whileHover={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
//             >
//               <p className="text-xl font-semibold text-blue-700">{service.serviceName}</p>
//               <p className="text-gray-700 mt-2">{service.serviceDescription}</p>
//             </motion.div>
//           </div>

//           <div className="mb-8 grid grid-cols-2 gap-6">
//             <motion.div className="flex items-center bg-blue-50 p-4 rounded-lg" whileHover={{ scale: 1.05 }}>
//               <FiCalendar className="text-blue-600 text-2xl mr-3" />
//               <span className="text-gray-700">{new Date(service.appointmentDate).toLocaleDateString()}</span>
//             </motion.div>
//             <motion.div className="flex items-center bg-purple-50 p-4 rounded-lg" whileHover={{ scale: 1.05 }}>
//               <FiClock className="text-purple-600 text-2xl mr-3" />
//               <span className="text-gray-700">{new Date(service.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//             </motion.div>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-2xl font-semibold mb-4 text-gray-800">Service Address</h3>
//             <motion.div 
//               className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg shadow-md flex items-start"
//               whileHover={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
//             >
//               <FiMapPin className="text-blue-600 text-2xl mr-3 mt-1" />
//               <div>
//                 <p className="text-gray-700">{service.address.street}</p>
//                 <p className="text-gray-700">{service.address.city}, {service.address.state}</p>
//                 <p className="text-gray-700">{service.address.country} - {service.address.postalCode}</p>
//                 <p className="text-gray-700">{service.address.phoneNumber}</p>
//               </div>
//             </motion.div>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-2xl font-semibold mb-4 text-gray-800">Payment Details</h3>
//             <motion.div 
//               className="bg-gradient-to-r from-yellow-100 to-green-100 p-6 rounded-lg shadow-md flex justify-between items-center"
//               whileHover={{ boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
//             >
//               <span className="text-xl font-semibold text-gray-700">Total Paid:</span>
//               <span className="text-3xl font-bold text-green-600">₹{service.amount}</span>
//             </motion.div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center text-lg"
//             onClick={() => navigate('/bookings')}
//           >
//             <FiFileText className="mr-3" />
//             View My Bookings
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Confirmation;



// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiCalendar, FiClock, FiMapPin, FiFileText, FiCheckCircle } from 'react-icons/fi';
// import file from "../../pictures/file.png";


// const Confirmation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { service } = location.state;

//   if (!service) {
//     return <div>No service details available</div>;
//   }

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const formatTime = (time) => {
//     return new Date(time).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 pt-20 pb-12">
//       <div className="max-w-4xl mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white shadow-xl rounded-lg overflow-hidden"
//         >
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
//             <h1 className="text-3xl font-bold">Booking Confirmation</h1>
//           </div>
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row items-center mb-8">
//               <motion.div
//                 className="w-48 h-48 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <img src={fil} alt="Technician" className="w-full h-full object-cover" />
//               </motion.div>
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">{service.serviceName}</h2>
//                 <p className="text-gray-600 mb-4">{service.serviceDescription}</p>
//                 <div className="flex items-center text-blue-600 mb-2">
//                   <FiCalendar className="mr-2" />
//                   <span>{formatDate(service.appointmentDate)}</span>
//                 </div>
//                 <div className="flex items-center text-blue-600">
//                   <FiClock className="mr-2" />
//                   <span>{formatTime(service.appointmentTime)}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-100 rounded-lg p-4 mb-6">
//               <h3 className="text-lg font-semibold mb-2 flex items-center">
//                 <FiMapPin className="mr-2 text-blue-500" />
//                 Service Address
//               </h3>
//               <p>{service.address.street}</p>
//               <p>{service.address.city}, {service.address.state}</p>
//               <p>{service.address.country} - {service.address.postalCode}</p>
//               <p>Phone: {service.address.phoneNumber}</p>
//             </div>

//             <div className="bg-green-100 rounded-lg p-4 mb-6">
//               <h3 className="text-lg font-semibold mb-2 flex items-center">
//                 <FiCheckCircle className="mr-2 text-green-500" />
//                 Payment Status
//               </h3>
//               <p className="text-green-600">Paid: ₹{service.amount}</p>
//               <p>Payment ID: {service.paymentId}</p>
//             </div>

//             <div className="text-center mb-6">
//               <p className="text-xl font-semibold text-purple-600 mb-2">
//                 "You did your part, the rest is up to our team!"
//               </p>
//               <p className="text-gray-600">
//                 "Take a break, we'll handle the rest!"
//               </p>
//             </div>

//             <motion.div
//               className="text-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <button></button>
//               <button
//                 onClick={() => navigate('/bookings')}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg"
//               >
//                 <FiFileText className="inline-block mr-2" />
//                 View My Bookings
//               </button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Confirmation;



// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiCalendar, FiClock, FiMapPin, FiFileText, FiCheckCircle, FiUser, FiDollarSign } from 'react-icons/fi';

// const Confirmation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { service } = location.state || {};

//   if (!service) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
//       >
//         <div className="bg-white p-8 rounded-lg shadow-xl">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">No service details available</h2>
//           <button
//             onClick={() => navigate('/services')}
//             className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
//           >
//             Back to Services
//           </button>
//         </div>
//       </motion.div>
//     );
//   }

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const formatTime = (time) => {
//     return new Date(time).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-3xl mx-auto">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white shadow-2xl rounded-3xl overflow-hidden"
//         >
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 sm:p-10">
//             <h1 className="text-3xl sm:text-4xl font-bold">Booking Confirmation</h1>
//           </div>
//           <div className="p-6 sm:p-10">
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="flex flex-col sm:flex-row items-center mb-8"
//             >
//               <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-8 bg-gray-200 flex items-center justify-center">
//                 <FiUser className="text-6xl text-gray-400" />
//               </div>
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800">{service.serviceName}</h2>
//                 <p className="text-gray-600 mb-4">{service.serviceDescription}</p>
//                 <div className="flex items-center text-blue-600 mb-2">
//                   <FiCalendar className="mr-2" />
//                   <span>{formatDate(service.appointmentDate)}</span>
//                 </div>
//                 <div className="flex items-center text-blue-600">
//                   <FiClock className="mr-2" />
//                   <span>{formatTime(service.appointmentTime)}</span>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//               className="bg-gray-50 rounded-2xl p-6 mb-6"
//             >
//               <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
//                 <FiMapPin className="mr-2 text-blue-500" />
//                 Service Address
//               </h3>
//               <p className="text-gray-600">{service.address.street}</p>
//               <p className="text-gray-600">{service.address.city}, {service.address.state}</p>
//               <p className="text-gray-600">{service.address.country} - {service.address.postalCode}</p>
//               <p className="text-gray-600">Phone: {service.address.phoneNumber}</p>
//             </motion.div>

//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.5 }}
//               className="bg-green-50 rounded-2xl p-6 mb-6"
//             >
//               <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
//                 <FiCheckCircle className="mr-2 text-green-500" />
//                 Payment Status
//               </h3>
//               <p className="text-green-600 font-semibold flex items-center">
//                 <FiDollarSign className="mr-2" />
//                 Paid: ₹{service.amount}
//               </p>
//               <p className="text-gray-600">Payment ID: {service.paymentId}</p>
//             </motion.div>

//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//               className="text-center mb-8"
//             >
//               <p className="text-xl font-semibold text-purple-600 mb-2">
//                 "You've done your part, now let our team take care of the rest!"
//               </p>
//               <p className="text-gray-600">
//                 "Sit back, relax, and we'll handle everything from here."
//               </p>
//             </motion.div>

//             <motion.div
//               className="text-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <button
//                 onClick={() => navigate('/bookings')}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition duration-300 ease-in-out"
//               >
//                 <FiFileText className="inline-block mr-2" />
//                 View My Bookings
//               </button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Confirmation;





import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiFileText, FiCheckCircle } from 'react-icons/fi';
import file from "../../pictures/file.png";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { service } = location.state;

  if (!service) {
    return <div>No service details available</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div  className="min-h-screen bg-gradient-to-b from-gray-500 to-black pt-20 pb-12">
      <div className="max-w-4xl mx-auto my-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <h1 className="text-4xl font-extrabold tracking-wide">Booking Confirmed!</h1>
          </div>
          <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                className="w-48 h-48 rounded-full overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img src={file} alt="Technician" className="w-full h-full object-cover" />
              </motion.div>
              <div className="mt-4 md:mt-0 md:ml-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{service.serviceName}</h2>
                <p className="text-gray-600 mb-4">{service.serviceDescription}</p>
                <div className="flex items-center text-blue-600 mb-2">
                  <FiCalendar className="mr-2" />
                  <span>{formatDate(service.appointmentDate)}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <FiClock className="mr-2" />
                  <span>{formatTime(service.appointmentTime)}</span>
                </div>
              </div>
            </div>

            {/* Service Address */}
            <motion.div
              className="bg-gray-100 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FiMapPin className="mr-2 text-blue-500" />
                Service Address
              </h3>
              <p>{service.address.street}</p>
              <p>{service.address.city}, {service.address.state}</p>
              <p>{service.address.country} - {service.address.postalCode}</p>
              <p>Phone: {service.address.phoneNumber}</p>
            </motion.div>

            {/* Payment Status */}
            <motion.div
              className="bg-green-100 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FiCheckCircle className="mr-2 text-green-500" />
                Payment Status
              </h3>
              <p className="text-green-600 font-bold">Paid: ₹{service.amount}</p>
              <p>Payment ID: {service.paymentId}</p>
            </motion.div>

            {/* Encouragement Message */}
            <div className="text-center mb-6">
              <p className="text-2xl font-semibold text-purple-600 mb-2">
                "You did your part, the rest is up to our team!"
              </p>
              <p className="text-gray-600">
                "Take a break, we'll handle the rest!"
              </p>
            </div>

            {/* View My Bookings Button */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => navigate('/bookings')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
              >
                <FiFileText className="inline-block mr-2" />
                View My Bookings
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
