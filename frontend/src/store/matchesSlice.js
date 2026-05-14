import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api/axios' 

export const fetchMatches = createAsyncThunk(
  "matches/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/matches");
      return res.data;
    } catch (err) {
      return rejectWithValue("Błąd pobierania meczów");
    }
  },
);

const matchesSlice = createSlice({
  name: "matches",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchMatches.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchMatches.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default matchesSlice.reducer;
