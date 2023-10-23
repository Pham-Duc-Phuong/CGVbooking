import { apiInstance } from "constant"
import { LayDanhSachPhongVe } from "types/quanLyDatVe"

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_DAT_VE_API
})

export const QuanLysDatVeServices = {
    LayDanhSachPhongVe: (query: string) => api.get<ApiResponse<LayDanhSachPhongVe>>(`LayDanhSachPhongVe?MaLichChieu=${query}`)
}