import { createAsyncThunk } from "@reduxjs/toolkit"
import { LoginSchemaType } from "schema"
import { quanLyNguoiDungServices } from "services"


export const loginThunk = createAsyncThunk(
    'Login',
    async (payload: LoginSchemaType, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.login(payload)
            return data.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)