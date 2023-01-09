import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataset: null,
}

export const datasetSlice = createSlice({
    name: 'datasetGrid',
    initialState,
    reducers: {
        setDatasetSamples: (state, action) => {
            state.dataset = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDatasetSamples } = datasetSlice.actions;

export default datasetSlice.reducer;