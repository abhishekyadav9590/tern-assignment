import {createSlice} from '@reduxjs/toolkit';

interface AppliedJobs {
    data: Array<object>;
}

const initialState: AppliedJobs = {
    data: []
};
export const appliedJobSlice = createSlice({
    name: 'applied',
    initialState,
    reducers: {
        addApplied: (state, action) => {
            state.data.push(action.payload);
        },
    }
})

export const {addApplied} = appliedJobSlice.actions;
export default appliedJobSlice.reducer;
