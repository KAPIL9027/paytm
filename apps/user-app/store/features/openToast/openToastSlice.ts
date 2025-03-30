import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
    value: boolean
}
const initialState: InitialStateType = {
    value: false
}
export const openToastSlice = createSlice({
    name: 'openToast',
    initialState,
    reducers: {
        setOpenToast: (state,action: PayloadAction<boolean>)=>{
            state.value = action.payload;
        }
    }

})

export const {setOpenToast} = openToastSlice.actions;
export default openToastSlice.reducer;