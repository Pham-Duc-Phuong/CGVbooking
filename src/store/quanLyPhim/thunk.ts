import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyPhimServices } from "services";
import { sleep } from "utils";

export const LayDanhSachPhimThunk = createAsyncThunk(
    "LayDanhSachPhim",
    async (payload: string, { rejectWithValue }) => {
        try {
            const data = await QuanLyPhimServices.LayDanhSachPhim(payload)
            await sleep()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const LayThongTinPhimThunk = createAsyncThunk(
    "LayThongTinPhim",
    async (payload: string, { rejectWithValue }) => {
        try {
            const data = await QuanLyPhimServices.LayThongTinPhim(payload)
            await sleep()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)