import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

// useDispatch hook with types.
export const useAppDispatch = () => useDispatch<AppDispatch>();
// useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
