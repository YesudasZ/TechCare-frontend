// import React from 'react';

// function Services() {
//   return (
//     <div className="bg-gray-100">
//       <header className="bg-gray-900 text-white py-10">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold">Travel memories you'll never forget</h1>
//           <p className="text-lg mt-4">Originals by GetYourGuide</p>
//           <p className="text-lg mt-2">Magical Music Tour of London with Paloma Faith</p>
//           {/* <a href="#" className="text-blue-500 hover:underline mt-4">Learn more ></a> */}
//         </div>
//       </header>
//       <section className="container mx-auto px-4 py-10">
//         <div className="flex justify-between items-center mb-4">
//           <button className="bg-gray-200 px-4 py-2 rounded-md shadow-md">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             Culture
//           </button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md shadow-md">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.75 1.75 0 01-3.5 0V5.882C5.73 5.121 7.5 4.125 9.5 3.803c4.02-.27 7.5 1.607 7.5 5.002V19.24a1.75 1.75 0 01-3.5 0V11a.25.25 0 00-.25.248c-.342.084-.717.217-1 .371V19.24a2.25 2.25 0 01-4.5 0V11a.25.25 0 00-.25-.248c-.343-.084-.716-.217-1-.371V5.882" />
//             </svg>
//             Food
//           </button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md shadow-md">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             Nature
//           </button>
//           <button className="bg-gray-200 px-4 py-2 rounded-md shadow-md">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l3 3l3-3m-3 0h-3" />
//             </svg>
//             Sports
//           </button>
//         </div>
//         <h2 className="text-2xl font-bold mb-4">Unforgettable cultural experiences</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">WATER ACTIVITY</h3>
//             <p className="text-base mb-2">Portland: Best of Maine Lighthouse Scenic Cruise</p>
//             <p className="text-sm mb-2">105 minutes</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.8 (300)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 23,964 per person</p>
//           </div>
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">GUIDED TOUR</h3>
//             <p className="text-base mb-2">Cambridge: Harvard University Student-Guided Walking Tour</p>
//             <p className="text-sm mb-2">70 minutes</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.4 (296)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 21,929 per person</p>
//           </div>
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">GUIDED TOUR</h3>
//             <p className="text-base mb-2">Oxford: University and City Walking Tour with Alumni Guide</p>
//             <p className="text-sm mb-2">2 hours - Skip the line</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.7 (3,077)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 23,304 per person</p>
//           </div>
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">ADVENTURE</h3>
//             <p className="text-base mb-2">Monument Valley: Sunset Tour with Navajo Guide</p>
//             <p className="text-sm mb-2">3 hours</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.8 (700)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 26,676 per person</p>
//           </div>
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">GUIDED TOUR</h3>
//             <p className="text-base mb-2">Dubrovnik: The Ultimate Game of Thrones Tour</p>
//             <p className="text-sm mb-2">2 hours</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.8 (2,200)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 22,318 per person</p>
//           </div>
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">GUIDED TOUR</h3>
//             <p className="text-base mb-2">London: Jack the Ripper Guided Walking Tour</p>
//             <p className="text-sm mb-2">2 hours</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.7 (3,380)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 2826 per person</p>
//           </div>
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">GUIDED TOUR</h3>
//             <p className="text-base mb-2">Athens: Cape Sounion and Temple of Poseidon Sunset Day Trip</p>
//             <p className="text-sm mb-2">5.5 hours - Optional audio guide</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.8 (4,243)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 22,603 per person</p>
//           </div>
//           <div className="bg-white rounded-md shadow-md p-4">
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-bold">Originals by GetYourGuide</p>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.45l5 5 9-9m-4.5 4.5l9-9 5 5" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">GUIDED TOUR</h3>
//             <p className="text-base mb-2">Berlin: Hidden Backyards Guided Walking Tour</p>
//             <p className="text-sm mb-2">2 hours</p>
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 001.45.526c.31.31.555.681.555 1.076v10.924a1 1 0 001.45.526l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.027-2.287a1 1 0 00-1.45-.526v-10.924a1 1 0 00-1.45-.526l-1.519-4.674zm1.049 6.326a6.67 6.67 0 01-1.24.555 3.44 3.44 0 00-1.119-.555l-.82-.82 1.097-3.291a1 1 0 00.526-1.45l4.674-1.518c.921-.3 1.688.755 1.118 1.538l-2.287 3.027a1 1 0 00-.526 1.45l-3.291 1.097-.82.82z" />
//               </svg>
//               <p className="text-sm ml-2">4.8 (3,000)</p>
//             </div>
//             <p className="text-sm font-bold mt-2">From 21,854 per person</p>
//             <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">Likely to sell out</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Services;




