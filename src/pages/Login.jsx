import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../endpoints/auth";
import { useGetAuthQuery } from "../endpoints/api";
import { Container, TextInput } from "../components/Container";
import { notification } from "antd";
import { useNavigate } from "react-router";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();

  const [login, loginMut] = useLoginMutation();
  const [register, registerMut] = useRegisterMutation();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    terms: false,
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <Container className={"grid place-items-center"}>
        <h1 className="text-3xl font-bold">Parlay Master</h1>
      </Container>

      <Container>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          sit magni est ea? Cumque necessitatibus molestias illum illo excepturi
          velit, rem tenetur cum maxime dolorum impedit cupiditate earum ex
          beatae! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
          perspiciatis sunt minus quos aliquam autem architecto nesciunt ut. Qui
          molestiae maxime vel odio exercitationem quod distinctio accusamus
          praesentium aspernatur blanditiis!
        </p>
      </Container>

      {!signup ? (
        // Login form
        <Container>
          <form
            className="grid items-center justify-items-start gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              login(loginForm)
                .unwrap()
                .then((data) => {
                  localStorage.setItem("authToken", data.token);
                  // localStorage.setItem("user", JSON.stringify(data.user));

                  notification.success({
                    message: "Login success",
                    duration: 3,
                  });

                  navigate('/');
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            <TextInput
              type="email"
              placeholder="E-mail Address"
              required
              className="w-1/3"
              name="email"
              value={loginForm.email}
              onChange={(e) => {
                setLoginForm({ ...loginForm, email: e.target.value });
              }}
            />
            <TextInput
              type="password"
              placeholder="Password"
              required
              className="w-1/3"
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({ ...loginForm, password: e.target.value });
              }}
            />

            <button
              disabled={loginMut.isLoading}
              className="px-4 py-1.5 rounded bg-blue-400"
            >
              Login
            </button>
          </form>

          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setSignup(true);
            }}
          >
            Don't have an account? Sign up
          </a>
        </Container>
      ) : (
        // Signup form
        <Container>
          <form
            className="grid items-center justify-items-start gap-3"
            onSubmit={(e) => {
              e.preventDefault();

              register(signupForm)
                .unwrap()
                .then((data) => {
                  notification.success({
                    message: "Sign-up success",
                    duration: 3,
                  });
                  
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            <TextInput
              type="text"
              placeholder="Firstname"
              required
              className="w-1/3"
              value={signupForm.firstname}
              onChange={(e) => {
                setSignupForm({ ...signupForm, firstname: e.target.value });
              }}
            />
            <TextInput
              type="text"
              placeholder="Lastname"
              required
              className="w-1/3"
              value={signupForm.lastname}
              onChange={(e) => {
                setSignupForm({ ...signupForm, lastname: e.target.value });
              }}
            />
            <TextInput
              type="email"
              placeholder="E-mail Address"
              required
              className="w-1/3"
              value={signupForm.email}
              onChange={(e) => {
                setSignupForm({ ...signupForm, email: e.target.value });
              }}
            />
            <TextInput
              type="password"
              placeholder="Password"
              required
              className="w-1/3"
              value={signupForm.password}
              onChange={(e) => {
                setSignupForm({ ...signupForm, password: e.target.value });
              }}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                required
                checked={signupForm.terms}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, terms: e.target.checked });
                }}
              />
              <span>
                I agree to the{" "}
                <a className="text-blue-400 hover:text-white" href="">
                  Terms & Conditions
                </a>
                .
              </span>
            </label>

            <button
              disabled={registerMut.isLoading}
              className="px-4 py-1.5 rounded bg-blue-400"
            >
              Sign Up
            </button>
          </form>

          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setSignup(false);
            }}
          >
            Already have an account? Login
          </a>
        </Container>
      )}
    </>
  );
};

export default Login;
