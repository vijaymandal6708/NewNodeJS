import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import {persistStore,persistReducer} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage = createWebStorage("local");

const persistConfig = {
    key:"root",
    storage
};

const rootReducer = combineReducers({
    cart:cartReducer
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);