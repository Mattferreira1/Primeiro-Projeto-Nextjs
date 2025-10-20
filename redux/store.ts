import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./User/userSlice"
import { useDispatch, useSelector } from "react-redux"



export const store = configureStore({
    reducer:{
        user: userSlice.reducer
    }
})

// type RootState = ReturnType<typeof store.getState>

// type Dispatch = typeof store.dispatch

// export const userAppDispatch = useDispatch.withTypes<Dispatch>()
// export const userAppSelector = useSelector.withTypes<RootState>()