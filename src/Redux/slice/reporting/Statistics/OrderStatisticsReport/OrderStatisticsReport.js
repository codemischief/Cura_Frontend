import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../../utils/axios";
import FileSaver from "file-saver";
import {
  env_URL_SERVER,updateOrderStatisticsReport
} from "../../../../helper";

const initialState = {
  orderStatisticsReport: [],
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

export const orderStatisticsReport = createSlice({
  name: "orderStatisticsReport",
  initialState,
  reducers: {
    setOrderStatisticsReport: (state, { payload }) => {
      const { data } = payload;
      state.orderStatisticsReport = data.data;
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
      state.orderStatisticsReport=[]

    },
    setOrderStatisticsReportFilters: (state, { payload }) => {
      state.filter = { ...payload };
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
  },
});

export const {
  setOrderStatisticsReport,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setOrderStatisticsReportFilters,
  setInitialState,
  setSorting,
} = orderStatisticsReport.actions;

export const getOrderStatisticsReport =
  (payloadObj) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportOrderStatistics`,
        payloadObj
      );

      dispatch(setOrderStatisticsReport({ data: response.data}));
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadOrderStatisticsReport =
  (payloadObj) => async (dispatch) => {
    
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportOrderStatistics`,
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
    FileSaver.saveAs(blob, "OrderStatisticsReport.xlsx");
  } catch (error) {
    console.log("error", error);
  }
};
export default orderStatisticsReport.reducer;
