import { createSlice } from "@reduxjs/toolkit";


type initialStateType = {
    industries: null | string[];
    locations: null | string[];
    founded_year: null | string;
    revenue: null | string;
}

const initialState: initialStateType = {
    industries: null,
    locations: null,
    founded_year: null,
    revenue: null
}

const filterSlice = createSlice({
    name: "Filters",
    initialState,
    reducers: {
        setIndustry: (state, action) => {
            if (state.industries) {
                let exist = false;
                for (let elem of state.industries) {
                    if (elem == action.payload) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    state.industries.push(action.payload);
                }
            }
            else {
                state.industries = [action.payload];
            }
        },
        setLocation: (state, action) => {
            if (state.locations) {
                let exist = false;
                for (let elem of state.locations) {
                    if (elem == action.payload) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    state.locations.push(action.payload);
                }
            }
            else {
                state.locations = [action.payload];
            }
        },
        setRevenue: (state, action) => {
            state.revenue = action.payload;
        },
        resetAll: (state) => {
            state.industries = null;
            state.founded_year = null;
            state.locations = null;
            state.revenue = null;
        },
        removeIndustry: (state, action) => {
            if (state.industries) {
                state.industries = state.industries.filter((item) => item !== action.payload);
            }
        },
        removeLocation: (state, action) => {
            if (state.locations) {
                state.locations = state.locations.filter((item) => item != action.payload);
            }
        },
        removeFoundationYear: (state) => {
            state.founded_year = null;
        },
        removeRevenue: (state) => {
            state.revenue = null;
        }
    }
})


export const {
    setIndustry,
    setLocation,
    setRevenue,
    resetAll,
    removeIndustry,
    removeLocation,
    removeFoundationYear,
    removeRevenue
} = filterSlice.actions;

export default filterSlice.reducer