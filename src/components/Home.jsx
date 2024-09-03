// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../store/authSlice";
// import { toast } from "react-toastify";

// const Home = () => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap();
//       toast.success("Logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Failed to logout. Please try again.");
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8">
//           Welcome to TechCare
//         </h1>
//         {user ? (
//           <div className="text-center">
//             <p className="text-xl mb-4">Hello, {user.firstName}!</p>
//             <p className="mb-8">What would you like to do today?</p>
//             <div className="space-x-4">
//               <Link
//                 to="/dashboard"
//                 className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300"
//               >
//                 Go to Dashboard
//               </Link>
//               <Link
//                 to="/services"
//                 className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
//               >
//                 Browse Services
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center">
//             <p className="text-xl mb-8">
//               Join TechCare today and get expert tech support!
//             </p>
//             <div className="space-x-4">
//               <Link
//                 to="/login"
//                 className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


// // import { BannerImage, ServiceImage1, ServiceImage2, ServiceImage3, ServiceImage4, ServiceImage5, ServiceImage6 } from 'path-to-your-assets'; // Import high-quality images
// import { Button, Card, Icon } from '@mui/material'; // Import UI components from Material-UI
// // import { WrenchIcon, MagnifyingGlassIcon } from '@heroicons/react/outline'; // Import icons
// import banner from "../../pictures/Designer (9).png"

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Banner Section */}
        // <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
        //   <img src={banner} alt="Banner" className="w-full h-64 object-cover" />
        //   <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        //     <div className="text-center text-white">
        //       <h1 className="text-4xl font-bold">Ready to Live Smarter?</h1>
        //       <p className="mt-2 text-lg">Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.</p>
        //       <Button variant="contained" color="primary" className="mt-4">Get Started</Button>
        //     </div>
        //   </div>
        // </div>

//         {/* Services Section */}
//         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           <Card className="flex flex-col items-center p-4">
//             {/* <img src={ServiceImage1} alt="Carpentry" className="w-24 h-24 object-cover rounded-full" /> */}
//             <h2 className="mt-4 text-xl font-semibold">Carpentry</h2>
//           </Card>
//           <Card className="flex flex-col items-center p-4">
//             {/* <img src={ServiceImage2} alt="Appliance" className="w-24 h-24 object-cover rounded-full" /> */}
//             <h2 className="mt-4 text-xl font-semibold">Appliance</h2>
//           </Card>
//           <Card className="flex flex-col items-center p-4">
//             {/* <img src={ServiceImage3} alt="Plumbing" className="w-24 h-24 object-cover rounded-full" /> */}
//             <h2 className="mt-4 text-xl font-semibold">Plumbing</h2>
//           </Card>
//           <Card className="flex flex-col items-center p-4">
//             {/* <img src={ServiceImage4} alt="Electrical" className="w-24 h-24 object-cover rounded-full" /> */}
//             <h2 className="mt-4 text-xl font-semibold">Electrical</h2>
//           </Card>
//           <Card className="flex flex-col items-center p-4">
//             {/* <img src={ServiceImage5} alt="Painting" className="w-24 h-24 object-cover rounded-full" /> */}
//             <h2 className="mt-4 text-xl font-semibold">Painting</h2>
//           </Card>
//           <Card className="flex flex-col items-center p-4">
//             {/* <img src={ServiceImage6} alt="General" className="w-24 h-24 object-cover rounded-full" /> */}
//             <h2 className="mt-4 text-xl font-semibold">General</h2>
//           </Card>
//         </div>

//         {/* How It Works Section */}
//         <div className="mt-12">
//           <h2 className="text-3xl font-bold text-center">How It Works</h2>
//           <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center">
//               {/* <WrenchIcon className="w-12 h-12 text-indigo-500" /> */}
//               <h3 className="mt-4 text-xl font-semibold">01 Choose What To Do</h3>
//               <p className="mt-2 text-center">Select the service you need from our wide range of options.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               {/* <MagnifyingGlassIcon className="w-12 h-12 text-indigo-500" /> */}
//               <h3 className="mt-4 text-xl font-semibold">02 Find What You Want</h3>
//               <p className="mt-2 text-center">Browse through our list of professionals and choose the best fit for your needs.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               {/* <LocationPinIcon className="w-12 h-12 text-indigo-500" /> */}
//               <h3 className="mt-4 text-xl font-semibold">03 Amazing Places</h3>
//               <p className="mt-2 text-center">Enjoy top-notch services at your convenience.</p>
//             </div>
//           </div>
//         </div>

