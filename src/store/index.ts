import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import searchStore from "./searchStore";
import roomStore from "./roomStore";

const store =  configureStore({
  reducer: {
    searchParams: searchStore,
    room: roomStore,
  },
});
export default store;
//需要定义 Redux 的全局状态类型（RootState）,从Redux store 的根 reducer 中推断出来的。
export type RootState = ReturnType<typeof store.getState>;
// 定义类型化的 useSelector
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;