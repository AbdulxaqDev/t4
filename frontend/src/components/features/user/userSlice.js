import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

// Get users from localStorage
const users = JSON.parse(localStorage.getItem("users"));

const initialState = {
 users: users ? users : null,
 isError: false,
 isSuccess: false,
 isLoading: false,
 message: "",
 updateStatus: "",
 isActive: {status: true}
};

// Get users user
export const getUsers = createAsyncThunk("user/getUsers", async (thunkAPI) => {
 try {
  return await userService.getUsers();
 } catch (error) {
  const message =
   (error.response && error.response.data && error.response.data.message) ||
   error.message ||
   error.toString();
  return thunkAPI.rejectWithValue(message);
 }
});

// Login user
export const updateUsers = createAsyncThunk("user/updateUsers", async (updateUsersStatus,  thunkAPI) => {
 try {
  return await userService.updateUsers(updateUsersStatus);
 } catch (error) {
  const message =
   (error.response && error.response.data && error.response.data.message) ||
   error.message ||
   error.toString();
  return thunkAPI.rejectWithValue(message);
 }
});

// Login user
export const deleteUsers = createAsyncThunk("user/deleteUsers", async (userIds,  thunkAPI) => {
 try {
  return await userService.deleteUsers(userIds);
 } catch (error) {
  const message =
   (error.response && error.response.data && error.response.data.message) ||
   error.message ||
   error.toString();
  return thunkAPI.rejectWithValue(message);
 }
});

export const getMe = createAsyncThunk("user/getMe", async (thunkAPI) => {
 try {
  return await userService.getMe();
 } catch (error) {
  const message =
   (error.response && error.response.data && error.response.data.message) ||
   error.message ||
   error.toString();
  return thunkAPI.rejectWithValue(message);
 }
});

export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  reset: (state) => {
   state.isLoading = false;
   state.isSuccess = false;
   state.isError = false;
   state.message = "";
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(getUsers.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(getUsers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.users = action.payload;
   })
   .addCase(getUsers.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    state.users = null;
   }) // updateUser
   .addCase(updateUsers.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(updateUsers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.updateStatus = action.payload;
   })
   .addCase(updateUsers.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    state.updateStatus = null;
   }) // getMe
   .addCase(getMe.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(getMe.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isActive = action.payload;
   })
   .addCase(getMe.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
    state.isActive = {status: true};
   })
   .addCase(deleteUsers.pending, (state) => {
    state.isLoading = true;
   })
   .addCase(deleteUsers.fulfilled, (state) => {
    state.isLoading = false;
    state.isSuccess = true;
   })
   .addCase(deleteUsers.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
   })
 },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
