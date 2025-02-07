import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to Fetch Reports
export const fetchReports = createAsyncThunk("reports/fetchReports", async () => {
  const response = await axios.get("http://localhost:5000/api/reports");
  return response.data;
});

// Slice
const reportSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {
    addReport: (state, action) => {
      state.reports.unshift(action.payload); // Add new report to state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addReport } = reportSlice.actions;
export default reportSlice.reducer;
