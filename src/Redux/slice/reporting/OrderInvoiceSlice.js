import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {
  env_URL_SERVER,
  updatedOrderInvoiceData,
  updatedResponsePmaData,
} from "../../helper";
import FileSaver from "file-saver";

const initialState = {
  orderInvoiceData: [],
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
  name: "orderInvoice",
  initialState,
  reducers: {
    setOrderInvoiceData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.orderInvoiceData = updatedOrderInvoiceData(data.data, year, month);
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
    setOrderInvoiceFilters: (state, { payload }) => {
      state.filter = { ...payload };
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
    resetData: (state, { payload }) => {
      state.orderInvoiceData = [];
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setOrderInvoiceData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setOrderInvoiceFilters,
  setInitialState,
  setSorting,
  resetData
} = pmaSlice.actions;

export const getOrderInvoiceData =
  (payloadObj, year, month) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}getReportOrderInvoice`,
        payloadObj
      );

      dispatch(setOrderInvoiceData({ data: response.data, year, month }));
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadInvoiceDataXls =
  (payloadObj, year, month ,type) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}getReportOrderInvoice`,
        payloadObj
      );

      if ((response.data.filename, response.data.user_id)) {
        await dispatch(
          downloadXlsEndpoint(response.data.filename, response.data.user_id ,type)
        );
      }
      dispatch(setStatus("success"));
      // dispatch(setOrderPaymentData({ data: response.data, year, month }));
      // dispatch(setStatus("success"));
    } catch (err) {
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
        FileSaver.saveAs(blob, "OrderInvoiceList.xlsx");
      }else {
        FileSaver.saveAs(blob, "OrderInvoiceList.pdf");
      }

    } catch (error) {
      console.log("error", error);
    }
  };

export default pmaSlice.reducer;