// /src/components/TravelMemories.jsx

// import React from 'react';

// const Services = () => {
//   return (
//     <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/path-to-your-image/image.png')` }}>
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
//         <div className="text-center text-white">
//           <h1 className="text-4xl md:text-6xl font-bold">Travel memories you'll never forget</h1>
//           <p className="mt-4 text-lg md:text-xl">Raise a glass to Barcelona's best vineyards</p>
//           <a href="#" className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-full font-semibold">Learn more</a>
//         </div>
//       </div>

//       <div className="absolute bottom-0 w-full flex justify-center bg-gray-900 bg-opacity-75 py-4">
//         <div className="flex space-x-8 text-white text-lg">
//           <a href="#" className="hover:text-gray-400">Culture</a>
//           <a href="#" className="hover:text-gray-400">Food</a>
//           <a href="#" className="hover:text-gray-400">Nature</a>
//           <a href="#" className="hover:text-gray-400">Sports</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;

// import React from 'react';
// import banner from "../../pictures/Designer (9).png";

// const Services = () => {
//   return (
//     <div className="relative bg-cover bg-center h-[400px] text-white flex flex-col justify-center items-center text-center"
//          style={{ backgroundImage: banner }}>
//       <div className="z-10">
//         <h1 className="text-4xl font-bold"></h1>
//         <p className="text-lg my-4">Raise a glass to Barcelona's best vineyards</p>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-black bg-opacity-60">
//         <a href="#" className="text-white py-4 px-6 flex items-center font-semibold border-b-4 border-transparent hover:border-white">
//           <span className="mr-2 text-xl">🏛️</span> Culture
//         </a>
//         <a href="#" className="text-white py-4 px-6 flex items-center font-semibold border-b-4 border-white">
//           <span className="mr-2 text-xl">🍴</span> 
//         </a>
//         <a href="#" className="text-white py-4 px-6 flex items-center font-semibold border-b-4 border-transparent hover:border-white">
//           <span className="mr-2 text-xl">🌳</span> Nature
//         </a>
//         <a href="#" className="text-white py-4 px-6 flex items-center font-semibold border-b-4 border-transparent hover:border-white">
//           <span className="mr-2 text-xl">⚽</span> Sports
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Services;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaLandmark, FaUtensils, FaTree, FaFutbol } from 'react-icons/fa';

// const Services = () => {
//   const services = [
//     { icon: <FaLandmark />, name: 'Culture', color: 'bg-blue-500' },
//     { icon: <FaUtensils />, name: 'Cuisine', color: 'bg-green-500' },
//     { icon: <FaTree />, name: 'Nature', color: 'bg-yellow-500' },
//     { icon: <FaFutbol />, name: 'Sports', color: 'bg-red-500' },
//   ];

//   return (
//     <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-8">Explore Barcelona</h2>
//         <p className="text-xl text-center mb-12">Raise a glass to Barcelona's best experiences</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`${service.color} rounded-lg shadow-lg p-6 text-center transition-all duration-300 ease-in-out`}
//             >
//               <div className="text-4xl mb-4">{service.icon}</div>
//               <h3 className="text-xl font-semibold">{service.name}</h3>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;

// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaLandmark, FaUtensils, FaTree, FaFutbol } from 'react-icons/fa';
// import banner from "../../pictures/Designer (9).png";

