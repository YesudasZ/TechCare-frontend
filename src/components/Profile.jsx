import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiLock,
  FiEdit2,
  FiTrash2,
  FiPlusCircle,
  FiAlertCircle,
} from "react-icons/fi";
import {
  updateUserProfile,
  updateUserPassword,
  updateUserAddress,
  getUserAddresses,
  deleteUserAddress,
  updateProfilePicture,
} from "../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    profilePicture: user?.profilePicture || "",
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(getUserAddresses());
      if (user.addresses) {
        setAddresses(user.addresses);
      }
    }
  }, [user, dispatch]);

  const validateField = (name, value) => {
    let error = "";
    const stringValue = String(value || "");
    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[A-Za-z]+$/.test(stringValue.trim())) {
          error = `${
            name === "firstName" ? "First" : "Last"
          } name must contain only letters.`;
        }
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(stringValue.trim())) {
          error = "Phone number must be exactly 10 digits.";
        }
        break;
      case "newPassword":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/.test(
            stringValue
          )
        ) {
          error =
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.";
        }
        break;
      case "confirmPassword":
        if (stringValue !== password.newPassword) {
          error = "Passwords do not match.";
        }
        break;
      case "street":
      case "city":
      case "state":
      case "country":
        if (!/^[A-Za-z\s]+$/.test(stringValue.trim())) {
          error = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must contain only letters and spaces.`;
        }
        break;
      case "postalCode":
        if (!/^[A-Za-z0-9]+$/.test(stringValue.trim())) {
          error = "Postal code must contain only letters and numbers.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = (formData) => {
    const formErrors = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] === undefined || formData[key] === null) {
        return acc;
      }
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setSnackbar({
          open: true,
          message: "Please upload a valid image file (jpg, jpeg, png, webp)",
          severity: "error",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          setIsLoading(true);
          const result = await dispatch(
            updateProfilePicture({ image: reader.result })
          ).unwrap();
          setProfileData((prevState) => ({
            ...prevState,
            profilePicture: result.profilePicture,
          }));
          setSnackbar({
            open: true,
            message: "Profile picture updated successfully",
            severity: "success",
          });
        } catch (error) {
          setSnackbar({
            open: true,
            message: error.message || "Failed to update profile picture",
            severity: "error",
          });
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    const trimmedProfileData = Object.keys(profileData).reduce((acc, key) => {
      acc[key] = typeof profileData[key] === 'string' ? profileData[key].trim() : profileData[key];
      return acc;
    }, {});
    if (!isFormValid(trimmedProfileData)) {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form.",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(updateUserProfile(trimmedProfileData)).unwrap();
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressUpdate = async () => {
      const trimmedAddress = Object.keys(newAddress).reduce((acc, key) => {
    acc[key] = typeof newAddress[key] === 'string' ? newAddress[key].trim() : newAddress[key];
    return acc;
  }, {});
    if (!isFormValid(trimmedAddress)) {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form.",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(
        updateUserAddress(
          selectedAddress
            ? { ...trimmedAddress, addressId: selectedAddress._id }
            : trimmedAddress
        )
      ).unwrap();
      setSnackbar({
        open: true,
        message: "Address updated successfully",
        severity: "success",
      });
      setIsAddressModalOpen(false);
      dispatch(getUserAddresses());
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update address",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!isFormValid(password)) {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form.",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(updateUserPassword(password)).unwrap();
      setSnackbar({
        open: true,
        message: "Password updated successfully",
        severity: "success",
      });
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsPasswordModalOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update password",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (addressToDelete) {
      setIsLoading(true);
      try {
        await dispatch(deleteUserAddress(addressToDelete._id)).unwrap();
        setAddresses(
          addresses.filter((addr) => addr._id !== addressToDelete._id)
        );
        setSnackbar({
          open: true,
          message: "Address deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || "Failed to delete address",
          severity: "error",
        });
      } finally {
        setIsLoading(false);
        setIsDeleteModalOpen(false);
        setAddressToDelete(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-black  text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <img
                  src={
                    profileData.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
                <label
                  htmlFor="profile-picture-upload"
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                >
                  <FiEdit2 className="w-4 h-4" />
                </label>
                <input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h1>
                <p className="text-gray-400">{profileData.phoneNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={<FiUser />}
                name="firstName"
                label="First Name"
                value={profileData.firstName}
                onChange={handleInputChange}
                error={touched.firstName && errors.firstName}
                instruction="Enter your first name (letters only)"
              />
              <InputField
                icon={<FiUser />}
                name="lastName"
                label="Last Name"
                value={profileData.lastName}
                onChange={handleInputChange}
                error={touched.lastName && errors.lastName}
                instruction="Enter your last name (letters only)"
              />
              <InputField
                icon={<FiPhone />}
                name="phoneNumber"
                label="Phone Number"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                error={touched.phoneNumber && errors.phoneNumber}
                instruction="Enter a 10-digit phone number"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
              onClick={handleProfileUpdate}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <h2 className="text-2xl font-bold mb-6">Addresses</h2>
            <div className="space-y-4">
              {addresses.map((address) => (
                <motion.div
                  key={address._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{`${address.street}, ${address.city}`}</p>
                    <p className="text-gray-400">{`${address.state}, ${address.country} - ${address.postalCode}`}</p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => {
                        setSelectedAddress(address);
                        setNewAddress(address);
                        setIsAddressModalOpen(true);
                      }}
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-400 hover:text-red-300"
                      onClick={() => {
                        setAddressToDelete(address);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center"
              onClick={() => {
                setSelectedAddress(null);
                setNewAddress({
                  street: "",
                  city: "",
                  state: "",
                  country: "",
                  postalCode: "",
                  phoneNumber: "",
                });
                setIsAddressModalOpen(true);
              }}
            >
              <FiPlusCircle className="mr-2" />
              Add New Address
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 flex items-center"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <FiLock className="mr-2" />
            Change Password
          </motion.button>
        </motion.div>
      </div>

      {/* Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title={selectedAddress ? "Update Address" : "Add New Address"}
      >
        <div className="space-y-4">
          <InputField
            icon={<FiMapPin />}
            name="street"
            label="Street"
            value={newAddress.street}
            onChange={handleAddressChange}
            error={errors.street}
            // isValid={validFields.street}
          />
          <InputField
            icon={<FiMapPin />}
            name="city"
            label="City"
            value={newAddress.city}
            onChange={handleAddressChange}
            error={errors.city}
            // isValid={validFields.city}
          />
          <InputField
            icon={<FiMapPin />}
            name="state"
            label="State"
            value={newAddress.state}
            onChange={handleAddressChange}
            error={errors.state}
            // isValid={validFields.state}
          />
          <InputField
            icon={<FiMapPin />}
            name="country"
            label="Country"
            value={newAddress.country}
            onChange={handleAddressChange}
            error={errors.country}
            // isValid={validFields.country}
          />
          <InputField
            icon={<FiMapPin />}
            name="postalCode"
            label="Postal Code"
            value={newAddress.postalCode}
            onChange={handleAddressChange}
            error={errors.postalcode}
            // isValid={validFields.postalCode}
          />
          <InputField
            icon={<FiPhone />}
            name="phoneNumber"
            label="Phone Number"
            value={newAddress.phoneNumber}
            onChange={handleAddressChange}
            error={errors.phoneNumber}
            // isValid={validFields.phoneNumber}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={() => setIsAddressModalOpen(false)}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={handleAddressUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Address"}
          </motion.button>
        </div>
      </Modal>

      {/* Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
      >
        <div className="space-y-4">
          <InputField
            icon={<FiLock />}
            name="currentPassword"
            label="Current Password"
            type="password"
            value={password.currentPassword}
            onChange={handlePasswordChange}
            error={errors.currentPassword}
            // isValid={validFields.currentPassword}
          />
          <InputField
            icon={<FiLock />}
            name="newPassword"
            label="New Password"
            type="password"
            value={password.newPassword}
            onChange={handlePasswordChange}
            error={errors.newPassword}
            // isValid={validFields.newPassword}
          />
          <InputField
            icon={<FiLock />}
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            value={password.confirmPassword}
            onChange={handlePasswordChange}
            error={errors.confirmPassword}
            // isValid={validateField.confirmPassword}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={() => setIsPasswordModalOpen(false)}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
            onClick={handlePasswordUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </motion.button>
        </div>
      </Modal>

      {/* Delete Address Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete Address"
      >
        <div className="text-center">
          <FiAlertCircle className="mx-auto text-yellow-400 w-16 h-16 mb-4" />
          <p className="text-lg mb-4">
            Are you sure you want to delete this address?
          </p>
          <p className="text-gray-400 mb-6">This action cannot be undone.</p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
              onClick={handleDeleteAddress}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Address"}
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

const InputField = ({
  icon,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      id={name}
      className={`block w-full pl-10 pr-3 py-2 border ${
        error ? "border-red-500" : "border-gray-600"
      } rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200`}
      placeholder={label}
      value={value}
      onChange={onChange}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </motion.div>
    </div>
  );
};

const Snackbar = ({ open, message, severity, onClose }) => {
  if (!open) return null;

  const bgColor = severity === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`}
    >
      {message}
      <button onClick={onClose} className="ml-4 font-bold">
        &times;
      </button>
    </motion.div>
  );
};

export default Profile;