//         {/* Unique Selling Points Section */}
//         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div className="flex flex-col items-center">
//             <Icon className="w-12 h-12 text-indigo-500">build</Icon>
//             <h3 className="mt-4 text-xl font-semibold">We Are Well Equipped</h3>
//             <p className="mt-2 text-center">Our professionals come with all the necessary tools and equipment.</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <Icon className="w-12 h-12 text-indigo-500">phone</Icon>
//             <h3 className="mt-4 text-xl font-semibold">Always In Touch</h3>
//             <p className="mt-2 text-center">Stay connected with our team throughout the service.</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <Icon className="w-12 h-12 text-indigo-500">credit_card</Icon>
//             <h3 className="mt-4 text-xl font-semibold">Cash-Free Facility</h3>
//             <p className="mt-2 text-center">Enjoy hassle-free payments with our cash-free facility.</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <Icon className="w-12 h-12 text-indigo-500">verified_user</Icon>
//             <h3 className="mt-4 text-xl font-semibold">Trusted Service</h3>
//             <p className="mt-2 text-center">We ensure top-quality service with trusted professionals.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React from 'react';
// import { motion } from 'framer-motion';
// // import { ChevronRightIcon } from '@heroicons/react/24/solid';


// const services = [
//   { name: 'Carpentry', icon: '🪚', description: '22 Services' },
//   { name: 'Appliance', icon: '🔧', description: '15 Services' },
//   { name: 'Plumbing', icon: '🚽', description: '18 Services' },
//   { name: 'Electrical', icon: '⚡', description: '20 Services' },
// ];

// const howItWorks = [
//   { title: 'Choose What To Do', description: 'Select from our wide range of home services.' },
//   { title: 'Find What You Want', description: 'Browse through our qualified professionals.' },
//   { title: 'Amazing Service', description: 'Enjoy high-quality service at your doorstep.' },
// ];

// const trustFeatures = [
//   { title: 'Saves Your Time', icon: '⏱️' },
//   { title: 'For Your Safety', icon: '🛡️' },
//   { title: 'Best-Rated Professionals', icon: '⭐' },
//   { title: 'We Are Well Equipped', icon: '🧰' },
//   { title: 'Always In Touch', icon: '📱' },
//   { title: 'Cash-Free Facility', icon: '💳' },
// ];

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4"
//           >
//             Ready to Live Smarter?
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-xl text-gray-600 mb-8"
//           >
//             Book expert home cleaners and handymen at a moment's notice.
//           </motion.p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
//           >
//             Book Now
//           </motion.button>
//         </div>
//         <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-purple-100 to-transparent"></div>
//       </section>

//       {/* Services Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-12">TechCare Serves</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.name}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300"
//             >
//               <div className="text-4xl mb-4">{service.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
//               <p className="text-gray-600">{service.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {howItWorks.map((step, index) => (
//             <motion.div
//               key={step.title}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               className="bg-white rounded-lg shadow-md p-6"
//             >
//               <div className="text-3xl font-bold text-blue-600 mb-4">{`0${index + 1}`}</div>
//               <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//               <p className="text-gray-600">{step.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Trust and Security Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-12">Your Trust and Security</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
//           {trustFeatures.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex items-center space-x-4"
//             >
//               <div className="text-3xl">{feature.icon}</div>
//               <div>
//                 <h3 className="font-semibold">{feature.title}</h3>
//                 <button className="text-blue-600 flex items-center mt-1 hover:underline">
//                   {/* Read More <ChevronRightIcon className="w-4 h-4 ml-1" /> */}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


// import { Fragment } from 'react';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';
// import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/outline';
// import banner from "../../pictures/Designer (9).png"

// const Home = () => {
//   return (
//     <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         {/* <section className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Ready to Live Smarter?</h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Book Expert home cleaners and handymen at a moment's notice. Just pick a time and we'll do the rest.
//           </p>
//           <button className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 transition-all duration-300">
//             Book Now
//           </button>
//         </section> */}

