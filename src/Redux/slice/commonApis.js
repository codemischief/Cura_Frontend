import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
  countryData: [],
  status: "",
};

export const commonApis = createSlice({
  name: "commonApis",
  initialState,
  reducers: {
    setCountriesData: (state, { payload }) => {
      state.countryData = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { setCountriesData, setStatus } = commonApis.actions;

export const getCountries = () => async (dispatch) => {
  try {
    const data = {
      user_id: 1234,
      rows: ["id", "name"],
      filters: [],
      sort_by: [],
      order: "asc",
      pg_no: 0,
      pg_size: 0,
    };
    dispatch(setStatus("loading"));
    const response = await axios.post(`getCountries`, data);
    dispatch(setCountriesData(response.data.data));
    dispatch(setStatus("success"));
  } catch (err) {
    dispatch(setStatus("error"));
  }
};

export default commonApis.reducer;
