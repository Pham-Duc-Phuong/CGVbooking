import { combineReducers } from '@reduxjs/toolkit'
import { quanLyNguoiDungReducer } from './quanLyNguoiDung/slice'

export const rootReducers = combineReducers({
    quanLyNguoiDung: quanLyNguoiDungReducer
    
})