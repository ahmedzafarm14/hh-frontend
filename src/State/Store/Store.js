import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { emptySplitApi } from "../Services/emptySplitApi.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "../Slices/userSlice.js";
import messageHandlerReducer from "../Slices/messageHandlerSlice.js";
import tabHandlerReducer from "../Slices/tabHandlerSlice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "tabHandler"], // persisted slices
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  messageHandler: messageHandlerReducer,
  tabHandler: tabHandlerReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializableCheck for redux-persist and RTK Query
    }).concat(emptySplitApi.middleware),
});

const persistor = persistStore(Store);

export { Store, persistor };
