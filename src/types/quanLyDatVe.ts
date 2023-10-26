export type thongTinPhim = {
    maLichChieu: number
    tenCumRap: string
    tenRap: string
    diaChi: string
    tenPhim: string
    hinhAnh: string
    ngayChieu: string
    gioChieu: string
}
export type danhSachGhe = {
    maGhe: number
    tenGhe: string
    maRap: number
    loaiGhe: string
    stt: string
    giaVe: number
    daDat: boolean
    taiKhoanNguoiDat: null
}
export type LayDanhSachPhongVe = {
    thongTinPhim: thongTinPhim
    danhSachGhe: danhSachGhe[]
}
export type DatVe = {
    maLichChieu: number
    danhSachVe: {
        maGhe: number
        giaVe: number
    }[]
}
export type TaoLichChieu = {
    maPhim: number
    ngayChieuGioChieu: string
    maRap: string
    giaVe: number
}