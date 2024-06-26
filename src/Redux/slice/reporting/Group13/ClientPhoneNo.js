import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import FileSaver from "file-saver";
import { env_URL_SERVER } from "../../../helper";

const initialState = {
  clientPhoneNo: [],
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

export const ClientsPhoneNoSlice = createSlice({
  name: "clientsPhoneNo",
  initialState,
  reducers: {
    setClientPhoneNoData: (state, { payload }) => {
      const { data } = payload.data;

      state.clientPhoneNo = (data);
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
      state.clientPhoneNo= []
    },
    setClientPhoneNoFilter: (state, { payload }) => {
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

export const {
  setClientPhoneNoData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setClientPhoneNoFilter,
  setInitialState,
  setSorting,
  resetFilters
} = ClientsPhoneNoSlice.actions;

export const getClientsPhoneNo = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}reportClientPhoneNos`,
      payloadObj
    );

    dispatch(setClientPhoneNoData({ data: response.data }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const downloadClientsPhoneNo = (payloadObj ,type) => async (
  dispatch , 
) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}reportClientPhoneNos`,
      payloadObj
    );
    if ((response.data.filename, payloadObj.user_id)) {
      await dispatch(
        downloadXlsEndpoint(response.data.filename, payloadObj.user_id , type)
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

export const downloadXlsEndpoint = (filename, userId , type='excel') => async (dispatch) => {

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
      FileSaver.saveAs(blob, "ClientPhoneNo.xlsx");
    }else {
      FileSaver.saveAs(blob, "ClientPhoneNo.pdf");
    }

  } catch (error) {
    console.log("error", error);
  }
};
export default ClientsPhoneNoSlice.reducer;
