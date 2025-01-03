import { createSlice } from "@reduxjs/toolkit";
export const roomStore = createSlice({
  name: "room",
  initialState: [],
  reducers: {
    //状态同步函数，参数赋值
    setRoom: (state, action) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});
//导出创建的action对象
export const { setRoom } = roomStore.actions;
//导出reducer
export default roomStore.reducer;
