import { configureStore } from '@reduxjs/toolkit'
import { rootReducers } from './rootReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThongTinTaiKhoanThunk, loginThunk } from './quanLyNguoiDung'


export const store = configureStore({
    reducer: rootReducers
})
store.dispatch(loginThunk({ taiKhoan: 'phuongporo8123', matKhau: '123' }))
store.dispatch(ThongTinTaiKhoanThunk())
// UseState in TypeScript
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// UseDispatch in TypeScript
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch