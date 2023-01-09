import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataset: null,
}

export const datasetSlice = createSlice({
    name: 'datasetGrid',
    initialState,
    reducers: {
        setDatasetGrid: (state, action) => {
            state.dataset = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDatasetGrid } = datasetSlice.actions;

export default datasetSlice.reducer;