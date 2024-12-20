import { configureStore } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setupListeners } from "@reduxjs/toolkit/query";
import api from "./endpoints/api";
import guestApi from "./endpoints/auth";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [guestApi.reducerPath]: guestApi.reducer,
  },
  middleware: (def) => def().concat(api.middleware, guestApi.middleware),
});

setupListeners(store.dispatch);

export default store;
