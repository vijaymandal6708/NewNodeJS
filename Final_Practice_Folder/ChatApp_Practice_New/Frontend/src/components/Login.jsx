import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const {authUser, setAuthUser} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("http://localhost:5002/user/login", userInfo)
      .then((response) => {
        console.log(response.data);

        if (response.data) {
          alert("Login Successful!");
        }

        localStorage.setItem(
          "messenger",
          JSON.stringify(response.data)
        );
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-black px-6 py-6 rounded-md w-90 space-y-5"
        >
          <h1 className="text-blue-600 font-bold text-2xl">Messenger</h1>

          <h2 className="text-2xl items-center">
            Login with your{" "}
            <span className="text-blue-600 font-semibold">
              Account
            </span>
          </h2>

          {/* Email */}

          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </label>

          {errors.email && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.email.message}
            </span>
          )}

          {/* Password */}

          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle
                  cx="16.5"
                  cy="7.5"
                  r=".5"
                  fill="currentColor"
                ></circle>
              </g>
            </svg>

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </label>

          {errors.password && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.password.message}
            </span>
          )}

          {/* Button */}

          <div className="flex flex-col justify-center">
            <input
              type="submit"
              value="Login"
              className="text-white bg-blue-600 w-full rounded-lg py-2 cursor-pointer"
            />

            <p>
              Don't have any Account?
              <Link to={"/signup"} className="text-blue-500 underline cursor-pointer ml-1">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;