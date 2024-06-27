import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { env_URL_SERVER, updatedEmployerData } from "../../helper";
import FileSaver from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { moduleMethods } from "@/utils/axios";
const modulename = "ResearchEmployer";
const initialState = {
  EmployerData: [],
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

export const employer = createSlice({
  name: "employer",
  initialState,
  reducers: {
    setEmployerData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.EmployerData = updatedEmployerData(data.data, year, month);
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
 setEmployerData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setFilters,
  setInitialState,
  setSorting,
  setFormSubmissionStatus,
  resetFilters
} = employer.actions;

export const getEmployer = (payloadObj, year, month) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getResearchEmployer`,
      payloadObj
    );

    dispatch(setEmployerData({ data: response.data, year, month }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const addEmployerData = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}addResearchEmployer`,
      {
        ...payload,
        reqid: uuidv4(),
        modulename,
        actionname: moduleMethods.add + modulename,
      },
    );
    dispatch(setFormSubmissionStatus("success"));
    return response;
  } catch (error) {
    dispatch(setFormSubmissionStatus("error"));
    throw error;
  }
};

export const editEmployerData = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}editResearchEmployer`,
      {
        ...payload,
        reqid: uuidv4(),
        modulename,
        actionname: moduleMethods.edit + modulename,
      },
    );
    dispatch(setFormSubmissionStatus("success"));
    // return response;
  } catch (error) {
    dispatch(setFormSubmissionStatus("error"));
    // throw error;
  }
};
export const downloadEmployerDataXls = (payloadObj ,type) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getResearchEmployer`,
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
      FileSaver.saveAs(blob, "EmployerData.xlsx");
    }else {
      FileSaver.saveAs(blob, "EmployerData.pdf");
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const deleteEmployer = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${env_URL_SERVER}deleteResearchEmployer`,
      {
        ...payload,
        reqid: uuidv4(),
        modulename,
        actionname: moduleMethods.delete + modulename,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleRefresh = (payload) => async (dispatch) => {};
export default employer.reducer;
