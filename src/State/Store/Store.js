import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "../Services/emptySplitApi.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../Slices/userSlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const Store = configureStore({
  reducer: {
    reducer: persistedReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      emptySplitApi.middleware
    ),
});

const persistor = persistStore(Store);

export { Store, persistor };
