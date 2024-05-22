import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  env_URL_SERVER,
  updatedVendorInvoiceData
} from "../../helper";

const initialState = {
  VendorInvoiceData: [],
  status: "",
  filter: {},
  countPerPage: 15,
  pageNo: 1,
  totalCount: 0,
  isLoading: false,
  isSuccess: false,
  sorting: {
    sort_by: "",
    sort_order: "",
  },
};

export const pmaSlice = createSlice({
  name: "vendorInvoice",
  initialState,
  reducers: {
    setVendorInvoiceData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.VendorInvoiceData = updatedVendorInvoiceData(data.data, year, month);
      state.totalCount = payload.data.total_count;
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
    setInitialState: (state, { payload }) => {
      (state.filter = []),
        (state.status = ""),
        (state.filter = []),
        (state.countPerPage = 15),
        (state.pageNo = 1),
        (state.totalCount = 0),
        (state.isLoading = false),
        (state.isSuccess = false);
      state.sorting = {
        sort_by: "",
        sort_order: "",
      };
    },
    setVendorInvoiceFilters: (state, { payload }) => {
      state.filter = { ...payload };
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setVendorInvoiceData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setVendorInvoiceFilters,
  setInitialState,
  setSorting,
} = pmaSlice.actions;

export const getVendorInvoiceData =
  (payloadObj, year, month) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}getReportVendorInvoice`,
        payloadObj
      );

      dispatch(setVendorInvoiceData({ data: response.data, year, month }));
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadVendorInvoiceDataXls =
  (payloadObj, year, month) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}getReportVendorInvoice`,
        payloadObj
      );

      return response.data;
      // dispatch(setOrderPaymentData({ data: response.data, year, month }));
      // dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export default pmaSlice.reducer;