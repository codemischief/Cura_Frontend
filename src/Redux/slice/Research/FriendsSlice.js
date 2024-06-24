import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { env_URL_SERVER, updatedFriendsData } from "../../helper";
import FileSaver from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { moduleMethods } from "@/utils/axios";
const modulename = "ResearchFriends";
const initialState = {
  FriendsData: [],
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

export const friends = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriendsData: (state, { payload }) => {
      const { data, year, month } = payload;
      state.FriendsData = updatedFriendsData(data.data, year, month);
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
  setFriendsData,
  setStatus,
  setPageNumber,
  setCountPerPage,
  setFilters,
  setInitialState,
  setSorting,
  setFormSubmissionStatus,
} = friends.actions;

export const getFriendsData = (payloadObj, year, month) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getResearchFriends`,
      payloadObj
    );

    dispatch(setFriendsData({ data: response.data, year, month }));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export const addFriends = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}addResearchFriends`,
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

export const editFriends = (payload) => async (dispatch) => {
  try {
    dispatch(setFormSubmissionStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}editResearchFriends`,
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
export const downloadFriendsDataXls = (payloadObj ,type) => async (dispatch) => {
  try {
    dispatch(setStatus("loading"));
    const response = await axios.post(
      `${env_URL_SERVER}getResearchFriends`,
      payloadObj
    );
    if ((response.data.filename, payloadObj.user_id)) {
      await dispatch(
        downloadXlsEndpoint(response.data.filename, payloadObj.user_id ,type)
      );
    }
    dispatch(setStatus("success"));

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
      FileSaver.saveAs(blob, "FriendsData.xlsx");
    }else {
      FileSaver.saveAs(blob, "FriendsData.pdf");
    }
  } catch (error) {
    console.log("error", error);
  }
};


export const deleteFriends = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${env_URL_SERVER}deleteResearchFriends`,
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
export default friends.reducer;
