import { configureStore } from '@reduxjs/toolkit'
import { rootReducers } from './rootReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


export const store = configureStore({
    reducer: rootReducers
})


// UseState in TypeScript
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// UseDispatch in TypeScript
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch