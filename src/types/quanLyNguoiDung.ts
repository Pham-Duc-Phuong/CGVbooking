export type userLogin = {
    taiKhoan: string,
    hoTen: string,
    email: string,
    soDT: string,
    maNhom: string,
    maLoaiNguoiDung: string,
    accessToken: string
}

export type UserByAccessToken = Omit<userLogin, 'accessToken'> & {
    matKhau: string
    loaiNguoiDung: {
        maLoaiNguoiDung: 'KhachHang' | 'QuanTri'
    }
    thongTinDatVe: {
        giaVe: number
        hinhAnh: string
        maVe: number
        ngayDat: string
        tenPhim: string
        thoiLuongPhim: number
        danhSachGhe: {
            maCumRap: string
            maGhe: number
            maHeThongRap: string
            maRap: number
            tenCumRap: string
            tenGhe: string
            tenHeThongRap: string
            tenRap: string
        }[]
    }[]
}
export type UserUpdate = {
    taiKhoan: string
    hoTen: string
    email: string
    matKhau: string
    soDt: string
    maNhom: string
    maLoaiNguoiDung: string
}
export type TimKiemNguoiDung = Omit<UserUpdate, 'maNhom' | 'soDt'> & {
    soDT: string
}