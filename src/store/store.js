import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

// create the central redux store for the application
const store = configureStore({
    // register all reducers that will manage application state
    reducer: {
        // stores authentication related data such as user information and login status
        auth: authReducer
    }
})

export default store