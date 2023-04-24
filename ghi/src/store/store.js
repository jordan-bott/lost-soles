import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { socksApi } from "./socksApi";
import { authApi } from "./authApi";
import { usersApi } from "./usersApi";
import { verificationsApi } from "./verificationsApi";
import { matchesApi } from "./matchApi";
import { emailApi } from "./emailApi";

export const store = configureStore({
  reducer: {
    [socksApi.reducerPath]: socksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [verificationsApi.reducerPath]: verificationsApi.reducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socksApi.middleware)
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(verificationsApi.middleware)
      .concat(matchesApi.middleware)
      .concat(emailApi.middleware),
});

setupListeners(store.dispatch);
