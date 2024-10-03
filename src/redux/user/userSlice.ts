import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Keychain from "react-native-keychain";
import axios from "axios";
import Snackbar from "react-native-snackbar";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://192.168.43.37:8000/api/v1/user/login", userCredentials);

            const data = await response.data;

            if (response.status === 200) {
                // console.log(data.data);
                const accessToken: string = data.data.token.accessToken as string;

                await Keychain.setGenericPassword("accessToken", accessToken);

                return data.data; // Return user data
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);



export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        loading: false,
        error: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            Keychain.resetGenericPassword();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true
                Snackbar.show({
                    text: action.payload as string,
                    backgroundColor: "#C70039"
                });
            });
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;