// <div className="relative bg-white shadow-lg rounded-lg  overflow-hidden">
//           <img src={banner} alt="Banner" className="w-full h-100 object-cover" />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-4xl font-bold">Ready to Live Smarter?</h1>
//               <p className="mt-2 text-lg">Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.</p>
//               {/* <Button variant="contained" color="primary" className="mt-4">Get Started</Button> */}
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <section className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">TechCare Serves...</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             <ServiceCard title="Carpentry" icon="🔨" services="22 Services" />
//             <ServiceCard title="Appliance" icon="🔧" services="26 Services" />
//             <ServiceCard title="Plumbing" icon="🚰" services="22 Services" />
//             <ServiceCard title="Electrical" icon="💡" services="22 Services" />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <HowItWorksStep step="01" title="Choose What To Do" />
//             <HowItWorksStep step="02" title="Find What You Want" />
//             <HowItWorksStep step="03" title="Amazing Places" />
//           </div>
//         </section>

//         {/* Trust and Security Section */}
//         <section className="bg-blue-600 py-16 text-white rounded-lg">
//           <h2 className="text-3xl font-bold text-center mb-8">Your Trust and Security</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <TrustFeature title="Saves You Time" icon={ClockIcon} />
//             <TrustFeature title="For Your Safety" icon={ShieldCheckIcon} />
//             <TrustFeature title="Best-Rated Professionals" icon={StarIcon} />
//             <TrustFeature title="We Are Well Equipped" icon={CheckIcon} />
//             <TrustFeature title="Always In Touch" icon={CheckIcon} />
//             <TrustFeature title="Cash-Free Facility" icon={CheckIcon} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const ServiceCard = ({ title, icon, services }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
//     <div className="text-6xl mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-gray-600">{services}</p>
//   </div>
// );

// const HowItWorksStep = ({ step, title }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
//     <h3 className="text-2xl font-bold mb-4">{step}</h3>
//     <p className="text-lg font-semibold mb-2">{title}</p>
//     <p className="text-gray-600">Lorem ipsum dolor amet, consectetur adipiscing tempor labore et dolore magna aliqua.</p>
//   </div>
// );

// const TrustFeature = ({ title, icon: Icon }) => (
//   <div className="text-center">
//     <Icon className="h-16 w-16 mx-auto mb-4" />
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     <a href="#" className="text-indigo-200 hover:text-white transition-all duration-300">Read More</a>
//   </div>
// );




// export default Home;


// import { Fragment } from 'react';
// import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/outline';
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { motion } from 'framer-motion';
// import banner from "../../pictures/Designer (9).png";
// import Header from './Header';  // Assuming you import the header component

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header /> {/* Include your header component */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Hero Section */}
//         <motion.div 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ duration: 1 }}
//           className="relative bg-black shadow-lg rounded-lg overflow-hidden mb-12"
//         >
//           <img src={banner} alt="Banner" className="w-full h-100 object-cover" />
//           <div className="absolute inset-0  bg-opacity-70 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-5xl font-extrabold">Ready to Live Smarter?</h1>
//               <p className="mt-4 text-xl">Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.</p>
//               <button className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Services Section */}
//         <section className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-white mb-8">TechCare Serves...</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             <ServiceCard title="Carpentry" icon="🔨" services="22 Services" />
//             <ServiceCard title="Appliance" icon="🔧" services="26 Services" />
//             <ServiceCard title="Plumbing" icon="🚰" services="22 Services" />
//             <ServiceCard title="Electrical" icon="💡" services="22 Services" />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-16">
//           <h2 className="text-4xl font-bold text-center text-white mb-8">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <HowItWorksStep step="01" title="Choose What To Do" />
//             <HowItWorksStep step="02" title="Find What You Want" />
//             <HowItWorksStep step="03" title="Amazing Places" />
//           </div>
//         </section>

//         {/* Trust and Security Section */}
//         <section className="bg-blue-800 py-16 rounded-lg">
//           <h2 className="text-4xl font-bold text-center mb-8">Your Trust and Security</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <TrustFeature title="Saves You Time" icon={ClockIcon} />
//             <TrustFeature title="For Your Safety" icon={ShieldCheckIcon} />
//             <TrustFeature title="Best-Rated Professionals" icon={StarIcon} />
//             <TrustFeature title="We Are Well Equipped" icon={CheckIcon} />
//             <TrustFeature title="Always In Touch" icon={CheckIcon} />
//             <TrustFeature title="Cash-Free Facility" icon={CheckIcon} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const ServiceCard = ({ title, icon, services }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
//   >
//     <div className="text-6xl mb-4">{icon}</div>
//     <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
//     <p className="text-gray-400">{services}</p>
//   </motion.div>
// );

