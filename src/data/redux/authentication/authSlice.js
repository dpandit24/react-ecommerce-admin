import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "data/firebase/firebase";

// Thunk to handle asynchronous login with Firebase
export const login = createAsyncThunk("auth/login",async({email,password},{rejectWithValue}) => {
    try {
        const userCredential = await loginUser(email,password)
        return userCredential.user
    } catch (error){
        return rejectWithValue(error.message)
    }
})

// Create slice for auth management
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