// const Services = () => {
//   const services = [
//     { icon: <FaLandmark />, name: 'Culture', color: 'bg-blue-500' },
//     { icon: <FaUtensils />, name: 'Cuisine', color: 'bg-green-500' },
//     { icon: <FaTree />, name: 'Nature', color: 'bg-yellow-500' },
//     { icon: <FaFutbol />, name: 'Sports', color: 'bg-red-500' },
//   ];

//   return (
//     <div className="relative h-[800px] text-white flex flex-col justify-center items-center text-center">
//       <img src={banner} alt="Barcelona" className="absolute inset-0 w-full h-full object-cover" />
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative z-10 container mx-auto px-4">
//         <h2 className="text-4xl font-bold mb-8">Explore Barcelona</h2>
//         <p className="text-xl mb-12">Raise a glass to Barcelona's best experiences</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`${service.color} rounded-lg shadow-lg p-6 text-center transition-all duration-300 ease-in-out bg-opacity-80`}
//             >
//               <div className="text-4xl mb-4">{service.icon}</div>
//               <h3 className="text-xl font-semibold">{service.name}</h3>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;



//** real one */

// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaLandmark, FaUtensils, FaTree, FaFutbol } from 'react-icons/fa';
// import banner from "../../pictures/Designer (9).png";

// const Services = () => {
//   const services = [
//     { icon: <FaLandmark />, name: 'Culture', color: 'bg-blue-500' },
//     { icon: <FaUtensils />, name: 'Cuisine', color: 'bg-green-500' },
//     { icon: <FaTree />, name: 'Nature', color: 'bg-yellow-500' },
//     { icon: <FaFutbol />, name: 'Sports', color: 'bg-red-500' },
//   ];

//   return (
//     <div className="relative h-[400px] text-white flex flex-col justify-center items-center text-center">
//       <img src={banner} alt="Barcelona" className="absolute inset-0 w-full h-full object-cover" />
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Content on top */}
//       <div className="relative z-10 container mx-auto px-4">
//         <h2 className="text-4xl font-bold mb-8">Explore Barcelona</h2>
//         <p className="text-xl mb-12">Raise a glass to Barcelona's best experiences</p>
//       </div>

//       {/* Categories at the bottom */}
//       <div className="absolute bottom-0 left-0 w-full flex justify-center items-center space-x-8 p-4 bg-gray-900 bg-opacity-70">
//         {services.map((service, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.1 }}
//             className="flex flex-col items-center text-white"
//           >
//             <div className="text-3xl mb-2">{service.icon}</div>
//             <span className="text-sm font-medium">{service.name}</span>
//           </motion.div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Services;

//** end */



// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaLandmark, FaUtensils, FaTree, FaFutbol } from 'react-icons/fa';
// import banner from "../../pictures/Designer (9).png";

// const Services = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const services = [
//     { icon: <FaLandmark />, name: 'Electrical', color: 'bg-blue-500', image: '/path/to/culture-image.jpg' },
//     { icon: <FaUtensils />, name: 'Appliance', color: 'bg-green-500', image: '/path/to/cuisine-image.jpg' },
//     { icon: <FaTree />, name: 'Carpentry', color: 'bg-yellow-500', image: '/path/to/nature-image.jpg' },
//     { icon: <FaFutbol />, name: 'Plumbing', color: 'bg-red-500', image: '/path/to/sports-image.jpg' },
//   ];

//   const handleCategoryClick = (index) => {
//     setSelectedCategory(index);
//   };

// //   const backgroundImage = selectedCategory !== null ? services[selectedCategory].image : '/path/to/default-image.jpg';

//   return (
//     <div className="relative h-[400px] text-white flex flex-col justify-center items-center text-center"
//          >
//              <img src={banner} alt="Barcelona" className="absolute inset-0 w-full h-full object-cover" />
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       <div className="relative z-10 container mx-auto px-4">
//         <h2 className="text-4xl font-bold mb-8">Explore Barcelona</h2>
//         <p className="text-xl mb-12">Raise a glass to Barcelona's best experiences</p>
//       </div>