// const HowItWorksStep = ({ step, title }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
//   >
//     <h3 className="text-3xl font-bold mb-4 text-blue-500">{step}</h3>
//     <p className="text-lg font-semibold mb-2 text-white">{title}</p>
//     <p className="text-gray-400">Lorem ipsum dolor amet, consectetur adipiscing tempor labore et dolore magna aliqua.</p>
//   </motion.div>
// );

// const TrustFeature = ({ title, icon: Icon }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="text-center"
//   >
//     <Icon className="h-16 w-16 mx-auto mb-4 text-blue-400" />
//     <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
//     <p className="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     <a href="#" className="text-indigo-200 hover:text-white transition-all duration-300">Read More</a>
//   </motion.div>
// );

// export default Home;


// import { Fragment } from 'react';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';
// import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/outline';
// import banner from "../../pictures/Designer (9).png";
// import { useState, useEffect } from 'react';
// import { useSpring, animated } from 'react-spring';

// const Home = () => {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.pageYOffset);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const bannerAnimation = useSpring({
//     transform: `translateY(${-scrollY * 0.25}px)`,
//     config: { tension: 120, friction: 20 },
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="relative bg-black rounded-lg overflow-hidden">
//           <animated.img
//             src={banner}
//             alt="Banner"
//             className="w-full h-100 object-cover"
//             style={bannerAnimation}
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-4xl font-bold">Ready to Live Smarter?</h1>
//               <p className="mt-2 text-lg">
//                 Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.
//               </p>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition-colors duration-300 mt-4">
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <section className="text-center mb-16 mt-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">TechCare Serves...</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             <ServiceCard title="Carpentry" icon="🔨" services="22 Services" />
//             <ServiceCard title="Appliance" icon="🔧" services="26 Services" />
//             <ServiceCard title="Plumbing" icon="🚰" services="22 Services" />
//             <ServiceCard title="Electrical" icon="💡" services="22 Services" />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <HowItWorksStep step="01" title="Choose What To Do" />
//             <HowItWorksStep step="02" title="Find What You Want" />
//             <HowItWorksStep step="03" title="Amazing Places" />
//           </div>
//         </section>

//         {/* Trust and Security Section */}
//         <section className="bg-blue-600 py-16 text-white rounded-lg">
//           <h2 className="text-3xl font-bold text-center mb-8">Your Trust and Security</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <TrustFeature title="Saves You Time" icon={ClockIcon} />
//             <TrustFeature title="For Your Safety" icon={ShieldCheckIcon} />
//             <TrustFeature title="Best-Rated Professionals" icon={StarIcon} />
//             <TrustFeature title="We Are Well Equipped" icon={CheckIcon} />
//             <TrustFeature title="Always In Touch" icon={CheckIcon} />
//             <TrustFeature title="Cash-Free Facility" icon={CheckIcon} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const ServiceCard = ({ title, icon, services }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
//     <div className="text-6xl mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-gray-600">{services}</p>
//   </div>
// );

// const HowItWorksStep = ({ step, title }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
//     <h3 className="text-2xl font-bold mb-4">{step}</h3>
//     <p className="text-lg font-semibold mb-2">{title}</p>
//     <p className="text-gray-600">Lorem ipsum dolor amet, consectetur adipiscing tempor labore et dolore magna aliqua.</p>
//   </div>
// );

// const TrustFeature = ({ title, icon: Icon }) => (
//   <div className="text-center">
//     <Icon className="h-16 w-16 mx-auto mb-4 text-blue-300" />
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     <a href="#" className="text-blue-300 hover:text-white transition-all duration-300">
//       Read More
//     </a>
//   </div>
// );

// export default Home;



// import { Fragment } from 'react';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';
// import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/outline';
// import { FaHammer, FaWrench, FaShower, FaLightbulb } from 'react-icons/fa';
// import banner from "../../pictures/Designer (9).png";
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

