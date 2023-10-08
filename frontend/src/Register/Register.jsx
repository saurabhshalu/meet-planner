import { useState } from "react";
import LoginRegisterHeader from "../LoginRegisterHeader/LoginRegisterHeader.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import FullScreenLoader from "../Components/FullScreenLoader.jsx";
import OtpVerification from "../OtpVerification/OtpVerification.jsx";
import useAuthenticated from "../hooks/useAuthenticated.js";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_pass, setRePass] = useState("");

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        !displayName.trim() ||
        !email.trim() ||
        !password.trim() ||
        !re_pass.trim()
      ) {
        return toast.error("Please fill all required field.");
      }
      if (password.length < 6) {
        return toast.error("Password must be of 6 or more character");
      }
      if (password !== re_pass) {
        return toast.error("Password must be same.");
      }
      const { data } = await axios.post(
        "http://localhost:8000/auth/local/registration",
        { displayName, email, password }
      );
      if (!data.success) {
        return toast.error(data.message || "Something went wrong....");
      }

      setOtpSent(data.otpSent);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const { loggedIn } = useAuthenticated();
  if (loggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  if (email && otpSent) {
    return <OtpVerification email={email} />;
  }
  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <LoginRegisterHeader isWhat="Register" />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                autoComplete="password"
                required
                value={re_pass}
                onChange={(e) => setRePass(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={register}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
