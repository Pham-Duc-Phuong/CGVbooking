import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyRapServices } from "services/QuanLyRapService";

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