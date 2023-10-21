import { createSlice } from "@reduxjs/toolkit";
import { CumRap, LichChieuTheoPhim, ThongTinLichChieuHeThongRap, danhSachPhimChieu } from "types";
import { LayThongTinLichChieuHeThongRapThunk } from ".";

type QuanLyRapInitialState = {
    ThongTinLichChieuHeThongRap?: ThongTinLichChieuHeThongRap<CumRap<danhSachPhimChieu<LichChieuTheoPhim[]>[]>[]>[]
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
    },
})
export const { actions: QuanLyRapActions, reducer: QuanLyRapReducer } = QuanLyRapSlice