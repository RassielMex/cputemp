import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./slices/tempSlice";
import coreReducer from "./slices/coreSlice";
import ramReducer from "./slices/ramSlice";

export default configureStore({
  reducer: { temp: tempReducer, ram: ramReducer, core: coreReducer },
});
