import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "types";
import { getAccessToken } from "utils";
import { loginThunk } from ".";

type quanLyNguoiDungInitialState = {
    userLogin?: userLogin
    isFetchLoading?: boolean
    accessToken?: string
}

const initialState: quanLyNguoiDungInitialState = {
    accessToken: getAccessToken()
}

export const quanLyNguoiDungSlice = createSlice({
    name: 'QuanLyNguoiDung',
    initialState,
    reducers: {
        logOut:(state) => {
            localStorage.removeItem('accessToken')
            state.accessToken = undefined
            state.userLogin = undefined
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginThunk.fulfilled, (state, {payload}) => {
                state.accessToken = payload.accessToken
                localStorage.setItem('accessToken', payload.accessToken)
            })
    },
})
export const { actions: quanLyNguoiDungActions, reducer: quanLyNguoiDungReducer } = quanLyNguoiDungSlice