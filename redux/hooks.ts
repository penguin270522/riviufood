import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import store from './store';

// then dispatch async thunk to use useAppDispatch and useAppSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
// export const useAppDispatch = () => useDispatch<AppDispatch>();


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;