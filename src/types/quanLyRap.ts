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