import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataset: null,
}

export const datasetSlice = createSlice({
    name: 'datasetBusLine',
    initialState,
    reducers: {
        setDatasetBusLine: (state, action) => {
            state.dataset = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDatasetBusLine } = datasetSlice.actions;

export default datasetSlice.reducer;