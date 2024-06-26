import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import FileSaver from "file-saver";
import {
  env_URL_SERVER,
  clientOrderReceiptMismatchDetails,
} from "../../helper";

const initialState = {
  clientOrderReceiptMismatchDetails: [],
  totalAmount: {},
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
  name: "clientOrderReceiptMismatchDetails",
  initialState,
  reducers: {
    setClientOrderReceiptMismatchDetails: (state, { payload }) => {
      const { data, year, month } = payload;
      state.clientOrderReceiptMismatchDetails =
        clientOrderReceiptMismatchDetails(data.data, year, month);
      state.totalCount = payload.data.total_count;
      // state.totalAmount = payload.data.total;
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
    setInitialState: (state) => {
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
    setClientOrderReceiptMismatchDetailsFilters: (state, { payload }) => {
      state.filter = { ...payload };
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
    resetFilters: (state, { payload }) => {
      state.filter = [];
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setClientOrderReceiptMismatchDetails,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setClientOrderReceiptMismatchDetailsFilters,
  setInitialState,
  setSorting,
  resetFilters
} = pmaSlice.actions;

export const getClientOrderReceiptMismatchDetails =
  (payloadObj, year, month) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportClientOrderReceiptMismatchDetails`,
        payloadObj
      );
      dispatch(
        setClientOrderReceiptMismatchDetails({
          data: response.data,
          year,
          month,
        })
      );
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadClientOrderReceiptMismatchDetails =
  (payloadObj,type) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportClientOrderReceiptMismatchDetails`,
        payloadObj
      );
      if ((response.data.filename, payloadObj.user_id)) {
        await dispatch(
          downloadXlsEndpoint(response.data.filename, payloadObj.user_id ,type)
        );
      }
      dispatch(setStatus("success"));
      // return response.data;
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
      FileSaver.saveAs(blob, "ClientOrderReceiptMismatchDetails.xlsx");
    }else {
      FileSaver.saveAs(blob, "ClientOrderReceiptMismatchDetails.pdf");
    }
  } catch (error) {
    console.log("error", error);
  }
};
export default pmaSlice.reducer;
