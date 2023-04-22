import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { socksApi } from "./socksApi";
import { authApi } from "./authApi";
import { usersApi } from "./usersApi";
import { verificationsApi } from "./verificationsApi";

export const store = configureStore({
  reducer: {
    [socksApi.reducerPath]: socksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [verificationsApi.reducerPath]: verificationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socksApi.middleware)
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(verificationsApi.middleware),
});

setupListeners(store.dispatch);
