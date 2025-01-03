import { configureStore } from "@reduxjs/toolkit";
import searchStore from "./searchStore";
import roomStore from "./roomStore";

export default configureStore({
  reducer: {
    searchParams: searchStore,
    room: roomStore,
  },
});
