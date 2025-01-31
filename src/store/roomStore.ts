import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RoomInterface } from "@/types/entity";
type RoomStoreType = {
  name: string;
  initialState: RoomInterface[];
  reducers: {
    setRoom: (state: Array<RoomInterface>, action: PayloadAction<Array<RoomInterface>>) => void;
  };
}
export const roomStore = createSlice({
  name: "room",
  initialState: [],
  reducers: {
    //状态同步函数，参数赋值
    setRoom: (state, action: PayloadAction<any[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
} as RoomStoreType);
//导出创建的action对象
export const { setRoom } = roomStore.actions;
//导出reducer
export default roomStore.reducer;
