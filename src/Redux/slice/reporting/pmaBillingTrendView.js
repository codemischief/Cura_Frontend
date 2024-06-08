import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FileSaver from "file-saver";
import {
  env_URL_SERVER,
  pmaBillingTrendView,
} from "../../helper";

const initialState = {
  pmaBillingTrendView: [],
  totalAmount : {},
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
  name: "pmaBillingTrendView",
  initialState,
  reducers: {
    setPmaBillingTrendView: (state, { payload }) => {
      const { data, year, month } = payload;
      state.pmaBillingTrendView = pmaBillingTrendView(data.data, year, month);
      console.log(payload.data)
      console.log(payload.data.total)
      state.totalCount = payload.data.total_count;
      state.totalAmount = payload.data.total;
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
    setPmaBillingTrendViewFilters: (state, { payload }) => {
      state.filter = { ...payload };
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
    resetData: (state, { payload }) => {
      state.pmaClientReceivable = [];
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setPmaBillingTrendView,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setPmaBillingTrendViewFilters,
  setInitialState,
  setSorting,
  resetData
} = pmaSlice.actions;

export const getPmaBillingTrendViewData =
  (payloadObj, year, month) => async (dispatch) => {
    console.log("called");
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportPMABillingTrendView`,
        payloadObj
      );
      console.log(response)  
      dispatch(setPmaBillingTrendView({ data: response.data, year, month }));
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadPmaBillingTrendView =
  (payloadObj, year, month) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportPMABillingTrendView`,
        payloadObj
      );
      if ((response.data.filename, payloadObj.user_id)) {
        await dispatch(
          downloadXlsEndpoint(response.data.filename, payloadObj.user_id)
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
  export const downloadXlsEndpoint = (filename, userId) => async (dispatch) => {
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
      FileSaver.saveAs(blob, "PmaBillingTrendView.xlsx");
    } catch (error) {
      console.log("error", error);
    }
  };
export default pmaSlice.reducer;
