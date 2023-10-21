import { createSlice } from "@reduxjs/toolkit";
import { LayDanhSachPhim } from "types";
import { LayDanhSachPhimThunk } from ".";

type QuanLyPhimInitialState = {
    LayDanhSachPhim?: LayDanhSachPhim[]
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
    },
})
export const { actions: QuanLyPhimActions, reducer: QuanLyPhimReducer } = QuanLyPhimSlice