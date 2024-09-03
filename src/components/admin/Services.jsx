// import { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import axios from '../../utils/axiosConfig';  // Assuming this is your Axios instance
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import { Ring } from '@uiball/loaders';

// const ServiceTypeForm = ({ onSubmit, initialData, categories }) => {
//   const [formData, setFormData] = useState(initialData || {
//     name: '',
//     rate: '',
//     description: '',
//     serviceCategory: '',
//     imageUrl: [],
//   });
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [cropper, setCropper] = useState(null);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setCroppedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCrop = () => {
//     if (cropper) {
//       const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
//       setFormData({ ...formData, imageUrl: [...formData.imageUrl, croppedDataUrl] });
//       setCroppedImage(null);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         name="name"
//         value={formData.name}
//         onChange={handleInputChange}
//         placeholder="Service Type Name"
//         required
//       />
//       <Input
//         name="rate"
//         type="number"
//         value={formData.rate}
//         onChange={handleInputChange}
//         placeholder="Rate"
//         required
//       />
//       <Textarea
//         name="description"
//         value={formData.description}
//         onChange={handleInputChange}
//         placeholder="Description"
//       />
//       <select
//         name="serviceCategory"
//         value={formData.serviceCategory}
//         onChange={handleInputChange}
//         className="w-full p-2 border rounded"
//         required
//       >
//         <option value="">Select a category</option>
//         {categories.map((category) => (
//           <option key={category._id} value={category._id}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//       <Input
//         type="file"
//         onChange={handleImageSelect}
//         accept="image/*"
//       />
//       {croppedImage && (
//         <div>
//           <Cropper
//             src={croppedImage}
//             style={{ height: 300, width: '100%' }}
//             initialAspectRatio={16 / 9}
//             guides={false}
//             onInitialized={(instance) => setCropper(instance)}
//           />
//           <Button onClick={handleCrop} className="mt-2">Crop Image</Button>
//         </div>
//       )}
//       {formData.imageUrl.map((img, index) => (
//         <div key={index} className="relative">
//           <img src={img} alt={`Preview ${index}`} className="w-full h-32 object-cover" />
//           <Button
//             onClick={() => setFormData({ ...formData, imageUrl: formData.imageUrl.filter((_, i) => i !== index) })}
//             className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//           >
//             <Trash2 size={16} />
//           </Button>
//         </div>
//       ))}
//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };

// const Services = () => {
//   const [serviceTypes, setServiceTypes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingServiceType, setEditingServiceType] = useState(null);
//   const [alertMessage, setAlertMessage] = useState('');

//   useEffect(() => {
//     fetchServiceTypes();
//     fetchCategories();
//   }, []);

//   const fetchServiceTypes = async () => {
//     try {
//       const response = await axios.get('/admin/service-types');
//       setServiceTypes(response.data);
//     } catch (error) {
//       console.error('Error fetching service types:', error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('/admin/service-categories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleSubmit = async (formData) => {
//     setIsLoading(true);
//     try {
//       if (editingServiceType) {
//         await axios.put(`/admin/service-types/${editingServiceType._id}`, formData);
//         setAlertMessage('Service type updated successfully');
//       } else {
//         await axios.post('/admin/service-types', formData);
//         setAlertMessage('Service type created successfully');
//       }
//       fetchServiceTypes();
//       setIsFormVisible(false);
//       setEditingServiceType(null);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setAlertMessage('An error occurred. Please try again.');
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center text-black mb-8 shadow-lg p-4 rounded-lg">
//         Services Management
//       </h1>
      
//       <Button 
//         onClick={() => setIsFormVisible(!isFormVisible)}
//         className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
//       >
//         <Plus className="mr-2" /> Create New Service Type
//       </Button>

//       {alertMessage && (
//         <Alert className="mb-4">
//           <AlertDescription>{alertMessage}</AlertDescription>
//         </Alert>
//       )}

//       {isFormVisible && (
//         <Card className="mb-8">
//           <CardContent>
//             <ServiceTypeForm 
//               onSubmit={handleSubmit} 
//               categories={categories}
//               initialData={editingServiceType}
//             />
//           </CardContent>
//         </Card>
//       )}

//       {isLoading && (
//         <div className="flex justify-center items-center">
//           <Ring size={40} lineWeight={5} speed={2} color="black" />
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {serviceTypes.map((serviceType) => (
//           <Card key={serviceType._id} className="overflow-hidden">
//             <CardContent className="p-0">
//               {serviceType.imageUrl && serviceType.imageUrl.length > 0 && (
//                 <img 
//                   src={serviceType.imageUrl[0]} 
//                   alt={serviceType.name} 
//                   className="w-full h-48 object-cover"
//                 />
//               )}
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-2">{serviceType.name}</h3>
//                 <p className="text-gray-600">{serviceType.description}</p>
//                 <p className="text-gray-800 font-bold mt-2">${serviceType.rate}</p>
//               </div>
//             </CardContent>
//             <CardFooter className="bg-gray-100 flex justify-end">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button
//                     onClick={() => setEditingServiceType(serviceType)}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white"
//                   >
//                     <Edit className="mr-2" /> Edit
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Edit Service Type</DialogTitle>
//                   </DialogHeader>
//                   <ServiceTypeForm 
//                     onSubmit={handleSubmit} 
//                     initialData={serviceType}
//                     categories={categories}
//                   />
//                 </DialogContent>
//               </Dialog>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;


// import { useState, useEffect } from 'react';
// import axios from '../../utils/axiosConfig';
// import { Cropper } from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import { AlertCircle, Edit, Trash2, Plus, X } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';

// export default function Services() {
//   const [serviceTypes, setServiceTypes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [formData, setFormData] = useState({
//     serviceCategory: '',
//     name: '',
//     rate: '',
//     description: '',
//     imageUrl: [],
//   });
//   const [cropData, setCropData] = useState(null);
//   const [cropper, setCropper] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchServiceTypes();
//     fetchCategories();
//   }, []);

//   const fetchServiceTypes = async () => {
//     try {
//       const response = await axios.get('/admin/service-types');
//       setServiceTypes(response.data);
//     } catch (error) {
//       setMessage('Error fetching service types');
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('/admin/service-categories');
//       setCategories(response.data);
//     } catch (error) {
//       setMessage('Error fetching categories');
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     e.preventDefault();
//     let files;
//     if (e.dataTransfer) {
//       files = e.dataTransfer.files;
//     } else if (e.target) {
//       files = e.target.files;
//     }
//     const reader = new FileReader();
//     reader.onload = () => {
//       setCropData(reader.result);
//     };
//     reader.readAsDataURL(files[0]);
//   };

//   const getCropData = () => {
//     if (cropper) {
//       const croppedCanvas = cropper.getCroppedCanvas();
//       setFormData({
//         ...formData,
//         imageUrl: [...formData.imageUrl, croppedCanvas.toDataURL()],
//       });
//       setCropData(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       if (editingId) {
//         await axios.put(`/admin/service-types/${editingId}`, formData);
//         setMessage('Service type updated successfully');
//       } else {
//         await axios.post('/admin/service-types', formData);
//         setMessage('Service type created successfully');
//       }
//       fetchServiceTypes();
//       setIsFormVisible(false);
//       setFormData({ serviceCategory: '', name: '', rate: '', description: '', imageUrl: [] });
//       setEditingId(null);
//     } catch (error) {
//       setMessage('Error processing request');
//     }
//     setIsLoading(false);
//   };

//   const handleEdit = (serviceType) => {
//     setFormData(serviceType);
//     setEditingId(serviceType._id);
//     setIsFormVisible(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this service type?')) {
//       try {
//         await axios.delete(`/admin/service-types/${id}`);
//         setMessage('Service type deleted successfully');
//         fetchServiceTypes();
//       } catch (error) {
//         setMessage('Error deleting service type');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center text-black mb-8 shadow-lg p-4 rounded-lg">
//         Services Management
//       </h1>

//       <Button
//         onClick={() => setIsFormVisible(!isFormVisible)}
//         className="mb-6 bg-blue-500 hover:bg-blue-600 text-white"
//       >
//         {isFormVisible ? 'Cancel' : 'Create New Service Type'}
//       </Button>

//       {message && (
//         <Alert variant="default" className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{message}</AlertDescription>
//         </Alert>
//       )}

//       {isFormVisible && (
//         <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
//           <div className="grid grid-cols-1 gap-6">
//             <div>
//               <Label htmlFor="serviceCategory">Service Category</Label>
//               <Select
//                 name="serviceCategory"
//                 value={formData.serviceCategory}
//                 onValueChange={(value) => setFormData({ ...formData, serviceCategory: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category._id} value={category._id}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="rate">Rate</Label>
//               <Input
//                 type="number"
//                 name="rate"
//                 value={formData.rate}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={4}
//               />
//             </div>
//             <div>
//               <Label htmlFor="image">Image</Label>
//               <Input type="file" onChange={handleImageChange} accept="image/*" />
//               {cropData && (
//                 <div className="mt-4">
//                   <Cropper
//                     src={cropData}
//                     style={{ height: 300, width: '100%' }}
//                     initialAspectRatio={16 / 9}
//                     guides={false}
//                     crop={(e) => console.log(e.detail)}
//                     onInitialized={(instance) => setCropper(instance)}
//                   />
//                   <Button onClick={getCropData} className="mt-2">
//                     Crop Image
//                   </Button>
//                 </div>
//               )}
//               {formData.imageUrl.length > 0 && (
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {formData.imageUrl.map((url, index) => (
//                     <div key={index} className="relative">
//                       <img src={url} alt="preview" className="w-24 h-24 object-cover rounded" />
//                       <button
//                         onClick={() => {
//                           setFormData({
//                             ...formData,
//                             imageUrl: formData.imageUrl.filter((_, i) => i !== index),
//                           });
//                         }}
//                         className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           <Button type="submit" className="mt-6 bg-green-500 hover:bg-green-600 text-white">
//             {isLoading ? (
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//             ) : (
//               'Submit'
//             )}
//           </Button>
//         </form>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {serviceTypes.map((serviceType) => (
//           <Card key={serviceType._id} className="overflow-hidden">
//             <img
//               src={serviceType.imageUrl[0] || '/placeholder-image.jpg'}
//               alt={serviceType.name}
//               className="w-full h-48 object-cover"
//             />
//             <CardContent className="p-4">
//               <h3 className="text-lg font-semibold mb-2">{serviceType.name}</h3>
//               <p className="text-gray-600 mb-2">Rate: ${serviceType.rate}</p>
//               <p className="text-sm text-gray-500">{serviceType.description}</p>
//             </CardContent>
//             <CardFooter className="bg-gray-50 p-4 flex justify-between">
//               <Button
//                 onClick={() => handleEdit(serviceType)}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white"
//               >
//                 <Edit size={16} className="mr-2" /> Edit
//               </Button>
//               <Button
//                 onClick={() => handleDelete(serviceType._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white"
//               >
//                 <Trash2 size={16} className="mr-2" /> Delete
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, Fragment } from "react";
// import { Snackbar, Alert } from "@mui/material";
// import { Dialog, Transition } from "@headlessui/react";
// import { Cropper } from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import axios from "../../utils/axiosConfig";
// import { Orbit } from "@uiball/loaders";
// import { PencilIcon, TrashIcon, PlusIcon, XIcon, ScissorsIcon } from "@heroicons/react/outline";
// import { Tooltip } from "@nextui-org/react";

// const Services = () => {
//   const [serviceTypes, setServiceTypes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [editingService, setEditingService] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     rate: "",
//     description: "",
//     serviceCategory: "",
//     imageUrl: [],
//   });
//   const [image, setImage] = useState(null);
//   const [cropper, setCropper] = useState(null);

//   useEffect(() => {
//     fetchServiceTypes();
//     fetchCategories();
//   }, []);

//   const fetchServiceTypes = async () => {
//     try {
//       const response = await axios.get("/admin/service-types");
//       setServiceTypes(response.data);
//     } catch (error) {
//       console.error("Error fetching service types:", error);
//       showSnackbar("Failed to fetch service types", "error");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/admin/service-categories");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       showSnackbar("Failed to fetch categories", "error");
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleCrop = () => {
//     if (cropper) {
//       setFormData({
//         ...formData,
//         imageUrl: [cropper.getCroppedCanvas().toDataURL()],
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       if (editingService) {
//         await axios.put(`/admin/service-types/${editingService._id}`, formData);
//         showSnackbar("Service type updated successfully!");
//       } else {
//         await axios.post("/admin/service-types", formData);
//         showSnackbar("Service type created successfully!");
//       }
//       setIsModalOpen(false);
//       setEditingService(null);
//       resetForm();
//       fetchServiceTypes();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       showSnackbar("Failed to save service type", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (service) => {
//     setEditingService(service);
//     setFormData({
//       name: service.name,
//       rate: service.rate,
//       description: service.description,
//       serviceCategory: service.serviceCategory._id,
//       imageUrl: service.imageUrl,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (serviceId) => {
//     if (window.confirm("Are you sure you want to delete this service type?")) {
//       try {
//         await axios.delete(`/admin/service-types/${serviceId}`);
//         showSnackbar("Service type deleted successfully!");
//         fetchServiceTypes();
//       } catch (error) {
//         console.error("Error deleting service type:", error);
//         showSnackbar("Failed to delete service type", "error");
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       rate: "",
//       description: "",
//       serviceCategory: "",
//       imageUrl: [],
//     });
//     setImage(null);
//   };

//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center text-black mb-8 shadow-lg p-4 rounded-lg">
//         Services Management
//       </h1>

//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
//       >
//         <PlusIcon className="h-5 w-5 mr-2" />
//         Create New Service Type
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {serviceTypes.map((service) => (
//           <div key={service._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//             {service.imageUrl && service.imageUrl.length > 0 && (
//               <img
//                 src={service.imageUrl[0]}
//                 alt={service.name}
//                 className="w-full h-48 object-cover"
//               />
//             )}
//             <div className="p-4">
//               <h3 className="font-bold text-xl mb-2">{service.name}</h3>
//               <p className="text-gray-700 text-base mb-2">{service.description}</p>
//               <p className="text-gray-600 text-sm">Category: {service.serviceCategory.name}</p>
//               <p className="text-gray-600 text-sm">Rate: ${service.rate}</p>
//             </div>
//             <div className="px-4 py-2 bg-gray-100 flex justify-end">
//               <Tooltip content="Edit">
//                 <button
//                   onClick={() => handleEdit(service)}
//                   className="text-blue-500 hover:text-blue-700 mr-2"
//                 >
//                   <PencilIcon className="h-5 w-5" />
//                 </button>
//               </Tooltip>
//               <Tooltip content="Delete">
//                 <button
//                   onClick={() => handleDelete(service._id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <TrashIcon className="h-5 w-5" />
//                 </button>
//               </Tooltip>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Transition appear show={isModalOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-10 overflow-y-auto"
//           onClose={() => setIsModalOpen(false)}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
//             </Transition.Child>

//             <span className="inline-block h-screen align-middle" aria-hidden="true">
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-lg font-medium leading-6 text-gray-900 mb-4"
//                 >
//                   {editingService ? "Edit Service Type" : "Create New Service Type"}
//                 </Dialog.Title>
//                 <form onSubmit={handleSubmit}>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Service Name"
//                     className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none"
//                     required
//                   />
//                   <input
//                     type="number"
//                     name="rate"
//                     value={formData.rate}
//                     onChange={handleInputChange}
//                     placeholder="Rate"
//                     className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none"
//                     required
//                   />
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Description"
//                     className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none"
//                     rows="3"
//                   />
//                   <select
//                     name="serviceCategory"
//                     value={formData.serviceCategory}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none"
//                     required
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="w-full mb-3"
//                   />
//                   {image && (
//                     <div className="mb-3">
//                       <Cropper
//                         src={image}
//                         style={{ height: 300, width: "100%" }}
//                         aspectRatio={16 / 9}
//                         guides={false}
//                         crop={handleCrop}
//                         onInitialized={(instance) => setCropper(instance)}
//                       />
//                       <button
//                         type="button"
//                         onClick={handleCrop}
//                         className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
//                       >
//                         <ScissorsIcon className="h-5 w-5 mr-2" />
//                         Crop Image
//                       </button>
//                     </div>
//                   )}
//                   <div className="mt-4 flex justify-end">
//                     <button
//                       type="button"
//                       className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                       onClick={() => setIsModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <Orbit size={20} color="#ffffff" />
//                       ) : (
//                         "Save"
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Services;




// import { useState, useEffect, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Cropper } from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import axios from "../../utils/axiosConfig";
// import { Orbit } from "@uiball/loaders";
// import { PlusIcon, XIcon, PencilIcon, TrashIcon, ScissorsIcon } from "@heroicons/react/outline";
// import { Tooltip } from "@nextui-org/react";
// import { Snackbar, Alert } from "@mui/material";

// function Services() {
//   const [services, setServices] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [formData, setFormData] = useState({ name: "", rate: "", description: "", images: [], video: null });
//   const [currentImageIndex, setCurrentImageIndex] = useState(null);
//   const [cropper, setCropper] = useState(null);
//   const [editingService, setEditingService] = useState(null);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("/admin/service-types");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   const handleFormOpen = () => {
//     setIsFormOpen(true);
//     setFormData({ name: "", rate: "", description: "", images: [], video: null });
//     setEditingService(null);
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

//   const handleEdit = (service) => {
//     setEditingService(service);
//     setFormData({
//       name: service.name,
//       rate: service.rate,
//       description: service.description,
//       images: service.imageUrl,
//       video: service.videoUrl,
//     });
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       try {
//         await axios.delete(`/admin/service-types/${id}`);
//         setSnackbar({ open: true, message: "Service deleted successfully", severity: "success" });
//         fetchServices();
//       } catch (error) {
//         console.error("Error deleting service:", error);
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
//         rate: formData.rate,
//         description: formData.description,
//         imageUrl: formData.images,
//         videoUrl: formData.video,
//       };

//       if (editingService) {
//         await axios.put(`/admin/service-types/${editingService._id}`, data);
//       } else {
//         await axios.post("/admin/service-types", data);
//       }

//       setSnackbar({ open: true, message: `Service ${editingService ? "updated" : "created"} successfully`, severity: "success" });
//       handleFormClose();
//       fetchServices();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSnackbar({ open: true, message: "An error occurred", severity: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text bg-gradient-to-r from-black to-blue-500 text-shadow-md">
//         Services
//       </h1>

//       <div className="flex justify-end mb-8">
//         <button
//           onClick={handleFormOpen}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//           type="button"
//         >
//           <PlusIcon className="h-5 w-5 inline-block mr-2" />
//           Create New
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {services.map((service) => (
//           <div
//             key={service._id}
//             className="relative overflow-hidden bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//           >
//             <div className="relative h-56">
//               <img
//                 src={service.imageUrl[0]}
//                 alt={service.name}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
//                 <div className="flex space-x-4">
//                   <Tooltip content="Edit" placement="top">
//                     <button
//                       type="button"
//                       onClick={() => handleEdit(service)}
//                       className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
//                     >
//                       <PencilIcon className="h-5 w-5" />
//                     </button>
//                   </Tooltip>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h2>
//               <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
//               <p className="text-gray-600">${service.rate}</p>
//               <p className="text-gray-600">{service.description}</p>
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
//                     {editingService ? "Edit" : "Create"} Service Type
//                   </Dialog.Title>
//                   <button
//                     type="button"
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
//                       placeholder="Service Name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       required
//                     />
//                     <input
//                       type="number"
//                       name="rate"
//                       value={formData.rate}
//                       onChange={handleInputChange}
//                       placeholder="Service Rate"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       required
//                     />
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       placeholder="Service Description"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       rows="4"
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
//                               type="button"
//                               onClick={() => handleDeleteImage(index)}
//                               className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
//                             >
//                               <TrashIcon className="h-5 w-5" />
//                             </button>
//                           </Tooltip>
//                           <Tooltip content="Crop Image">
//                             <button
//                               type="button"
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
//                             style={{ height: 200, width: "100%" }}
//                             initialAspectRatio={16 / 9}
//                             guides={false}
//                             crop={handleCrop}
//                             onInitialized={(instance) => setCropper(instance)}
//                           />
//                           <button
//                             type="button"
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
//                           <video src={formData.video} controls className="w-full h-48 rounded-lg shadow-lg" />
//                           <Tooltip content="Delete Video">
//                             <button
//                               type="button"
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
//                         type="button"
//                         onClick={handleFormClose}
//                         className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
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
// }

// export default Services;


// import { Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import { useState, useEffect, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Cropper } from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import axios from "../../utils/axiosConfig";
// import { Orbit } from "@uiball/loaders";
// import { PencilIcon, TrashIcon, PlusIcon, XIcon, ScissorsIcon } from "@heroicons/react/outline";
// import { Tooltip } from "@nextui-org/react";

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [formData, setFormData] = useState({ name: "", serviceCategory: "", images: [], video: null, rate: "", description: "" });
//   const [currentImageIndex, setCurrentImageIndex] = useState(null);
//   const [cropper, setCropper] = useState(null);
//   const [editingService, setEditingService] = useState(null);

//   useEffect(() => {
//     fetchServices();
//     fetchCategories();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("/admin/service-types");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

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
//     setFormData({ name: "", serviceCategory: "", images: [], video: null, rate: "", description: "" });
//     setEditingService(null);
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

//   const handleEdit = (service) => {
//     setEditingService(service);
//     setFormData({
//       name: service.name,
//       serviceCategory: service.serviceCategory._id,
//       images: service.imageUrl,
//       video: service.videoUrl,
//       rate: service.rate,
//       description: service.description,
//     });
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this service type?")) {
//       try {
//         await axios.delete(`/admin/service-types/${id}`);
//         setSnackbar({ open: true, message: "Service type deleted successfully", severity: "success" });
//         fetchServices();
//       } catch (error) {
//         console.error("Error deleting service type:", error);
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
//         serviceCategory: formData.serviceCategory,
//         rate: formData.rate,
//         description: formData.description,
//         imageUrl: formData.images,
//         videoUrl: formData.video,
//       };

//       if (editingService) {
//         await axios.put(`/admin/service-types/${editingService._id}`, data);
//       } else {
//         await axios.post("/admin/service-types", data);
//       }

//       setSnackbar({ open: true, message: `Service type ${editingService ? "updated" : "created"} successfully`, severity: "success" });
//       handleFormClose();
//       fetchServices();
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
//         Services
//       </h1>

//       <div className="flex justify-end mb-8">
//         <button
//           onClick={handleFormOpen}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//           type="button"
//         >
//           <PlusIcon className="h-5 w-5 inline-block mr-2" />
//           Create New
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {services.map((service) => (
//           <div
//             key={service._id}
//             className="relative overflow-hidden bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//           >
//             <div className="relative h-56">
//               <img
//                 src={service.imageUrl[0]}
//                 alt={service.name}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
//                 <div className="flex space-x-4">
//                   <Tooltip content="Edit" placement="top">
//                     <button
//                       type="button"
//                       onClick={() => handleEdit(service)}
//                       className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
//                     >
//                       <PencilIcon className="h-5 w-5" />
//                     </button>
//                   </Tooltip>
//                   <Tooltip content="Delete" placement="top">
//                     <button
//                       type="button"
//                       onClick={() => handleDelete(service._id)}
//                       className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </Tooltip>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h2>
//               <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
//                            <p className="text-gray-600">Category: {service.serviceCategory.name}</p>
//               <p className="text-gray-600">Rate: ${service.rate}</p>
//               <p className="text-gray-600 mt-2">{service.description}</p>
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
//                     {editingService ? "Edit" : "Create"} Service Type
//                   </Dialog.Title>
//                   <button
//                     type="button"
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
//                       placeholder="Service Name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       required
//                     />

//                     <FormControl fullWidth variant="outlined" className="mb-4">
//                       <InputLabel>Service Category</InputLabel>
//                       <Select
//                         value={formData.serviceCategory}
//                         onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
//                         label="Service Category"
//                         required
//                       >
//                         {categories.map((category) => (
//                           <MenuItem key={category._id} value={category._id}>
//                             {category.name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>

//                     <input
//                       type="number"
//                       name="rate"
//                       value={formData.rate}
//                       onChange={handleInputChange}
//                       placeholder="Rate ($)"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       required
//                     />

//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       placeholder="Service Description"
//                       rows="4"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       required
//                     ></textarea>

//                     <div className="space-y-4">
//                       <label className="block text-lg font-medium text-gray-700">Images</label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleImageChange}
//                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       />
//                       <div className="grid grid-cols-2 gap-4">
//                         {formData.images.map((image, index) => (
//                           <div key={index} className="relative">
//                             <img src={image} alt={`Selected ${index}`} className="w-full h-32 object-cover rounded-lg shadow-lg" />
//                             <Tooltip content="Delete Image">
//                               <button
//                                 type="button"
//                                 onClick={() => handleDeleteImage(index)}
//                                 className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
//                               >
//                                 <TrashIcon className="h-5 w-5" />
//                               </button>
//                             </Tooltip>
//                             <Tooltip content="Crop Image">
//                               <button
//                                 type="button"
//                                 onClick={() => setCurrentImageIndex(index)}
//                                 className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
//                               >
//                                 <ScissorsIcon className="h-5 w-5" />
//                               </button>
//                             </Tooltip>
//                           </div>
//                         ))}
//                       </div>
//                       {currentImageIndex !== null && (
//                         <div className="mt-4 relative">
//                           <Cropper
//                             src={formData.images[currentImageIndex]}
//                             style={{ height: 200, width: "100%" }}
//                             initialAspectRatio={16 / 9}
//                             guides={false}
//                             crop={handleCrop}
//                             onInitialized={(instance) => setCropper(instance)}
//                           />
//                           <button
//                             type="button"
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
//                           <video src={formData.video} controls className="w-full h-48 rounded-lg shadow-lg" />
//                           <Tooltip content="Delete Video">
//                             <button
//                               type="button"
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
//                         type="button"
//                         onClick={handleFormClose}
//                         className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
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

// export default Services;




import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box, Container } from "@mui/material";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Bell, User, LogOut, Settings, Menu as MenuIcon } from "lucide-react";
import { Tooltip } from "@nextui-org/react";
import { logoutUser } from '../../store/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
    handleClose();
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={isScrolled ? 4 : 0}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontWeight: 'bold', background: 'linear-gradient(to right, #3b82f6, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tech</span>
              <span style={{ fontWeight: 'bold' }}>Care</span>
            </Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink href="/bookings">Bookings</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/about">About Us</NavLink>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip content="Notifications" placement="bottom">
              <IconButton color="inherit" size="large">
                <Bell />
              </IconButton>
            </Tooltip>

            {user ? (
              <Fragment>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt={user.firstName} src={user.profilePicture} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/profile');
                  }}>
                    <User size={16} style={{ marginRight: '8px' }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/settings');
                  }}>
                    <Settings size={16} style={{ marginRight: '8px' }} />
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: '8px' }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Fragment>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              sx={{ ml: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Transition show={isMobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden md:hidden" onClose={() => setIsMobileMenuOpen(false)}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Menu
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid gap-y-8">
                          <NavLink href="/bookings" mobile>Bookings</NavLink>
                          <NavLink href="/services" mobile>Services</NavLink>
                          <NavLink href="/about" mobile>About Us</NavLink>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </AppBar>
  );
};

const NavLink = ({ href, children, mobile }) => (
  <Link
    to={href}
    className={`text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200
      ${mobile ? 'text-base' : 'text-sm'}`}
    style={{ textDecoration: 'none', padding: mobile ? '0.5rem 0' : '0 1rem' }}
  >
    {children}
  </Link>
);

export default Header;