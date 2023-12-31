import { apiInstance } from "constant";
import { AccountSchemaType, LoginSchemaType, RegisterSchemaType } from "schema";
import { TimKiemNguoiDung, UserByAccessToken, userLogin } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API
})

export const quanLyNguoiDungServices = {
    register: (data: RegisterSchemaType) => api.post('/DangKy', data),
    login: (data: LoginSchemaType) => api.post<ApiResponse<userLogin>>('/DangNhap', data),
    ThongTinTaiKhoan: () => api.post<ApiResponse<UserByAccessToken>>('/ThongTinTaiKhoan'),
    CapNhatThongTinNguoiDung: (data: AccountSchemaType) => api.put('/CapNhatThongTinNguoiDung', data),
    TimKiemNguoiDung: (query: string) => api.get<ApiResponse<TimKiemNguoiDung[]>>(`/TimKiemNguoiDung?MaNhom=${query}`),
    XoaNguoiDung: (query: string) => api.delete(`/XoaNguoiDung?TaiKhoan=${query}`),
    ThemNguoiDung: (data: AccountSchemaType) => api.post('/ThemNguoiDung', data),
}