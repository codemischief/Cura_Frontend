import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import {
  env_URL_SERVER,
  updatedVendorInvoiceData
} from "../../helper";
import FileSaver from "file-saver";

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
    resetData: (state, { payload }) => {
      state.VendorInvoiceData = [];
    },
    resetFilters: (state, { payload }) => {
      state.filter = [];
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
  resetData,
  resetFilters,
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
  (payloadObj,type) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}getReportVendorInvoice`,
        payloadObj
      );

      if ((response.data.filename, payloadObj.user_id)) {
        await dispatch(
          downloadXlsEndpoint(response.data.filename, payloadObj.user_id ,type)
        );
      }
      dispatch(setStatus("success"));
      // dispatch(setOrderPaymentData({ data: response.data, year, month }));
      // dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

  export const downloadXlsEndpoint = (filename, userId ,type = 'excel') => async (dispatch) => {
    try {
      const response = await axios.post(
        `${env_URL_SERVER}download/${filename}`,
        {
          filename: filename,
          user_id: userId,
        },
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if(type == 'excel') {
        FileSaver.saveAs(blob, "VendorInvoiceList.xlsx");
      }else {
        FileSaver.saveAs(blob, "VendorInvoiceList.pdf");
      }

    } catch (error) {
      console.log("error", error);
    }
  };

export default pmaSlice.reducer;
