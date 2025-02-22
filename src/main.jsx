import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { RouterProvider } from "react-router-dom";

import store from "./store.js";
import { Provider } from "react-redux";
import Home from "./pages/Home.jsx";
import CreateParlay from "./pages/CreateParlay.jsx";
import MyDrafts from "./pages/MyDrafts.jsx";
import Draft from "./pages/Draft.jsx";
import Login from "./pages/Login.jsx";
import Parlay from "./pages/Parlay.jsx";
import Profile from "./pages/Profile.jsx";
import Deposit from "./pages/Deposit.jsx";
import Parlays from "./pages/Parlays.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/account/deposit" element={<Deposit />} />
        <Route path="/create" element={<CreateParlay />} />
        <Route path="/drafts">
          <Route element={<MyDrafts />} index />
          <Route path=":id" element={<Draft />} />
          <Route path=":id/edit" element={<Draft />} />
        </Route>

        <Route path="/parlays">
          <Route index element={<Parlays />} />
          <Route path=":id" element={<Parlay />} />
        </Route>
        <Route path="*" element={<p>Not found</p>} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
