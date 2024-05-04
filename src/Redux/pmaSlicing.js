import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  count_per_page:15,
  page_no:1,
  total_count:0,
  
};
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;

export const pmaSlicing = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = pmaSlicing.actions;

export const example = () => async (dispatch) => {
  try {
    const nodeId = window.location.pathname.split("/")[2];
    const response = await axios.post(
      `${env_URL_SERVER}getClientPMAAgreement`,
      { user_id: 1234, month: 1, year: 2021, filter: [], pg_no: 1, pg_size: 30 }
    );
    console.log(response, "response");
  } catch (err) {}
};
export default pmaSlicing.reducer;
