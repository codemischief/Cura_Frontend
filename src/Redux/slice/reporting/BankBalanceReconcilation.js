import { createSlice } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import FileSaver from "file-saver";
import {
    env_URL_SERVER
} from "../../helper";

const initialState = {
    bankBalanceReconcilation: {
        bankpmtrcps: {},
        bankstbalance: {}
    },
    isLoading: false,
    isSuccess: false,

};

export const bankBalanceReconcilation = createSlice({
    name: "bankBalanceReconcilation",
    initialState,
    reducers: {
        setBankBalanceReconcilation: (state, { payload }) => {
            state.isLoading = true
            const { data } = payload;
            state.bankBalanceReconcilation = data.data
        },
        setInitialState: (state) => {
            (state.isLoading = false),
                (state.isSuccess = false),
                state.bankBalanceReconcilation = {
                    bankpmtrcps: {},
                    bankstbalance: {}
                }

        },
        setLoading: (state, { payload }) => {
            state.isLoading = payload
        }
    },
});

// reducer
// Action creators are generated for each case reducer function
export const {
    setBankBalanceReconcilation,
    setInitialState,
    setLoading
} = bankBalanceReconcilation.actions;

export const getBankBalanceReconcilation =
    (payloadObj, year, month) => async (dispatch) => {
        dispatch(setLoading(true))

        try {
            const response = await axios.post(
                `${env_URL_SERVER}reportBankBalanceReconciliation`,
                payloadObj
            );

            dispatch(setBankBalanceReconcilation({ data: response.data, year, month }));
            dispatch(setLoading(false))

        } catch (err) {
            dispatch(setLoading(false))
            console.log(err);
        }
    };

export const downloadbankBalanceReconcillation =
    (payloadObj, type) => async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const response = await axios.post(
                `${env_URL_SERVER}reportBankBalanceReconciliation`,
                payloadObj
            );
            if ((response.data.filename, payloadObj.user_id)) {
                await dispatch(
                    downloadXlsEndpoint(response.data.filename, payloadObj.user_id, type)
                );
            }
            dispatch(setLoading(false))

        } catch (err) {
            dispatch(setLoading(false))
            console.log(err);

        }
    };
export const downloadXlsEndpoint = (filename, userId, type = 'excel') => async (dispatch) => {
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
        if (type == 'excel') {
            FileSaver.saveAs(blob, "BankBalanceReconcilation.xlsx");
        } else {
            FileSaver.saveAs(blob, "BankBalanceReconcilation.pdf");
        }

    } catch (error) {
        console.log("error", error);
    }
};
export default bankBalanceReconcilation.reducer;
