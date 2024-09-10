import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../auth/authSlice";
import storage from "redux-persist/lib/storage";
import { userApi } from "../api/userApiSlice";
import { theaterApi } from "../api/theaterSlice";
import { movieApi } from "../api/movieSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [theaterApi.reducerPath]: theaterApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(theaterApi.middleware)
      .concat(movieApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
