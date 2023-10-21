import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyPhimServices } from "services";

export const LayDanhSachPhimThunk = createAsyncThunk(
    "LayDanhSachPhim",
    async (payload:string, {rejectWithValue}) => {
        try {
            const data = await QuanLyPhimServices.LayDanhSachPhim(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)