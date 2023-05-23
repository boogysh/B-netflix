import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/actions";

export default function NavBar() {
  const { user } = useSelector((state) => state.userReducer);
  // console.log(user);
  const account = window.location.href.includes("account")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(LOGOUT({ user: null, token: null }));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-2xl xs:text-3xl md:text-4xl  font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user ? (
        <div>
          {!account && <Link to={`/account`}>
            <button className="text-sm xs:text-base text-white pr-2 sm:pr-4">Account</button>
          </Link>}

          <button
            onClick={handleLogout}
            className="bg-red-600  px-3 xs:px-6 py-2 rounded cursor-pointer text-white text-sm xs:text-base"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to="signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
