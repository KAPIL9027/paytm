import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface OpenModalState {
    value: boolean
}

const initialState: OpenModalState = {
    value: false
}

export const openModalSlice = createSlice({
    name: 'openModal',
    initialState,
    reducers: {
        setValue: (state,action: PayloadAction<boolean>)=> {
            console.log('hit')
            state.value = action.payload
        }
    }
})

export const {setValue} = openModalSlice.actions
export default openModalSlice.reducer