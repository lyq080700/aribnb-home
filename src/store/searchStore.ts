import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { SearchParamsInterface } from "@/types/entity";
type SearchStoreType = {
  name: string;
  initialState: SearchParamsInterface;
  reducers: {
    setParams: (state: SearchParamsInterface, action: PayloadAction<SearchParamsInterface>) => void;
  }
}
export const searchStore = createSlice({
  name: "searchParams",
  initialState: {
    //初始化参数
    address: { country: "", city: "" },
    time: { start: "", end: "" },
    people: { adult: 0, child: 0, infant: 0, pet: 0 },
  },
  reducers: {
    //状态同步函数，参数赋值
    setParams: (state, action: PayloadAction<SearchParamsInterface>) => {
      const newParams = action.payload;
      state.address = newParams.address;
      state.time = newParams.time;
      state.people = newParams.people;
    },
  },
} as SearchStoreType);
//导出创建的action对象
export const { setParams } = searchStore.actions;
//导出reducer
export default searchStore.reducer;
