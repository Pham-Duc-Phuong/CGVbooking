import { apiInstance } from "constant"
import { CumRap, LayThongTinLichChieuPhim, LichChieuTheoPhim, ThongTinLichChieuHeThongRap, cumRapChieu, danhSachPhimChieu, heThongRapChieu, lichChieuPhim } from "types"

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_RAP_API
})

export const QuanLyRapServices = {
    LayThongTinLichChieuHeThongRap: (query: string) => api.get<ApiResponse<ThongTinLichChieuHeThongRap<CumRap<danhSachPhimChieu<LichChieuTheoPhim[]>[]>[]>[]>>(`/LayThongTinLichChieuHeThongRap?maNhom=${query}`),
    LayThongTinLichChieuPhim: (query: number) => api.get<ApiResponse<LayThongTinLichChieuPhim<heThongRapChieu<cumRapChieu<lichChieuPhim[]>[]>[]>>>(`/LayThongTinLichChieuPhim?MaPhim=${query}`)
}