import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "react-native-config";
import * as Keychain from "react-native-keychain";
import Snackbar from "react-native-snackbar";

export const getSaveList = createAsyncThunk(
    "SaveList/getSaveList",
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await Keychain.getGenericPassword();
            const res = await axios.get(`${Config.BASE_URL}/api/v1/user/get-save-list`, {
                headers: {
                    Authorization: accessToken ? accessToken.password : undefined
                }
            });

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


type initialStateType = {
    list: string[];
    isLoding: boolean;
    isError: boolean;
}

const initialState: initialStateType = {
    list: [],
    isLoding: false,
    isError: false
}

export const saveListSlice = createSlice({
    name: "SaveList",
    initialState,
    reducers: {
        setInList: (state, action) => {
            // console.log(action.payload);
            state.list.push(action.payload);
        },
        setSaveList: (state, action) => {
            state.list = action.payload;
        },
        removeFromList: (state, action) => {
            state.list = state.list.filter((item) => item !== action.payload);
        },
        clearSaveList: (state) => {
            state.list = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSaveList.pending, (state) => {
                state.isLoding = true;
                state.isError = false;
            })
            .addCase(getSaveList.fulfilled, (state, action) => {
                state.isLoding = false;
                state.isError = false;
                state.list = action.payload;
            })
            .addCase(getSaveList.rejected, (state, action) => {
                state.isLoding = false;
                state.isError = true;
                Snackbar.show({
                    text: action.payload as string,
                    backgroundColor: "#C70039"
                });
            })
    }

})


export const {
    setInList,
    setSaveList,
    removeFromList,
    clearSaveList
} = saveListSlice.actions;
export default saveListSlice.reducer;
