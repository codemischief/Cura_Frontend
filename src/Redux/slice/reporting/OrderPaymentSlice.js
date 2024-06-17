import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import {
  env_URL_SERVER,
  updatedOrderPaymentData,
  updatedResponsePmaData,
} from "../../helper";
import FileSaver from "file-saver";

const initialState = {
  orderPaymentData: [],
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
  name: "orderPayment",
  initialState,
  reducers: {
    setOrderPaymentData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.orderPaymentData = updatedOrderPaymentData(data.data, year, month);
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
    setOrderPayFilters: (state, { payload }) => {
      state.filter = { ...payload };
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
    resetOrderPaymentData: (state, { payload }) => {
      state.orderPaymentData = [];
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setOrderPaymentData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setOrderPayFilters,
  setInitialState,
  setSorting,
  resetOrderPaymentData,
} = pmaSlice.actions;

export const getOrderPaymentData =
  (payloadObj, year, month) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}getReportOrderPayment`,
        payloadObj
      );

      dispatch(setOrderPaymentData({ data: response.data, year, month }));
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadPaymentDataXls =
  (payloadObj, year, month ,type) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}getReportOrderPayment`,
        payloadObj
      );
      if ((response.data.filename, payloadObj.user_id)) {
        await dispatch(
          downloadXlsEndpoint(response.data.filename, payloadObj.user_id , type)
        );
      }
      dispatch(setStatus("success"));
    } catch (err) {
      console.log("err", err);
      dispatch(setStatus("error"));
    }
  };

export const downloadXlsEndpoint = (filename, userId ,type='excel') => async (dispatch) => {
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
      FileSaver.saveAs(blob, "OrderPaymentList.xlsx");
    }else {
      FileSaver.saveAs(blob, "OrderPaymentList.pdf");
    }

  } catch (error) {
    console.log("error", error);
  }
};
export default pmaSlice.reducer;
