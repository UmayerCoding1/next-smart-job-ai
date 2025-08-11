import { createSlice } from "@reduxjs/toolkit";


interface DashboardState {
    isOpen: boolean
}


const initialState: DashboardState = {
   isOpen: false
}

export const  dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        toggle: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggle } = dashboardSlice.actions;

export default dashboardSlice.reducer;