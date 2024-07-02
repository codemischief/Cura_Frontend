import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { env_URL_SERVER, updatedResponsePmaData } from "../helper";
import FileSaver from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { moduleMethods } from "@/utils/axios";
const modulename = "PMABilling";
const initialState = {
  pmaBillingData: [],
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
  name: "pma",
  initialState,
  reducers: {
    setPmaBillingData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.pmaBillingData = updatedResponsePmaData(data.data, year, month);
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
      (state.pmaBillingData = []),
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
    setFilters: (state, { payload }) => {
      state.filter = payload;
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
  setPmaBillingData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setFilters,
  setInitialState,
  setSorting,
  resetFilters,
} = pmaSlice.actions;

export const getPmaBilling = (payloadObj, year, month) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getPMABilling`,
      payloadObj
    );

    dispatch(setPmaBillingData({ data: response.data, year, month }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const addNewInvoices = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(`${env_URL_SERVER}getPMABilling`, {
      ...payloadObj,
      reqid: uuidv4(),
      modulename,
      actionname: moduleMethods.add + modulename,
    });
    dispatch(setStatus("success"));
    return response.data;
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const handleRefresh = (payload) => async (dispatch) => {};
export const downloadPmaBillingDataXls = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getPMABilling`,
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
export const downloadXlsEndpoint =
  (filename, userId, type = "excel") =>
  async (dispatch) => {
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

      if (type == "excel") {
        FileSaver.saveAs(blob, "PmaBillingTable.xlsx");
      } else {
        FileSaver.saveAs(blob, "PmaBillingTable.pdf");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

export const downloadData = (payloadObj, type) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getPMABilling`,
      payloadObj
    );
    if ((response.data.filename, payloadObj.user_id)) {
      await dispatch(
        downloadXlsEndpoint(response.data.filename, payloadObj.user_id, type)
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
export default pmaSlice.reducer;
