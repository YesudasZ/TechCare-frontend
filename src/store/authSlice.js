import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupTechnician = createAsyncThunk(
  "auth/signupTechnician",
  async (technicianData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/technician/signup", technicianData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/verifyOTP", { otp, email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/resendOTP", { otp, email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout");
      localStorage.removeItem("user");
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/refreshToken");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const initiateForgetPassword = createAsyncThunk(
  "auth/initiateForgetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/forget-password/initiate", {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyForgetPasswordOTP = createAsyncThunk(
  "auth/verifyForgetPasswordOTP",
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/forget-password/verify-otp", {
        otp,
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, email }, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/auth/forget-password/reset", {
        newPassword,
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/status");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/auth/update-profile", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  "auth/updateAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/auth/update-address", addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserAddresses = createAsyncThunk(
  "auth/getUserAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/addresses");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "auth/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/auth/address/${addressId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/auth/update-password", passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "auth/updateProfilePicture",
  async (imageData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/auth/update-profile-picture", imageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
           if (action.payload && action.payload.accessToken) {
        state.user.accessToken = action.payload.accessToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signupTechnician.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupTechnician.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signupTechnician.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
      })
      .addCase(initiateForgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initiateForgetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initiateForgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyForgetPasswordOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyForgetPasswordOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyForgetPasswordOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        if (!state.user.addresses) {
          state.user.addresses = [];
        }
        const index = state.user.addresses.findIndex(addr => addr._id === action.payload.address._id);
        if (index !== -1) {
          state.user.addresses[index] = action.payload.address;
        } else {
          state.user.addresses.push(action.payload.address);
        }
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.user.addresses = action.payload.addresses;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.user.addresses = state.user.addresses.filter(addr => addr._id !== action.payload.addressId);
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.user.profilePicture = action.payload.profilePicture;
      });;
  },
});

export const { clearError, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
