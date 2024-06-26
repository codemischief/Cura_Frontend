import FileSaver from "file-saver";
import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { env_URL_SERVER, updatedResponsePmaData } from "../../helper";
import { moduleMethods } from "../../../utils/axios";
import { v4 as uuidv4 } from "uuid";

const modulename = "ResearchArchitect";

const initialState = {
  ArchitectData: [],
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

export const architect = createSlice({
  name: "architect",
  initialState,
  reducers: {
    setArchitect: (state, { payload }) => {
      const { data, year, month } = payload;
      state.ArchitectData = data.data;
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
    resetFilters: (state, { payload }) => {
      state.filter = [];
    },
  },
});

// reducer
// Action creators are generated for each case reducer function
export const {
  setArchitect,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setFilters,
  setInitialState,
  setSorting,
  setFormSubmissionStatus,
  resetFilters
} = architect.actions;

export const getArchitect = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `getResearchArchitect`,
      payloadObj
    );

    dispatch(setArchitect({ data: response.data }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const addArchitect = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}addResearchArchitect`,
      {
        ...payload,
        reqid: uuidv4(),
        modulename,
        actionname: moduleMethods.add + modulename,
      },
      {
        appendLog: true
      }
    );
    dispatch(setFormSubmissionStatus("success"));
    return response;
  } catch (error) {
    dispatch(setFormSubmissionStatus("error"));
    throw error;
  }
};

export const editArchitect = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `editResearchArchitect`,
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
    return response;
  } catch (error) {
    dispatch(setFormSubmissionStatus("error"));
    // throw error;
  }
};

export const downloadArchitect = (payloadObj ,type) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(`getResearchArchitect`, payloadObj);
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
export const downloadXlsEndpoint = (filename, userId ,type='excel') => async (dispatch) => {
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
    if(type == 'excel') {
      FileSaver.saveAs(blob, "ArchitectData.xlsx");
    }else {
      FileSaver.saveAs(blob, "ArchitectData.pdf");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteResearchArchitect = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `deleteResearchArchitect`,
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
export default architect.reducer;
