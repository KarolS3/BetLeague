import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import matchesReducer from "./matchesSlice";
import betsReducer from "./betsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
    bets: betsReducer,
  },
});
