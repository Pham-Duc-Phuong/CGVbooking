import { createSlice } from "@reduxjs/toolkit";
import { LayDanhSachPhongVe, danhSachGhe } from "types";
import { LayDanhSachPhongVeThunk } from ".";

type QuanLyDatVeInitialSlice = {
    LayDanhSachPhongVe?: LayDanhSachPhongVe
    bookingChair?: danhSachGhe[]
}

const initialState: QuanLyDatVeInitialSlice = {
    bookingChair:[]
}

const QuanLyDatVeSlice = createSlice({
    name: 'QuanLyDatVeSlice',
    initialState,
    reducers: {
        booking: (state, { payload }) => {
            state.bookingChair.push(payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(LayDanhSachPhongVeThunk.fulfilled, (state, { payload }) => {
                state.LayDanhSachPhongVe = payload
            })
    },
})
export const { actions: QuanLyDatVeActions, reducer: QuanLyDatVeReducer } = QuanLyDatVeSlice