import {configureStore} from "@reduxjs/toolkit"
import openModalReducer from "./features/openModal/openModalSlice"
import openToastReducer from "./features/openToast/openToastSlice"
export const makeStore = ()=> {
    return configureStore({
        reducer: {
            openModal: openModalReducer,
            openToast: openToastReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']