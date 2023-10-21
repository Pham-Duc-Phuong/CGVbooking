import { combineReducers } from '@reduxjs/toolkit'
import { quanLyNguoiDungReducer } from './quanLyNguoiDung/slice'
import { QuanLyPhimReducer } from './quanLyPhim'
import { QuanLyRapReducer } from './quanLyRap'

export const rootReducers = combineReducers({
    quanLyNguoiDung: quanLyNguoiDungReducer,
    QuanLyPhim: QuanLyPhimReducer,
    QuanLyRap: QuanLyRapReducer,
})