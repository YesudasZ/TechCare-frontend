
// import { Snackbar, Alert } from "@mui/material";
// import { useState, useEffect, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Cropper } from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import axios from "../../utils/axiosConfig";
// import { Orbit } from "@uiball/loaders";
// import { PencilIcon, TrashIcon, PlusIcon, XIcon, ScissorsIcon } from "@heroicons/react/outline";
// import { Tooltip } from "@nextui-org/react";

// const ServiceCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [formData, setFormData] = useState({ name: "", images: [], video: null });
//   const [currentImageIndex, setCurrentImageIndex] = useState(null);
//   const [cropper, setCropper] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/admin/service-categories");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleFormOpen = () => {
//     setIsFormOpen(true);
//     setFormData({ name: "", images: [], video: null });
//     setEditingCategory(null);
//   };

//   const handleFormClose = () => {
//     setIsFormOpen(false);
//     setCurrentImageIndex(null);
//     setCropper(null);
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const readers = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(readers)
//       .then((images) => {
//         setFormData({ ...formData, images: [...formData.images, ...images] });
//       })
//       .catch((error) => console.error("Error reading images:", error));
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setFormData({ ...formData, video: reader.result });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleCrop = () => {
//     if (cropper && currentImageIndex !== null) {
//       const croppedImage = cropper.getCroppedCanvas().toDataURL();
//       const updatedImages = formData.images.map((img, index) =>
//         index === currentImageIndex ? croppedImage : img
//       );
//       setFormData({ ...formData, images: updatedImages });
//       setCurrentImageIndex(null);
//       setCropper(null);
//     }
//   };

//   const handleDeleteImage = (index) => {
//     setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
//     if (currentImageIndex === index) {
//       setCurrentImageIndex(null);
//       setCropper(null);
//     }
//   };

//   const handleDeleteVideo = () => {
//     setFormData({ ...formData, video: null });
//   };

//   const handleEdit = (category) => {
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       images: category.imageUrl,
//       video: category.videoUrl,
//     });
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         await axios.delete(`/admin/service-categories/${id}`);
//         setSnackbar({ open: true, message: "Category deleted successfully", severity: "success" });
//         fetchCategories();
//       } catch (error) {
//         console.error("Error deleting category:", error);
//         setSnackbar({ open: true, message: "An error occurred while deleting", severity: "error" });
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const data = {
//         name: formData.name,
//         imageUrl: formData.images,
//         videoUrl: formData.video,
//         deleteImages: formData.imagesToDelete || []
//       };

//       if (editingCategory) {
//         await axios.put(`/admin/service-categories/${editingCategory._id}`, data);
//       } else {
//         await axios.post("/admin/service-categories", data);
//       }

//       setSnackbar({ open: true, message: `Category ${editingCategory ? "updated" : "created"} successfully`, severity: "success" });
//       handleFormClose();
//       fetchCategories();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSnackbar({ open: true, message: "An error occurred", severity: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-extrabold text-center mb-12 bg-clip-text bg-gradient-to-r from-black-600 to-blue-500 drop-shadow-lg">
//         Service Categories
//       </h1>

//       <div className="flex justify-end mb-8">
//         <button
//           onClick={handleFormOpen}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//           type="button" // Ensure this is not treated as a submit button
//         >
//           <PlusIcon className="h-5 w-5 inline-block mr-2" />
//           Create New
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {categories.map((category) => (
//           <div
//             key={category._id}
//             className="relative overflow-hidden bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//           >
//             <div className="relative h-56">
//               <img
//                 src={category.imageUrl[0]}
//                 alt={category.name}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
//                 <div className="flex space-x-4">
//                   <Tooltip content="Edit" placement="top">
//                     <button
//                       type="button" // Ensure this is not treated as a submit button
//                       onClick={() => handleEdit(category)}
//                       className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
//                     >
//                       <PencilIcon className="h-5 w-5" />
//                     </button>
//                   </Tooltip>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
//               <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
//               <p className="text-gray-600">Category ID: {category._id}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Transition appear show={isFormOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={handleFormClose}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-4">
//                     {editingCategory ? "Edit" : "Create"} Service Category
//                   </Dialog.Title>
//                   <button
//                     type="button" // Ensure this is not treated as a submit button
//                     onClick={handleFormClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors duration-300"
//                   >
//                     <XIcon className="h-6 w-6" />
//                   </button>
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Category Name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       required
//                     />

//                     <div className="space-y-4">
//                       <label className="block text-lg font-medium text-gray-700">Images</label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleImageChange}
//                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       />
//                       {formData.images.map((image, index) => (
//                         <div key={index} className="mt-4 relative">
//                           <img src={image} alt={`Selected ${index}`} className="w-full h-48 object-cover rounded-lg shadow-lg" />
//                           <Tooltip content="Delete Image">
//                             <button
//                               type="button" // Ensure this is not treated as a submit button
//                               onClick={() => handleDeleteImage(index)}
//                               className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
//                             >
//                               <TrashIcon className="h-5 w-5" />
//                             </button>
//                           </Tooltip>
//                           <Tooltip content="Crop Image">
//                             <button
//                               type="button" // Ensure this is not treated as a submit button
//                               onClick={() => setCurrentImageIndex(index)}
//                               className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
//                             >
//                               <ScissorsIcon className="h-5 w-5" />
//                             </button>
//                           </Tooltip>
//                         </div>
//                       ))}
//                       {currentImageIndex !== null && (
//                         <div className="mt-4 relative">
//                           <Cropper
//                             src={formData.images[currentImageIndex]}
//                             style={{ height: 300, width: "100%" }}
//                             initialAspectRatio={16 / 9}
//                             guides={false}
//                             crop={handleCrop}
//                             onInitialized={(instance) => setCropper(instance)}
//                           />
//                           <button
//                             type="button" // Ensure this is not treated as a submit button
//                             onClick={handleCrop}
//                             className="absolute top-2 right-2 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300"
//                           >
//                             Crop Image
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       <label className="block text-lg font-medium text-gray-700">Video</label>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoChange}
//                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//                       />
//                       {formData.video && (
//                         <div className="mt-4 relative">
//                           <video src={formData.video} controls className="w-full rounded-lg shadow-lg" />
//                           <Tooltip content="Delete Video">
//                             <button
//                               type="button" // Ensure this is not treated as a submit button
//                               onClick={handleDeleteVideo}
//                               className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
//                             >
//                               <TrashIcon className="h-5 w-5" />
//                             </button>
//                           </Tooltip>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex justify-end space-x-4">
//                       <button
//                         type="button" // Ensure this is not treated as a submit button
//                         onClick={handleFormClose}
//                         className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit" // Ensure this is the only submit button
//                         disabled={isLoading}
//                         className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {isLoading ? <Orbit size={24} color="#fff" /> : "Submit"}
//                       </button>
//                     </div>
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default ServiceCategories;



// import { useState, useEffect, Fragment } from "react";
// import { Snackbar, Alert } from "@mui/material";
// import { Dialog, Transition } from "@headlessui/react";
// import { Cropper } from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import axios from "../../utils/axiosConfig";
// import { Orbit } from "@uiball/loaders";
// import { PencilIcon, TrashIcon, PlusIcon, XIcon, ScissorsIcon } from "@heroicons/react/outline";
// import { Tooltip } from "@nextui-org/react";

// const ServiceCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [formData, setFormData] = useState({ name: "", images: [], video: null });
//   const [currentImageIndex, setCurrentImageIndex] = useState(null);
//   const [cropper, setCropper] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/admin/service-categories");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleFormOpen = () => {
//     setIsFormOpen(true);
//     setFormData({ name: "", images: [], video: null });
//     setEditingCategory(null);
//   };

//   const handleFormClose = () => {
//     setIsFormOpen(false);
//     setCurrentImageIndex(null);
//     setCropper(null);
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const readers = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(readers)
//       .then((images) => {
//         setFormData({ ...formData, images: [...formData.images, ...images] });
//       })
//       .catch((error) => console.error("Error reading images:", error));
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setFormData({ ...formData, video: reader.result });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleCrop = () => {
//     if (cropper && currentImageIndex !== null) {
//       const croppedImage = cropper.getCroppedCanvas().toDataURL();
//       const updatedImages = formData.images.map((img, index) =>
//         index === currentImageIndex ? croppedImage : img
//       );
//       setFormData({ ...formData, images: updatedImages });
//       setCurrentImageIndex(null);
//       setCropper(null);
//     }
//   };

//   const handleDeleteImage = (index) => {
//     setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
//     if (currentImageIndex === index) {
//       setCurrentImageIndex(null);
//       setCropper(null);
//     }
//   };

//   const handleDeleteVideo = () => {
//     setFormData({ ...formData, video: null });
//   };

//   const handleEdit = (category) => {
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       images: category.imageUrl,
//       video: category.videoUrl,
//     });
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         await axios.delete(`/admin/service-categories/${id}`);
//         setSnackbar({ open: true, message: "Category deleted successfully", severity: "success" });
//         fetchCategories();
//       } catch (error) {
//         console.error("Error deleting category:", error);
//         setSnackbar({ open: true, message: "An error occurred while deleting", severity: "error" });
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const data = {
//         name: formData.name,
//         imageUrl: formData.images,
//         videoUrl: formData.video,
//         deleteImages: formData.imagesToDelete || []
//       };

//       if (editingCategory) {
//         await axios.put(`/admin/service-categories/${editingCategory._id}`, data);
//       } else {
//         await axios.post("/admin/service-categories", data);
//       }

//       setSnackbar({ open: true, message: `Category ${editingCategory ? "updated" : "created"} successfully`, severity: "success" });
//       handleFormClose();
//       fetchCategories();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSnackbar({ open: true, message: "An error occurred", severity: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
//         Service Categories
//       </h1>

//       <div className="flex justify-end mb-8">
//         <button
//           onClick={handleFormOpen}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//         >
//           <PlusIcon className="h-5 w-5 inline-block mr-2" />
//           Create New
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((category) => (
//           <div
//             key={category._id}
//             className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//           >
//             <div className="relative h-40">
//               <img
//                 src={category.imageUrl[0]}
//                 alt={category.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                 <Tooltip content="Edit" placement="top">
//                   <button
//                     onClick={() => handleEdit(category)}
//                     className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300 mr-2"
//                   >
//                     <PencilIcon className="h-5 w-5" />
//                   </button>
//                 </Tooltip>
//                 <Tooltip content="Delete" placement="top">
//                   <button
//                     onClick={() => handleDelete(category._id)}
//                     className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
//                   >
//                     <TrashIcon className="h-5 w-5" />
//                   </button>
//                 </Tooltip>
//               </div>
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h2>
//               <p className="text-sm text-gray-600">ID: {category._id}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Transition appear show={isFormOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={handleFormClose}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-4">
//                     {editingCategory ? "Edit" : "Create"} Service Category
//                   </Dialog.Title>
//                   <button
//                     onClick={handleFormClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors duration-300"
//                   >
//                     <XIcon className="h-6 w-6" />
//                   </button>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="Category Name"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       required
//                     />

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleImageChange}
//                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       />
//                       <div className="mt-2 grid grid-cols-3 gap-2">
//                         {formData.images.map((image, index) => (
//                           <div key={index} className="relative">
//                             <img src={image} alt={`Selected ${index}`} className="w-full h-24 object-cover rounded-lg" />
//                             <div className="absolute top-1 right-1 flex space-x-1">
//                               <Tooltip content="Delete Image">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleDeleteImage(index)}
//                                   className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-300"
//                                 >
//                                   <TrashIcon className="h-3 w-3" />
//                                 </button>
//                               </Tooltip>
//                               <Tooltip content="Crop Image">
//                                 <button
//                                   type="button"
//                                   onClick={() => setCurrentImageIndex(index)}
//                                   className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors duration-300"
//                                 >
//                                   <ScissorsIcon className="h-3 w-3" />
//                                 </button>
//                               </Tooltip>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {currentImageIndex !== null && (
//                       <div className="mt-4 relative">
//                         <Cropper
//                           src={formData.images[currentImageIndex]}
//                           style={{ height: 200, width: "100%" }}
//                           initialAspectRatio={16 / 9}
//                           guides={false}
//                           crop={handleCrop}
//                           onInitialized={(instance) => setCropper(instance)}
//                         />
//                         <button
//                           type="button"
//                           onClick={handleCrop}
//                           className="mt-2 bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition-colors duration-300 text-sm"
//                         >
//                           Crop Image
//                         </button>
//                       </div>
//                     )}

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoChange}
//                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//                       />
//                       {formData.video && (
//                         <div className="mt-2 relative">
//                           <video src={formData.video} controls className="w-full h-32 rounded-lg" />
//                           <Tooltip content="Delete Video">
//                             <button
//                               type="button"
//                               onClick={handleDeleteVideo}
//                               className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-300"
//                             >
//                               <TrashIcon className="h-3 w-3" />
//                             </button>
//                           </Tooltip>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex justify-end space-x-3 mt-6">
//                       <button
//                         type="button"
//                         onClick={handleFormClose}
//                         className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300 text-sm"
//                       >
//                         Cancel
//                       </button>
//                       <button type="submit"
//                         disabled={isLoading}
//                         className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                       >
//                         {isLoading ? <Orbit size={20} color="#fff" /> : "Submit"}
//                       </button>
//                     </div>
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default ServiceCategories;




import { Snackbar, Alert } from "@mui/material";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "../../utils/axiosConfig";
import { Orbit } from "@uiball/loaders";
import { PencilIcon, TrashIcon, PlusIcon, XIcon, ScissorsIcon } from "@heroicons/react/outline";
import { Tooltip } from "@nextui-org/react";

const ServiceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [formData, setFormData] = useState({ name: "", images: [], video: null });
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/admin/service-categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
    setFormData({ name: "", images: [], video: null });
    setEditingCategory(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentImageIndex(null);
    setCropper(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((images) => {
        setFormData({ ...formData, images: [...formData.images, ...images] });
      })
      .catch((error) => console.error("Error reading images:", error));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, video: reader.result });
    };
   

reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    if (cropper && currentImageIndex !== null) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      const updatedImages = formData.images.map((img, index) =>
        index === currentImageIndex ? croppedImage : img
      );
      setFormData({ ...formData, images: updatedImages });
      setCurrentImageIndex(null);
      setCropper(null);
    }
  };

  const handleDeleteImage = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
    if (currentImageIndex === index) {
      setCurrentImageIndex(null);
      setCropper(null);
    }
  };

  const handleDeleteVideo = () => {
    setFormData({ ...formData, video: null });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      images: category.imageUrl,
      video: category.videoUrl,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/admin/service-categories/${id}`);
        setSnackbar({ open: true, message: "Category deleted successfully", severity: "success" });
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        setSnackbar({ open: true, message: "An error occurred while deleting", severity: "error" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        name: formData.name,
        imageUrl: formData.images,
        videoUrl: formData.video,
        deleteImages: formData.imagesToDelete || []
      };

      if (editingCategory) {
        await axios.put(`/admin/service-categories/${editingCategory._id}`, data);
      } else {
        await axios.post("/admin/service-categories", data);
      }

      setSnackbar({ open: true, message: `Category ${editingCategory ? "updated" : "created"} successfully`, severity: "success" });
      handleFormClose();
      fetchCategories();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbar({ open: true, message: "An error occurred", severity: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-center mb-12 bg-clip-text bg-gradient-to-r from-black-600 to-blue-500 drop-shadow-lg">
        Service Categories
      </h1>

      <div className="flex justify-end mb-8">
        <button
          onClick={handleFormOpen}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          type="button"
        >
          <PlusIcon className="h-5 w-5 inline-block mr-2" />
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative overflow-hidden bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-56">
              <img
                src={category.imageUrl[0]}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
                <div className="flex space-x-4">
                  <Tooltip content="Edit" placement="top">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
              <p className="text-gray-600">Category ID: {category._id}</p>
            </div>
          </div>
        ))}
      </div>

      <Transition appear show={isFormOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleFormClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-4">
                    {editingCategory ? "Edit" : "Create"} Service Category
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={handleFormClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors duration-300"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Category Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      required
                    />

                    <div className="space-y-4">
                      <label className="block text-lg font-medium text-gray-700">Images</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img src={image} alt={`Selected ${index}`} className="w-full h-32 object-cover rounded-lg shadow-lg" />
                            <Tooltip content="Delete Image">
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(index)}
                                className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </Tooltip>
                            <Tooltip content="Crop Image">
                              <button
                                type="button"
                                onClick={() => setCurrentImageIndex(index)}
                                className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                              >
                                <ScissorsIcon className="h-5 w-5" />
                              </button>
                            </Tooltip>
                          </div>
                        ))}
                      </div>
                      {currentImageIndex !== null && (
                        <div className="mt-4 relative">
                          <Cropper
                            src={formData.images[currentImageIndex]}
                            style={{ height: 200, width: "100%" }}
                            initialAspectRatio={16 / 9}
                            guides={false}
                            crop={handleCrop}
                            onInitialized={(instance) => setCropper(instance)}
                          />
                          <button
                            type="button"
                            onClick={handleCrop}
                            className="absolute top-2 right-2 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300"
                          >
                            Crop Image
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-lg font-medium text-gray-700">Video</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                      {formData.video && (
                        <div className="mt-4 relative">
                          <video src={formData.video} controls className="w-full h-48 rounded-lg shadow-lg" />
                          <Tooltip content="Delete Video">
                            <button
                              type="button"
                              onClick={handleDeleteVideo}
                              className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={handleFormClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? <Orbit size={24} color="#fff" /> : "Submit"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
    </div>
  );
};

export default ServiceCategories;
