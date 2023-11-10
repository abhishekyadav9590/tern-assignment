import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface AppliedJobs {
    data: Array<object>;
}

const initialState: AppliedJobs = {
    data: []
};

export const submitNewApplication = createAsyncThunk(
    'jobs/apply',
    async (data: any) => {
        console.log('params:', data)
        return data
    }
)
export const appliedJobSlice = createSlice({
    name: 'applied',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitNewApplication.fulfilled, (state, action) => {
            state.data.push({
                job: action.payload.job,
                candidate: action.payload.candidate,
            });
        });
    },
})

export default appliedJobSlice.reducer;
