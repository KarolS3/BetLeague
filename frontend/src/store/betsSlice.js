import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api/axios' 

export const fetchBets = createAsyncThunk(
  "bets/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get("/api/bets", {});
      return res.data;
    } catch (err) {
      return rejectWithValue("Błąd pobierania zakładów");
    }
  },
);

export const placeBet = createAsyncThunk(
  "bets/place",
  async (betData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.post("/api/bets", betData, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Błąd obstawiania");
    }
  },
);

const betsSlice = createSlice({
  name: "bets",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBets.fulfilled, (s, a) => {
        s.list = a.payload;
      })
      .addCase(placeBet.fulfilled, (s, a) => {
        s.list.push(a.payload);
      })
      .addCase(placeBet.rejected, (s, a) => {
        s.error = a.payload;
      });
  },
});

export default betsSlice.reducer;
