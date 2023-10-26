import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyRapServices } from "services";

export const LayThongTinLichChieuHeThongRapThunk = createAsyncThunk(
    "LayThongTinLichChieuHeThongRap",
    async (payload: string, {rejectWithValue}) => {
        try {
            const data = await QuanLyRapServices.LayThongTinLichChieuHeThongRap(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const LayThongTinLichChieuPhimThunk = createAsyncThunk(
    "LayThongTinLichChieuPhim",
    async (payload: number, {rejectWithValue}) => {
        try {
            const data = await QuanLyRapServices.LayThongTinLichChieuPhim(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)