//       <div className="absolute bottom-0 left-0 w-full flex justify-center items-center space-x-8  ">
//         {services.map((service, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.1 }}
//             onClick={() => handleCategoryClick(index)}
//             className={`flex flex-col items-center cursor-pointer ${selectedCategory === index ? 'bg-white bg-opacity-100 rounded- p-2' : ''}`}
//           >
//             <div className={`text-xl mb-2 ${selectedCategory === index ? 'text-black' : ''}`}>{service.icon}</div>
//             <span className={`text-3xl font-medium ${selectedCategory === index ? 'text-black' : ''}`}>{service.name}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;

//**Last */

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaLandmark, FaUtensils, FaTree, FaFutbol } from 'react-icons/fa';
// import banner from "../../pictures/Designer (9).png";

// const Services = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const services = [
//     { icon: <FaLandmark />, name: 'Electrical', color: 'bg-blue-500', image: '/path/to/culture-image.jpg' },
//     { icon: <FaUtensils />, name: 'Appliance', color: 'bg-green-500', image: '/path/to/cuisine-image.jpg' },
//     { icon: <FaTree />, name: 'Carpentry', color: 'bg-yellow-500', image: '/path/to/nature-image.jpg' },
//     { icon: <FaFutbol />, name: 'Plumbing', color: 'bg-red-500', image: '/path/to/sports-image.jpg' },
//   ];

//   const handleCategoryClick = (index) => {
//     setSelectedCategory(index);
//   };

// //   const backgroundImage = selectedCategory !== null ? services[selectedCategory].image : '/path/to/default-image.jpg';

//   return (
//     <div className="relative h-[400px] text-white flex flex-col justify-center items-center text-center"
//          >
//              <img src={banner} alt="Barcelona" className="absolute inset-0 w-full h-full object-cover" />
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       <div className="relative z-10 container mx-auto px-4">
//         <h2 className="text-4xl font-bold mb-8">Explore Barcelona</h2>
//         <p className="text-xl mb-12">Raise a glass to Barcelona's best experiences</p>
//       </div>

//       <div className="absolute bottom-0 left-0 w-full flex justify-center items-center space-x-8  ">
//         {services.map((service, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.1 }}
//             onClick={() => handleCategoryClick(index)}
//             className={`flex flex-col items-center cursor-pointer ${selectedCategory === index ? 'bg-white bg-opacity-100 rounded- p-2' : ''}`}
//           >
//             <div className={`text-xl mb-2 ${selectedCategory === index ? 'text-black' : ''}`}>{service.icon}</div>
//             <span className={`text-3xl font-medium ${selectedCategory === index ? 'text-black' : ''}`}>{service.name}</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCompass, FiCoffee, FiActivity } from 'react-icons/fi';
import banner from "../../pictures/Designer (9).png";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const services = [
    { icon: <FiCompass />, name: 'Explore', color: 'from-blue-400 to-indigo-600' },
    { icon: <FiCoffee />, name: 'Dine', color: 'from-green-400 to-teal-600' },
    { icon: <FiActivity />, name: 'Nature', color: 'from-yellow-400 to-orange-600' },
    { icon: <FiActivity />, name: 'Activities', color: 'from-red-400 to-pink-600' },
  ];

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

  return (
    <div className="relative h-screen text-white overflow-hidden">
      <motion.img 
        src={banner} 
        alt="Barcelona" 
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.h2 
          className="text-6xl font-bold mb-8 tracking-wide"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Discover Barcelona
        </motion.h2>
        <motion.p 
          className="text-2xl mb-16 font-light max-w-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Immerse yourself in the city's vibrant experiences
        </motion.p>

        <div className="flex justify-center items-center space-x-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(index)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <motion.div 
                className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                  selectedCategory === index 
                  ? `bg-gradient-to-br ${service.color} shadow-lg` 
                  : 'bg-white/20 backdrop-blur-sm'
                }`}
                whileHover={{ rotate: 15 }}
              >
                <div className={`text-4xl ${selectedCategory === index ? 'text-white' : ''}`}>{service.icon}</div>
              </motion.div>
              <span className={`text-lg font-medium ${selectedCategory === index ? 'text-white' : 'text-gray-300'}`}>
                {service.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
