import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import FileSaver from "file-saver";
import {
  env_URL_SERVER,
  updatedEntityReceiptPaymentsData,
} from "../../helper";

const initialState = {
  entityReceiptPaymentsData: [],
  status: "",
  totalAmount : {},
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
  name: "entityReceiptPayments",
  initialState,
  reducers: {
    setEntityReceiptPaymentsData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.entityReceiptPaymentsData = updatedEntityReceiptPaymentsData(data.data, year, month);
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
    setEntityReceiptPaymentsFilters: (state, { payload }) => {
      state.filter = { ...payload };
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
    resetData: (state, { payload }) => {
      state.entityReceiptPaymentsData = [];
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setEntityReceiptPaymentsData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setEntityReceiptPaymentsFilters,
  setInitialState,
  setSorting,
  resetData
} = pmaSlice.actions;

export const getEntityReceiptPaymentsData =
  (payloadObj, year, month) => async (dispatch) => {

    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportMonthlyMarginEntityReceiptPayments`,
        payloadObj
      );

      dispatch(setEntityReceiptPaymentsData({ data: response.data, year, month }));
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadEntityReceiptPaymentsDataXls =
  (payloadObj, type) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportMonthlyMarginEntityReceiptPayments`,
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
        FileSaver.saveAs(blob, "EntityReceiptPayment.xlsx");
      }else {
        FileSaver.saveAs(blob, "EntityReceiptPayment.pdf");
      }

    } catch (error) {
      console.log("error", error);
    }
  };
export default pmaSlice.reducer;
