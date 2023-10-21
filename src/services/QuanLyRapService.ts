import { apiInstance } from "constant"
import { CumRap, LichChieuTheoPhim, ThongTinLichChieuHeThongRap, danhSachPhimChieu } from "types"

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_RAP_API
})

export const QuanLyRapServices = {
    LayThongTinLichChieuHeThongRap: (query: string) => api.get<ApiResponse<ThongTinLichChieuHeThongRap<CumRap<danhSachPhimChieu<LichChieuTheoPhim[]>[]>[]>[]>>(`/LayThongTinLichChieuHeThongRap?maNhom=${query}`)
}