import FileSaver from "file-saver";
import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { env_URL_SERVER, updatedResponsePmaData } from "../../helper";
import { moduleMethods } from "../../../utils/axios";
import { v4 as uuidv4 } from "uuid";

const modulename = "ResearchProspect";

const initialState = {
  PropectusData: [],
  formSubmissionStatus: "",
  status: "",
  filter: {},
  countPerPage: 15,
  pageNo: 1,
  totalCount: 0,
  isLoading: false,
  isSuccess: false,
  sorting: {
    sort_by: "id",
    sort_order: "desc",
  },
};

export const prospect = createSlice({
  name: "prospect",
  initialState,
  reducers: {
    setPropectusData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.PropectusData = updatedResponsePmaData(data.data, year, month);
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
    setFilters: (state, { payload }) => {
      state.filter = payload;
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
    setFormSubmissionStatus: (state, { payload }) => {
      state.formSubmissionStatus = payload;
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setPropectusData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setFilters,
  setInitialState,
  setSorting,
  setFormSubmissionStatus,
} = prospect.actions;

export const getPropect = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `getResearchProspect`,
      payloadObj
    );

    dispatch(setPropectusData({ data: response.data }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const addProspectData = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}addResearchProspect`,
      {
        ...payload,
        reqid: uuidv4(),
        modulename,
        actionname: moduleMethods.add + modulename,
      },
      {
        appendLog: true, // Set to true to append common payload
      }
    );
    dispatch(setFormSubmissionStatus("success"));
    return response;
  } catch (error) {
    console.log(error);
    dispatch(setFormSubmissionStatus("error"));
    throw error;
  }
};

export const editProspectData = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `editResearchProspect`,
      {
        ...payload,
        reqid: uuidv4(),
        modulename,
        actionname: moduleMethods.edit + modulename,
      },
      {
        appendLog: true, // Set to true to append common payload
      }
    );
    dispatch(setFormSubmissionStatus("success"));
    // return response;
  } catch (error) {
    dispatch(setFormSubmissionStatus("error"));
    // throw error;
  }
};

export const downloadProspectusDataXls = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(`getResearchProspect`, payloadObj);
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
      `download/${filename}`,
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
    FileSaver.saveAs(blob, "ProspectData.xlsx");
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteProspect = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `deleteResearchProspect`,
      {
        ...payload,
        reqid: uuidv4(),
        modulename,
        actionname: moduleMethods.delete + modulename,
      },
      {
        appendLog: true, // Set to true to append common payload
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleRefresh = (payload) => async (dispatch) => {};
export default prospect.reducer;