// const Home = () => {
//   return (
//     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="relative bg-black shadow-lg rounded-lg overflow-hidden mb-12">
//           <img src={banner} alt="Banner" className="w-full h-100 object-cover opacity-70" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-4xl md:text-6xl font-bold">Ready to Live Smarter?</h1>
//               <p className="mt-4 text-lg md:text-xl">Book expert home cleaners and handymen at a moment's notice. Just pick a time and we'll do the rest.</p>
//               <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <section className="text-center mb-16">
//           <h2 className="text-3xl font-bold mb-8">TechCare Serves...</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             <ServiceCard title="Carpentry" icon={<FaHammer />} services="22 Services" />
//             <ServiceCard title="Appliance" icon={<FaWrench />} services="26 Services" />
//             <ServiceCard title="Plumbing" icon={<FaShower />} services="22 Services" />
//             <ServiceCard title="Electrical" icon={<FaLightbulb />} services="22 Services" />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <HowItWorksStep step="01" title="Choose What To Do" />
//             <HowItWorksStep step="02" title="Find What You Want" />
//             <HowItWorksStep step="03" title="Amazing Places" />
//           </div>
//         </section>

//         {/* Trust and Security Section */}
//         <section className="bg-blue-600 py-16 rounded-lg text-center">
//           <h2 className="text-3xl font-bold mb-8">Your Trust and Security</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <TrustFeature title="Saves You Time" icon={ClockIcon} />
//             <TrustFeature title="For Your Safety" icon={ShieldCheckIcon} />
//             <TrustFeature title="Best-Rated Professionals" icon={StarIcon} />
//             <TrustFeature title="We Are Well Equipped" icon={CheckIcon} />
//             <TrustFeature title="Always In Touch" icon={CheckIcon} />
//             <TrustFeature title="Cash-Free Facility" icon={CheckIcon} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const ServiceCard = ({ title, icon, services }) => (
//   <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
//     <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//       <div className="text-5xl mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-400">{services}</p>
//     </CardHeader>
//     <CardBody className="overflow-visible py-2">
//       <Image
//         alt="Card background"
//         className="object-cover rounded-xl"
//         src="https://nextui.org/images/hero-card-complete.jpeg"
//         width={270}
//       />
//     </CardBody>
//   </Card>
// );

// const HowItWorksStep = ({ step, title }) => (
//   <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
//     <h3 className="text-2xl font-bold mb-4">{step}</h3>
//     <p className="text-lg font-semibold mb-2">{title}</p>
//     <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//   </div>
// );

// const TrustFeature = ({ title, icon: Icon }) => (
//   <div className="text-center">
//     <Icon className="h-16 w-16 mx-auto mb-4 text-white" />
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     <a href="#" className="text-blue-200 hover:text-white transition-transform transform hover:scale-105">Read More</a>
//   </div>
// );

// export default Home;


// import { Fragment } from 'react';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';
// import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/outline';
// import banner from "../../pictures/Designer (9).png";
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { FaHammer, FaWrench, FaFaucet, FaLightbulb } from 'react-icons/fa';
// import { BsCheckCircle, BsShieldCheck, BsStarFill, BsClock } from 'react-icons/bs';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-16">
//           <img src={banner} alt="Banner" className="w-full h-100 object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent bg-opacity-50 flex items-center justify-center">
//             <div className="text-center text-white px-8">
//               <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">Ready to Live Smarter?</h1>
//               <p className="text-lg md:text-xl mb-8 animate-fade-in-up delay-200">Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.</p>
//               <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 animate-fade-in-up delay-400">
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <section className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-800 mb-12">TechCare Serves...</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             <ServiceCard title="Carpentry" icon={<FaHammer />} services="22 Services" />
//             <ServiceCard title="Appliance" icon={<FaWrench />} services="26 Services" />
//             <ServiceCard title="Plumbing" icon={<FaFaucet />} services="22 Services" />
//             <ServiceCard title="Electrical" icon={<FaLightbulb />} services="22 Services" />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-24">
//           <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             <HowItWorksStep step="01" title="Choose What To Do" />
//             <HowItWorksStep step="02" title="Find What You Want" />
//             <HowItWorksStep step="03" title="Amazing Places" />
//           </div>
//         </section>

