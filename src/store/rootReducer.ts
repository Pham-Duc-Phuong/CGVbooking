import { combineReducers } from '@reduxjs/toolkit'
import { quanLyNguoiDungReducer } from './quanLyNguoiDung/slice'
import { QuanLyPhimReducer } from './quanLyPhim'
import { QuanLyRapReducer } from './quanLyRap'
import { QuanLyDatVeReducer } from './quanLyDatVe'

export const rootReducers = combineReducers({
    quanLyNguoiDung: quanLyNguoiDungReducer,
    QuanLyPhim: QuanLyPhimReducer,
    QuanLyRap: QuanLyRapReducer,
    QuanLyDatVe: QuanLyDatVeReducer,
})