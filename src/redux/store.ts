import { configureStore } from "@reduxjs/toolkit";
import saveListSlice from "./saveList/savelistSlice";

export const store = configureStore({
    reducer: {
        SaveList: saveListSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;