//         {/* Trust and Security Section */}
//         <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 rounded-2xl">
//           <h2 className="text-4xl font-bold text-white text-center mb-16">Your Trust and Security</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-white">
//             <TrustFeature title="Saves You Time" icon={<BsClock />} />
//             <TrustFeature title="For Your Safety" icon={<BsShieldCheck />} />
//             <TrustFeature title="Best-Rated Professionals" icon={<BsStarFill />} />
//             <TrustFeature title="We Are Well Equipped" icon={<BsCheckCircle />} />
//             <TrustFeature title="Always In Touch" icon={<BsCheckCircle />} />
//             <TrustFeature title="Cash-Free Facility" icon={<BsCheckCircle />} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const ServiceCard = ({ title, icon, services }) => (
//   <Card className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//     <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
//       <div className="text-6xl text-blue-600 mb-4">{icon}</div>
//       <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
//     </CardHeader>
//     <CardBody className="text-center">
//       <p className="text-gray-600 text-lg">{services}</p>
//     </CardBody>
//   </Card>
// );

// const HowItWorksStep = ({ step, title }) => (
//   <Card className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//     <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
//       <h3 className="text-3xl font-bold text-blue-600 mb-4">{step}</h3>
//       <p className="text-2xl font-semibold text-gray-800 mb-2">{title}</p>
//     </CardHeader>
//     <CardBody className="text-center">
//       <p className="text-gray-600 text-lg">Lorem ipsum dolor amet, consectetur adipiscing tempor labore et dolore magna aliqua.</p>
//     </CardBody>
//   </Card>
// );

// const TrustFeature = ({ title, icon }) => (
//   <div className="text-center">
//     <div className="text-5xl mb-4">{icon}</div>
//     <h3 className="text-2xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-200 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     <a href="#" className="text-blue-200 hover:text-white transition-all duration-300 inline-block mt-4">Read More</a>
//   </div>
// );

// export default Home;



//*real one */

// import { Fragment } from 'react';
// import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/outline';
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { motion } from 'framer-motion';
// import banner from "../../pictures/Designer (9).png";
// import Header from './Header';  // Assuming you import the header component

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header /> {/* Include your header component */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Hero Section */}
//         <motion.div 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ duration: 1 }}
//           className="relative bg-black shadow-lg rounded-lg overflow-hidden mb-12"
//         >
//           <img src={banner} alt="Banner" className="w-full h-100 object-cover" />
//           <div className="absolute inset-0 bg-opacity-70 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-5xl font-extrabold">Ready to Live Smarter?</h1>
//               <p className="mt-4 text-xl">Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.</p>
//               <button className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Services Section */}
//         <section className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-white mb-8">TechCare Serves...</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             <ServiceCard title="Carpentry" icon="🔨" services="22 Services" />
//             <ServiceCard title="Appliance" icon="🔧" services="26 Services" />
//             <ServiceCard title="Plumbing" icon="🚰" services="22 Services" />
//             <ServiceCard title="Electrical" icon="💡" services="22 Services" />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-16">
//           <h2 className="text-4xl font-bold text-center text-white mb-8">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <HowItWorksStep step="01" title="Choose What To Do" />
//             <HowItWorksStep step="02" title="Find What You Want" />
//             <HowItWorksStep step="03" title="Amazing Places" />
//           </div>
//         </section>

//         {/* Trust and Security Section */}
//         <section className="bg-blue-800 py-16 rounded-lg">
//           <h2 className="text-4xl font-bold text-center mb-8">Your Trust and Security</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <TrustFeature title="Saves You Time" icon={ClockIcon} />
//             <TrustFeature title="For Your Safety" icon={ShieldCheckIcon} />
//             <TrustFeature title="Best-Rated Professionals" icon={StarIcon} />
//             <TrustFeature title="We Are Well Equipped" icon={CheckIcon} />
//             <TrustFeature title="Always In Touch" icon={CheckIcon} />
//             <TrustFeature title="Cash-Free Facility" icon={CheckIcon} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const ServiceCard = ({ title, icon, services }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
//   >
//     <div className="text-6xl mb-4">{icon}</div>
//     <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
//     <p className="text-gray-400">{services}</p>
//   </motion.div>
// );

// const HowItWorksStep = ({ step, title }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
//   >
//     <h3 className="text-3xl font-bold mb-4 text-blue-500">{step}</h3>
//     <p className="text-lg font-semibold mb-2 text-white">{title}</p>
//     <p className="text-gray-400">Lorem ipsum dolor amet, consectetur adipiscing tempor labore et dolore magna aliqua.</p>
//   </motion.div>
// );

// const TrustFeature = ({ title, icon: Icon }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="text-center"
//   >
//     <Icon className="h-16 w-16 mx-auto mb-4 text-blue-400" />
//     <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
//     <p className="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     <a href="#" className="text-indigo-200 hover:text-white transition-all duration-300">Read More</a>
//   </motion.div>
// );

