
import { Snackbar, Alert, MenuItem, Select, InputLabel, FormControl,TextField, FormHelperText } from "@mui/material";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "../../utils/axiosConfig";
import { Orbit } from "@uiball/loaders";
import { PencilIcon, TrashIcon, PlusIcon, XIcon, ScissorsIcon } from "@heroicons/react/outline";
import { Tooltip } from "@nextui-org/react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [formData, setFormData] = useState({ name: "", serviceCategory: "", images: [], video: null, rate: "", description: "" });
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/admin/service-types");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/admin/service-categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          error = "Service name must contain only letters and spaces.";
        }
        break;
      case "rate":
        if (!/^\d+(\.\d{1,2})?$/.test(value)) {
          error = "Rate must be a valid number with up to 2 decimal places.";
        }
        break;
      case "description":
        if (value.trim().length === 0) {
          error = "Description is required.";
        }
        break;
      case "serviceCategory":
        if (!value) {
          error = "Service category is required.";
        }
        break;
      default:
        break;
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
    setFormData({ name: "", serviceCategory: "", images: [], video: null, rate: "", description: "" });
    setFormErrors({});
    setEditingService(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentImageIndex(null);
    setCropper(null);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validImages = files.filter(file => validImageTypes.includes(file.type));
    
    if (validImages.length !== files.length) {
      setFormErrors(prev => ({ ...prev, images: "Only JPG, PNG, and WebP images are allowed." }));
    } else {
      setFormErrors(prev => ({ ...prev, images: "" }));
    }

    const readers = validImages.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((images) => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ...images] }));
      })
      .catch((error) => console.error("Error reading images:", error));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const validVideoTypes = ['video/mp4', 'video/x-matroska'];
    
    if (!validVideoTypes.includes(file.type)) {
      setFormErrors(prev => ({ ...prev, video: "Only MP4 and MKV video formats are allowed." }));
      return;
    }

    setFormErrors(prev => ({ ...prev, video: "" }));
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, video: reader.result }));
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

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      serviceCategory: service.serviceCategory._id,
      images: service.imageUrl,
      video: service.videoUrl,
      rate: service.rate,
      description: service.description,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service type?")) {
      try {
        await axios.delete(`/admin/service-types/${id}`);
        setSnackbar({ open: true, message: "Service type deleted successfully", severity: "success" });
        fetchServices();
      } catch (error) {
        console.error("Error deleting service type:", error);
        setSnackbar({ open: true, message: "An error occurred while deleting", severity: "error" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const data = {
        name: formData.name,
        serviceCategory: formData.serviceCategory,
        rate: formData.rate,
        description: formData.description,
        imageUrl: formData.images,
        videoUrl: formData.video,
      };

      if (editingService) {
        await axios.put(`/admin/service-types/${editingService._id}`, data);
      } else {
        await axios.post("/admin/service-types", data);
      }

      setSnackbar({ open: true, message: `Service type ${editingService ? "updated" : "created"} successfully`, severity: "success" });
      handleFormClose();
      fetchServices();
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
        Services
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
        {services.map((service) => (
          <div
            key={service._id}
            className="relative overflow-hidden bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-56">
              <img
                src={service.imageUrl[0]}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
                <div className="flex space-x-4">
                  <Tooltip content="Edit" placement="top">
                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete" placement="top">
                    <button
                      type="button"
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
                           <p className="text-gray-600">Category: {service.serviceCategory.name}</p>
              <p className="text-gray-600">Rate: ${service.rate}</p>
              <p className="text-gray-600 mt-2">{service.description}</p>
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
                    {editingService ? "Edit" : "Create"} Service Type
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={handleFormClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors duration-300"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <TextField
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="Service Name"
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name || "Enter service name (letters only)"}
              InputProps={{
                className: !formErrors.name && formData.name ? "border-green-500" : "",
              }}
            />

<FormControl fullWidth error={!!formErrors.serviceCategory}>
              <InputLabel>Service Category</InputLabel>
              <Select
                value={formData.serviceCategory}
                onChange={handleInputChange}
                name="serviceCategory"
                label="Service Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.serviceCategory && (
                <FormHelperText>{formErrors.serviceCategory}</FormHelperText>
              )}
            </FormControl>

            <TextField
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              label="Service Rate"
              fullWidth
              type="number"
              error={!!formErrors.rate}
              helperText={formErrors.rate || "Enter service rate (numbers only)"}
              InputProps={{
                className: !formErrors.rate && formData.rate ? "border-green-500" : "",
              }}
            />

<TextField
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              label="Service Description"
              fullWidth
              multiline
              rows={4}
              error={!!formErrors.description}
              helperText={formErrors.description || "Enter service description"}
              InputProps={{
                className: !formErrors.description && formData.description ? "border-green-500" : "",
              }}
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
                      {formErrors.images && <p className="text-red-500 mt-1">{formErrors.images}</p>}
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
                      {formErrors.video && <p className="text-red-500 mt-1">{formErrors.video}</p>}
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

export default Services;



