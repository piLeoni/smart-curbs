import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import datasetGridReducer from './slices/datasetGridSlice'
import datasetSamplesReducer from './slices/datasetSamplesSlice'
import datasetBusLineReducer from './slices/datasetBusLineSlice'

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        counter: counterReducer,
        datasetGrid: datasetGridReducer,
        datasetSamples: datasetSamplesReducer,
        datasetBusLine: datasetBusLineReducer,

    },
})