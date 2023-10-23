import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLysDatVeServices } from "services/QuanLyDatVe";

export const LayDanhSachPhongVeThunk = createAsyncThunk(
    'LayDanhSachPhongVe',
    async(payload: string, {rejectWithValue}) => {
        try {
            const data = await QuanLysDatVeServices.LayDanhSachPhongVe(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)