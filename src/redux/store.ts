import { configureStore } from "@reduxjs/toolkit";
import saveListSlice from "./saveList/savelistSlice";
import filterSlice from "./filter/filterSlice";

export const store = configureStore({
    reducer: {
        SaveList: saveListSlice,
        Filters: filterSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;