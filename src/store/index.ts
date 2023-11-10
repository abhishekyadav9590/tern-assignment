import {configureStore} from "@reduxjs/toolkit";
import jobReducer from "./JobSlice"
import appliedJobReducer from "./AppliedJobSlice"

export const store = configureStore({
    reducer: {
        jobs: jobReducer,
        appliedJob:appliedJobReducer
    },
});
