import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    // false means user is not logged in initially
    status: false,
    
    // no user data available initially
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    // reducers are functions which update redux state
    reducers: {

        // login reducer, runs after successful login
        login: (state, action) => {
            state.status = true
            
            // storing logged in user data in redux
            // action.payload contains data passed during dispatch
            state.userData = action.payload.userData
        },
        
        // runs when user logs out
        logout: (state) => {
            state.status = false

            // removing stored user data
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer