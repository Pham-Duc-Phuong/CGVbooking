import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyDatVeServices } from "services";

export const LayDanhSachPhongVeThunk = createAsyncThunk(
    'LayDanhSachPhongVe',
    async(payload: string, {rejectWithValue}) => {
        try {
            const data = await QuanLyDatVeServices.LayDanhSachPhongVe(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)