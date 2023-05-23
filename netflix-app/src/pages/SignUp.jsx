import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm/useForm";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    borderRedFunc,
    resetValues,
    val,
    borderRed,
    matchEmail,
    matchPassword,
  } = useForm();

  const newUser = { email: `${val.email}`, password: `${val.password}` };
  console.log("newUser", newUser);

  const register = async (e) => {
    e.preventDefault();
    if (val.email && val.password) {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      console.log("response", savedUserResponse);
      if (savedUserResponse) {
        resetValues();
        navigate("/login");
      } else {
        borderRedFunc();
      }
    }
  };

  const style = {
    input_red: "w-full p-4 bg-gray-700 rounded-md border-2 border-red-500",

    input_cyan:
      "w-full  p-4 bg-gray-700 border-[1px] border-gray-800 rounded-md outline-2 outline-white",
  };

  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt=""
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <form className="w-full flex flex-col py-4">
              <input
                onChange={matchEmail}
                className={
                  borderRed.password ? style.input_red : style.input_cyan
                }
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <p
                id="EmailErrorMsg"
                className=" min-h-[1.3rem] text-xs pt-1 mb-3 text-red-500"
              ></p>
              <input
                onChange={matchPassword}
                className={
                  borderRed.password ? style.input_red : style.input_cyan
                }
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <p
                id="PasswordErrorMsg"
                className="min-h-[1.3rem] text-xs pt-1 text-red-500"
              ></p>
              <button
                onClick={register}
                className="bg-red-600 py-3 my-6 rounded font-bold"
              >
                SignUp
              </button>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>
                  <input className="mr-2" type="checkbox" />
                  Remember me
                </p>
                <p>Need help?</p>
              </div>
              <p className="py-8 ">
                <span className="text-gray-500 mr-1">
                  Already subsctibed to Netflix?
                </span>{" "}
                <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
