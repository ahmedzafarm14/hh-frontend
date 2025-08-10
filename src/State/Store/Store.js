import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { emptySplitApi } from "../Services/emptySplitApi.js";
import sessionStorage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "../Slices/userSlice.js";
import messageHandlerReducer from "../Slices/messageHandlerSlice.js";
import tabHandlerReducer from "../Slices/tabHandlerSlice.js";
import hostelReducer from "../Slices/hostelSlice.js";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["user", "tabHandler", "hostel"], // added hostel to persisted slices
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  messageHandler: messageHandlerReducer,
  tabHandler: tabHandlerReducer,
  hostel: hostelReducer, // added hostel reducer
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
