import { useState } from "react";
import { Container, TextInput } from "./components/Container";
import { useLoginMutation, useRegisterMutation } from "./endpoints/auth";
import { notification } from "antd";
import { useGetAuthQuery } from "./endpoints/api";
import { Navigate, Outlet } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const { data: authData, isLoading, isError, isSuccess } = useGetAuthQuery();

  return (
    <>
      {isLoading ? (
        <Container className="grid place-items-center w-full min-h-[100dvh]">
          <p>Loading</p>
        </Container>
      ) : isSuccess ? (
        <>
          <Container>
            <Navbar />
          </Container>
          {/* <div className=
          "py-6"></div> */}
          <Outlet />
        </>
      ) : (
        <>
          <Navigate to={"/login"} />
        </>
      )}
    </>
  );
};

export default App;
