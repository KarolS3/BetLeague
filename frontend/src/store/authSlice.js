import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Błąd logowania");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/register", data);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Błąd rejestracji");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
