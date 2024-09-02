import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./modules/themeSlice";
import langReducer from "./modules/langchange";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage, // 存储方式
  // whitelist: [], // 需要持久化的数据
  // blacklist: [], // 不需要持久化的数据
};

// 合并reducer
const rootReducer = combineReducers({
  theme: themeReducer,
  lang: langReducer,
});

// 创建一个持久化的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 创建持久化存储
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