// export default Home;


//*end */


import { Fragment } from 'react';
import { CheckIcon, StarIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/outline';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { motion } from 'framer-motion';
import banner from "../../pictures/Designer (9).png";


const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative bg-gray-900 shadow-lg rounded-lg overflow-hidden mb-12 "
        >
          <img src={banner} alt="Banner" className="w-full h-70 object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-extrabold">Ready to Live Smarter?</h1>
              <p className="mt-4 text-xl text-gray-300">Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.</p>
              <button className="mt-6 bg-white text-black px-8 py-3 rounded-full text-lg hover:bg-gray-200 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <section className="text-center mb-16 px-5">
          <h2 className="text-4xl font-bold text-white mb-8">TechCare Serves...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <ServiceCard title="Carpentry" icon="🔨" services="22 Services" />
            <ServiceCard title="Appliance" icon="🔧" services="26 Services" />
            <ServiceCard title="Plumbing" icon="🚰" services="22 Services" />
            <ServiceCard title="Electrical" icon="💡" services="22 Services" />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
            <HowItWorksStep step="01" title="Choose What To Do" />
            <HowItWorksStep step="02" title="Find What You Want" />
            <HowItWorksStep step="03" title="Amazing Places" />
          </div>
        </section>

        {/* Trust and Security Section */}
        <section className="bg-gray-900 py-16 rounded-lg p-5">
          <h2 className="text-4xl font-bold text-center mb-8 ">Your Trust and Security</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
            <TrustFeature title="Saves You Time" icon={ClockIcon} />
            <TrustFeature title="For Your Safety" icon={ShieldCheckIcon} />
            <TrustFeature title="Best-Rated Professionals" icon={StarIcon} />
            <TrustFeature title="We Are Well Equipped" icon={CheckIcon} />
            <TrustFeature title="Always In Touch" icon={CheckIcon} />
            <TrustFeature title="Cash-Free Facility" icon={CheckIcon} />
          </div>
        </section>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, icon, services }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
  >
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{services}</p>
  </motion.div>
);

