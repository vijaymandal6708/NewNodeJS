import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage = createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
  },
});

export const persistor = persistStore(store);
export default store;