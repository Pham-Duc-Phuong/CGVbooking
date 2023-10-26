// LayThongTinLichChieuPhimTheoHeThongRap
export type ThongTinLichChieuHeThongRap<A> = {
    maHeThongRap: string
    tenHeThongRap: string
    logo: string
    mahom: string
    lstCumRap: A
}
export type CumRap<B> = {
    maCumRap: string
    tenCumRap: string
    hinhAnh: string
    diaChi: string
    danhSachPhim: B
}
export type danhSachPhimChieu<C> = {
    maPhim: number
    tenPhim: string
    hinhAnh: string
    hot: boolean
    dangChieu: boolean
    sapChieu: boolean
    lstLichChieuTheoPhim: C
}
export type LichChieuTheoPhim = {
    maLichChieu: number
    maRap: string
    tenRap: string
    ngayChieuGioChieu: string
    giaVe: number
}
// LayThongTinLichChieuPhim
export type LayThongTinLichChieuPhim<A> = {
    maPhim: number
    tenPhim: string
    biDanh: string
    trailer: string
    hinhAnh: string
    moTa: string
    maNhom: string
    hot: boolean
    dangChieu: boolean
    sapChieu: boolean
    ngayKhoiChieu: string
    danhGia: number
    heThongRapChieu: A
}
export type heThongRapChieu<A> = {
    maHeThongRap: string
    tenHeThongRap: string
    logo: string
    cumRapChieu: A
}
export type cumRapChieu<A> = {
    maCumRap: string
    tenCumRap: string
    hinhAnh: string
    diaChi: string
    lichChieuPhim: A
}
export type lichChieuPhim = Omit<LichChieuTheoPhim, 'maLichChieu'> & { thoiLuong: number, maLichChieu: string }