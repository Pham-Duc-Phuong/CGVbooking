import { createAsyncThunk } from "@reduxjs/toolkit"
import { LoginSchemaType } from "schema"
import { quanLyNguoiDungServices } from "services"
import { sleep } from "utils"


export const loginThunk = createAsyncThunk(
    'Login',
    async (payload: LoginSchemaType, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.login(payload)
            await sleep()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const ThongTinTaiKhoanThunk = createAsyncThunk(
    'ThongTinTaiKhoan',
    async (_, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.ThongTinTaiKhoan()
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const TimKiemNguoiDungThunk = createAsyncThunk(
    'TimKiemNguoiDung',
    async (payload: string, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.TimKiemNguoiDung(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const XoaNguoiDungThunk = createAsyncThunk(
    'XoaNguoiDung',
    async (payload: string, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.XoaNguoiDung(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)