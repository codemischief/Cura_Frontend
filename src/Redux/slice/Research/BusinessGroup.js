import FileSaver from "file-saver";
import axios from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { env_URL_SERVER, updatedResponsePmaData } from "../../helper";
import { moduleMethods } from "../../../utils/axios";
import { v4 as uuidv4 } from "uuid";

const modulename = "ResearchCOCAndBusinessGroup";

const initialState = {
  BusinessGroupData: [],
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

export const businessgroup = createSlice({
  name: "businessgroup",
  initialState,
  reducers: {
    setBusinessGroup: (state, { payload }) => {
      const { data, year, month } = payload;
      state.BusinessGroupData = data.data;
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
  setBusinessGroup,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setFilters,
  setInitialState,
  setSorting,
  setFormSubmissionStatus,
} = businessgroup.actions;

export const getBusinessGroup = (payloadObj) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `getResearchCOCAndBusinessGroup`,
      payloadObj
    );

    dispatch(setBusinessGroup({ data: response.data }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const addBusinessGroup = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}addResearchCOCAndBusinessGroup`,
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
    console.log(error);
    dispatch(setFormSubmissionStatus("error"));
    throw error;
  }
};

export const editBusinessGroup = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `editResearchCOCAndBusinessGroup`,
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

export const downloadBusinessGroup = (payloadObj ,type) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(`getResearchCOCAndBusinessGroup`, payloadObj);
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
      FileSaver.saveAs(blob, "BusinessGroupData.xlsx");
    }else {
      FileSaver.saveAs(blob, "BusinessGroupData.pdf");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteBusinessGroup = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `deleteResearchCOCAndBusinessGroup`,
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
export default businessgroup.reducer;