const HowItWorksStep = ({ step, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
  >
    <h3 className="text-3xl font-bold mb-4 text-gray-300">{step}</h3>
    <p className="text-lg font-semibold mb-2 text-white">{title}</p>
    <p className="text-gray-400">Lorem ipsum dolor amet, consectetur adipiscing tempor labore et dolore magna aliqua.</p>
  </motion.div>
);

const TrustFeature = ({ title, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center px-5"
  >
    <Icon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
    <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a href="#" className="text-gray-300 hover:text-white transition-all duration-300">Read More</a>
  </motion.div>
);

export default Home;



// import React from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { ArrowRight, Star, Shield, Clock, CheckCircle } from 'lucide-react';
// import Header from './Header';
// import Footer from './Footer';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Header />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Hero Section */}
//         <motion.section 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <h1 className="text-5xl font-extrabold mb-6">Welcome to TechCare</h1>
//           <p className="text-xl text-gray-400 mb-8">Your one-stop solution for all tech support needs</p>
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-black px-8 py-3 rounded-full text-lg hover:bg-gray-200 transition-colors duration-300"
//           >
//             Get Started
//           </motion.button>
//         </motion.section>

//         {/* Services Section */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {['Computer Repair', 'Network Setup', 'Data Recovery'].map((service, index) => (
//               <Card key={index} className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300">
//                 <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//                   <p className="text-tiny uppercase font-bold text-gray-400">TechCare</p>
//                   <h4 className="font-bold text-large text-white">{service}</h4>
//                 </CardHeader>
//                 <CardBody className="overflow-visible py-2">
//                   <Image
//                     alt="Service illustration"
//                     className="object-cover rounded-xl"
//                     src={`https://source.unsplash.com/random/300x200?${service.toLowerCase().replace(' ', '')}`}
//                     width={300}
//                   />
//                 </CardBody>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               { icon: Star, title: 'Expert Technicians' },
//               { icon: Shield, title: 'Secure Service' },
//               { icon: Clock, title: 'Quick Turnaround' },
//               { icon: CheckCircle, title: 'Guaranteed Satisfaction' }
//             ].map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 whileHover={{ y: -5 }}
//                 className="bg-gray-900 p-6 rounded-lg text-center"
//               >
//                 <feature.icon className="w-12 h-12 mx-auto mb-4 text-white" />
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* CTA Section */}
//         <motion.section 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-center bg-gray-900 py-16 rounded-lg"
//         >
//           <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
//           <p className="text-xl mb-8 text-gray-400">Let us take care of your tech needs today!</p>
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-black px-8 py-3 rounded-full text-lg hover:bg-gray-200 transition-colors duration-300"
//           >
//             Contact Us <ArrowRight className="inline-block ml-2" />
//           </motion.button>
//         </motion.section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Home;








// import React from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { Wrench, Zap, Droplet, Hammer, Clock, Shield, Star, Check } from 'lucide-react';
// import Header from './Header';
// import Footer from './Footer';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header />
//       <main>
//         {/* Hero Section */}
//         <motion.section 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ duration: 1 }}
//           className="relative h-screen flex items-center justify-center bg-black"
//         >
//           <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
//           <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
//             <source src="/path-to-your-video.mp4" type="video/mp4" />
//           </video>
//           <div className="relative z-10 text-center">
//             <h1 className="text-6xl font-extrabold mb-4">Ready to Live Smarter?</h1>
//             <p className="text-xl mb-8">Book expert home services at a moment's notice.</p>
//             <motion.button 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600 transition-colors duration-300"
//             >
//               Get Started
//             </motion.button>
//           </div>
//         </motion.section>

//         {/* Services Section */}
//         <section className="py-20 bg-gray-800">
//           <div className="container mx-auto px-4">
//             <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               <ServiceCard title="Carpentry" icon={<Hammer className="w-8 h-8" />} tracks="22 Services" />
//               <ServiceCard title="Electrical" icon={<Zap className="w-8 h-8" />} tracks="26 Services" />
//               <ServiceCard title="Plumbing" icon={<Droplet className="w-8 h-8" />} tracks="22 Services" />
//               <ServiceCard title="Appliance Repair" icon={<Wrench className="w-8 h-8" />} tracks="22 Services" />
//             </div>
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="py-20 bg-gray-900">
//           <div className="container mx-auto px-4">
//             <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <StepCard number="01" title="Choose Service" description="Select from our wide range of home services." />
//               <StepCard number="02" title="Book Appointment" description="Pick a convenient time slot for you." />
//               <StepCard number="03" title="Get it Done" description="Our expert will arrive and complete the job." />
//             </div>
//           </div>
//         </section>

//         {/* Trust and Security Section */}
//         <section className="py-20 bg-blue-900">
//           <div className="container mx-auto px-4">
//             <h2 className="text-4xl font-bold text-center mb-12">Your Trust and Security</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               <TrustFeature title="Saves You Time" icon={<Clock className="w-12 h-12" />} />
//               <TrustFeature title="For Your Safety" icon={<Shield className="w-12 h-12" />} />
//               <TrustFeature title="Best-Rated Professionals" icon={<Star className="w-12 h-12" />} />
//               <TrustFeature title="We Are Well Equipped" icon={<Check className="w-12 h-12" />} />
//               <TrustFeature title="Always In Touch" icon={<Zap className="w-12 h-12" />} />
//               <TrustFeature title="Cash-Free Facility" icon={<Check className="w-12 h-12" />} />
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// const ServiceCard = ({ title, icon, tracks }) => (
//   <Card className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
//     <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//       <p className="text-tiny uppercase font-bold text-blue-400">{title}</p>
//       <small className="text-white">{tracks}</small>
//     </CardHeader>
//     <CardBody className="overflow-visible py-2">
//       <div className="flex justify-center items-center bg-blue-500 rounded-full w-16 h-16 mx-auto mb-4">
//         {icon}
//       </div>
//     </CardBody>
//   </Card>
// );

// const StepCard = ({ number, title, description }) => (
//   <motion.div 
//     whileHover={{ scale: 1.05 }}
//     className="bg-gray-800 p-6 rounded-lg shadow-lg"
//   >
//     <div className="text-4xl font-bold text-blue-500 mb-4">{number}</div>
//     <h3 className="text-2xl font-semibold mb-2">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </motion.div>
// );

// const TrustFeature = ({ title, icon }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="text-center"
//   >
//     <div className="bg-blue-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
//       {icon}
//     </div>
//     <h3 className="text-2xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//   </motion.div>
// );

// export default Home;
