import { createSlice } from "@reduxjs/toolkit";
import { CumRap, LayThongTinLichChieuPhim, LichChieuTheoPhim, ThongTinLichChieuHeThongRap, cumRapChieu, danhSachPhimChieu, heThongRapChieu, lichChieuPhim } from "types";
import { LayThongTinLichChieuHeThongRapThunk, LayThongTinLichChieuPhimThunk } from ".";

type QuanLyRapInitialState = {
    ThongTinLichChieuHeThongRap?: ThongTinLichChieuHeThongRap<CumRap<danhSachPhimChieu<LichChieuTheoPhim[]>[]>[]>[]
    LayThongTinLichChieuPhim?: LayThongTinLichChieuPhim<heThongRapChieu<cumRapChieu<lichChieuPhim[]>[]>[]>

}

const initialState: QuanLyRapInitialState = {
   
}

const QuanLyRapSlice = createSlice({
    name: 'QuanLyRapSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(LayThongTinLichChieuHeThongRapThunk.fulfilled, (state, { payload }) => {
                state.ThongTinLichChieuHeThongRap = payload
            })
            .addCase(LayThongTinLichChieuPhimThunk.fulfilled, (state, { payload }) => {
                state.LayThongTinLichChieuPhim = payload
            })
    },
})
export const { actions: QuanLyRapActions, reducer: QuanLyRapReducer } = QuanLyRapSlice