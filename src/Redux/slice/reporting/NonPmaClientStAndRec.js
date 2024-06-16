import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FileSaver from "file-saver";
import {
  env_URL_SERVER,
  nonPmaClientStAndRec,
} from "../../helper";

const initialState = {
  NonPmaClientStAndRec: [],
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
  name: "nonPmaClientStAndRec",
  initialState,
  reducers: {
    setNonPmaClientStAndRecData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.NonPmaClientStAndRec = nonPmaClientStAndRec(data.data, year, month);
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
    setNonPmaClientStAndRecFilters: (state, { payload }) => {
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
  setNonPmaClientStAndRecData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setNonPmaClientStAndRecFilters,
  setInitialState,
  setSorting,
} = pmaSlice.actions;

export const getNonPmaClientStAndRec =
  (payloadObj, year, month) => async (dispatch) => {
    console.log("called");
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportNonPMAClientStatementsAndReceivables`,
        payloadObj
      );
        
      dispatch(setNonPmaClientStAndRecData({ data: response.data, year, month }));
      dispatch(setStatus("success"));
    } catch (err) {
      dispatch(setStatus("error"));
    }
  };

export const downloadNonPmaClientStAndRec =
  (payloadObj, year, month ,type) => async (dispatch) => {
    try {
      dispatch(setStatus("loading"));
      const response = await axios.post(
        `${env_URL_SERVER}reportNonPMAClientStatementsAndReceivables`,
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
        FileSaver.saveAs(blob, "NonPmaClientStAndRec.xlsx");
      }else {
        FileSaver.saveAs(blob, "NonPmaClientStAndRec.pdf");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
export default pmaSlice.reducer;
