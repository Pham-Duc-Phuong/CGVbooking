import { createSlice } from "@reduxjs/toolkit";
import { LayDanhSachPhim } from "types";
import { LayDanhSachPhimThunk, LayThongTinPhimThunk } from ".";

type QuanLyPhimInitialState = {
    LayDanhSachPhim?: LayDanhSachPhim[]
    ThongTinPhim?: LayDanhSachPhim
    isLoadingPhim?: boolean
}

const initialState: QuanLyPhimInitialState = {

}
const QuanLyPhimSlice = createSlice({
    name: 'QuanLyPhimSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(LayDanhSachPhimThunk.fulfilled, (state, { payload }) => {
                state.LayDanhSachPhim = payload
                state.isLoadingPhim = false
            })
            .addCase(LayDanhSachPhimThunk.pending, (state) => {
                state.isLoadingPhim = true
            })
            .addCase(LayDanhSachPhimThunk.rejected, (state) => {
                state.isLoadingPhim = false
            })
            .addCase(LayThongTinPhimThunk.fulfilled, (state, { payload }) => {
                state.ThongTinPhim = payload
                state.isLoadingPhim = false
            })
            .addCase(LayThongTinPhimThunk.pending, (state) => {
                state.isLoadingPhim = true
            })
            .addCase(LayThongTinPhimThunk.rejected, (state) => {
                state.isLoadingPhim = false
            })
    },
})
export const { actions: QuanLyPhimActions, reducer: QuanLyPhimReducer } = QuanLyPhimSlice