import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyDatVeServices } from "services";
import { sleep } from "utils";

export const LayDanhSachPhongVeThunk = createAsyncThunk(
    'LayDanhSachPhongVe',
    async(payload: string, {rejectWithValue}) => {
        try {
            const data = await QuanLyDatVeServices.LayDanhSachPhongVe(payload)
            await sleep()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)