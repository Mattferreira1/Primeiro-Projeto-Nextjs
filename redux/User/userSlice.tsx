import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id:string
    email:String,
    password:String,
}

type InitialState={
    user: User | null
}


const initialState: InitialState = {
    user: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        userLogin: (state, action:PayloadAction<User> )=>{
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        userLogout:(state, action)=>{
            state.user = null;
            localStorage.removeItem("user");
        }
    }
})

export const {userLogin, userLogout}= userSlice.actions
export default userSlice