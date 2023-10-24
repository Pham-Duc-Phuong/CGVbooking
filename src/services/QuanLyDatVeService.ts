import { apiInstance } from "constant"
import { DatVe, LayDanhSachPhongVe } from "types"

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_DAT_VE_API
})

export const QuanLyDatVeServices = {
    LayDanhSachPhongVe: (query: string) => api.get<ApiResponse<LayDanhSachPhongVe>>(`/LayDanhSachPhongVe?MaLichChieu=${query}`),
    DatVe: (data: DatVe) => api.post('/DatVe', data)
}