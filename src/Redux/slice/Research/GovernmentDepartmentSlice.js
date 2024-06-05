import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { env_URL_SERVER, updatedGovernmentDepartmentData } from "../../helper";

const initialState = {
  GovernmentDepartmentData: [],
  formSubmissionStatus: "",
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

export const governmentdepartment = createSlice({
  name: "governmentdepartment",
  initialState,
  reducers: {
    setGovermentDepartmentData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.GovernmentDepartmentData = updatedGovernmentDepartmentData(data.data, year, month);
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
  setGovermentDepartmentData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setFilters,
  setInitialState,
  setSorting,
  setFormSubmissionStatus,
} = governmentdepartment.actions;

export const getGovernmentDepartmentData = (payloadObj, year, month) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getResearchGovtAgencies`,
      payloadObj
    );

    dispatch(setGovermentDepartmentData({ data: response.data, year, month }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const addGovernmentDepartment = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}addResearchGovtAgencies`,
      payload
    );
    dispatch(setFormSubmissionStatus("success"));
    return response;
  } catch (error) {
    console.log(error);
    dispatch(setFormSubmissionStatus("error"));
    throw error;
  }
};

export const editGovernmentDepartment = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}editResearchGovtAgencies`,
      payload
    );
    dispatch(setFormSubmissionStatus("success"));
    // return response;
  } catch (error) {
    dispatch(setFormSubmissionStatus("error"));
    // throw error;
  }
};

export const deleteGovernmentDepartment = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${env_URL_SERVER}deleteResearchGovtAgencies`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleRefresh = (payload) => async (dispatch) => {};
export default governmentdepartment.reducer;