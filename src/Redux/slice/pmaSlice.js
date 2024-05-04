import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pmaBillingData: [],
  status: "",
  countPerPage: 15,
  pageNo: 1,
  totalCount: 0,
  isLoading: false,
  isSuccess: false,
};
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;

export const pmaSlice = createSlice({
  name: "pma",
  initialState,
  reducers: {
    setPmaBillingData: (state, { payload }) => {
      state.pmaBillingData = payload.data;
      state.totalCount = payload.total_count;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setPageNumber: (state, { payload }) => {
      state.pageNo = payload;
    },
    setCountPerPage: (state, { payload }) => {
      state.countPerPage = payload;
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setPmaBillingData,
  setStatus,
  setPageNumber,
  setCountPerPage,
} = pmaSlice.actions;

export const getPmaBilling = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getPMABilling`,
      payloadObj
    );
    dispatch(setPmaBillingData(response.data));
    dispatch(setStatus("success"));
    console.log(response, "response");
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export default pmaSlice.reducer;

