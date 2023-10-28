import { createSlice } from "@reduxjs/toolkit";
import { LayDanhSachPhim } from "types";
import { LayDanhSachPhimThunk, LayThongTinPhimThunk } from ".";

type QuanLyPhimInitialState = {
    LayDanhSachPhim?: LayDanhSachPhim[]
    ThongTinPhim?: LayDanhSachPhim
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
            })
            .addCase(LayThongTinPhimThunk.fulfilled, (state, { payload }) => {
                state.ThongTinPhim = payload
            })
    },
})
export const { actions: QuanLyPhimActions, reducer: QuanLyPhimReducer } = QuanLyPhimSlice