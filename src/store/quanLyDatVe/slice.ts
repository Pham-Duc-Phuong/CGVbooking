import { createSlice } from "@reduxjs/toolkit";
import { LayDanhSachPhongVe, danhSachGhe } from "types";
import { LayDanhSachPhongVeThunk } from ".";

type QuanLyDatVeInitialSlice = {
    LayDanhSachPhongVe?: LayDanhSachPhongVe
    bookingChair?: danhSachGhe[]
    isLoadingBooking?: boolean
}

const initialState: QuanLyDatVeInitialSlice = {
    bookingChair: []
}

const QuanLyDatVeSlice = createSlice({
    name: 'QuanLyDatVeSlice',
    initialState,
    reducers: {
        booking: (state, { payload }) => {
            const index = state.bookingChair?.findIndex(a => a.tenGhe === payload.tenGhe)
            if (state.bookingChair.length < 8) {
                if (index !== -1) {
                    state.bookingChair.splice(index, 1)
                } else {
                    state.bookingChair.push(payload)
                }
            } else {
                if (index === -1) {
                    alert('Khách hàng chỉ được đặt tối đa 8 chỗ ngồi')
                } else {
                    state.bookingChair.splice(index, 1)
                }
            }
        },
        booked: (state) => {
            state.bookingChair = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(LayDanhSachPhongVeThunk.fulfilled, (state, { payload }) => {
                state.LayDanhSachPhongVe = payload
                state.isLoadingBooking = false
            })
            .addCase(LayDanhSachPhongVeThunk.pending, (state) => {
                state.isLoadingBooking = true
            })
            .addCase(LayDanhSachPhongVeThunk.rejected, (state) => {
                state.isLoadingBooking = false
            })
    },
})
export const { actions: QuanLyDatVeActions, reducer: QuanLyDatVeReducer } = QuanLyDatVeSlice