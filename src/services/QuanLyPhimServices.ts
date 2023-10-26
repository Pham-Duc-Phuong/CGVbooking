import { apiInstance } from "constant"
import { LayDanhSachPhim } from "types"

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_PHIM_API
})

export const QuanLyPhimServices = {
    LayDanhSachPhim: (query:string) => api.get<ApiResponse<LayDanhSachPhim[]>>(`/LayDanhSachPhim?maNhom=${query}`),
    LayThongTinPhim: (query:string) => api.get<ApiResponse<LayDanhSachPhim>>(`/LayThongTinPhim?MaPhim=${query}`)
}