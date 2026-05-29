import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Signup = () => {

  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");
  const Confirmpassword = watch("confirmPassword", "");
  const validatePasswordMatch = (value) => {
    return value === password || "Password don't match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword,
    };
    await axios
      .post("http://localhost:5002/user/signup", userInfo)
      .then((response) => {
        console.log(response.data);
        if(response.data){
            alert("Signup successful! You can now login.")
        }
        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error)=>{
        if(error.response){
            alert("Error:"+ error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-black px-6 py-3 rounded-md w-90 space-y-3"
        >
          <h1 className="text-blue-600 font-bold text-2xl">Messenger</h1>

          <h2 className="text-2xl items-center">
            Create a new{" "}
            <span className="text-blue-600 font-semibold">Account</span>
          </h2>

          {/* UserName */}

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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>

                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>

            <input
              type="text"
              placeholder="Username"
              {...register("name", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
            />
          </label>

          {errors.name && (
            <span className="text-red-600 text-sm font-semibold">
              **This field is required**
            </span>
          )}

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
            <span className="text-red-600  text-sm font-semibold">
              **This field is required**
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

                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
              })}
            />
          </label>

          {errors.password && (
            <span className="text-red-600  text-sm font-semibold">
              **This field is required**
            </span>
          )}

          {/* Confirm Password */}

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

                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>

          {errors.confirmPassword && (
            <span className="text-red-600  text-sm font-semibold ">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Text & Button */}

          <div className="flex flex-col justify-center">
            <input
              type="submit"
              value="Signup"
              className="text-white bg-blue-600 w-full rounded-lg py-2 cursor-pointer"
            />

            <p>
              Have an Account?
              <span className="text-blue-500 underline cursor-pointer ml-1">
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
