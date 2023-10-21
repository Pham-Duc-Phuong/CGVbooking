import { createSlice } from "@reduxjs/toolkit";
import { UserByAccessToken, userLogin } from "types";
import { getAccessToken } from "utils";
import { ThongTinTaiKhoanThunk, loginThunk } from ".";

type quanLyNguoiDungInitialState = {
    userLogin?: userLogin | UserByAccessToken
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
        logOut: (state) => {
            localStorage.removeItem('accessToken')
            state.accessToken = undefined
            state.userLogin = undefined
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginThunk.fulfilled, (state, { payload }) => {
                state.accessToken = payload.accessToken
                localStorage.setItem('accessToken', payload.accessToken)
                state.isFetchLoading = false
            })
            .addCase(loginThunk.pending, (state) => {
                state.isFetchLoading = true
            })
            .addCase(loginThunk.rejected, (state) => {
                state.isFetchLoading = false
            })
            .addCase(ThongTinTaiKhoanThunk.fulfilled, (state, {payload}) => {
                state.userLogin = payload
            })
    },
})
export const { actions: quanLyNguoiDungActions, reducer: quanLyNguoiDungReducer } = quanLyNguoiDungSlice