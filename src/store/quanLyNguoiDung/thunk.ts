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