import { useState } from "react";
import LoginRegisterHeader from "../LoginRegisterHeader/LoginRegisterHeader.jsx";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthenticated from "../hooks/useAuthenticated.js";
import FullScreenLoader from "../Components/FullScreenLoader.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/local/loginme",
        {
          email,
          password,
        }
      );
      if (!data.success) {
        return toast.error(data.message || "Something went wrong....");
      }

      window.localStorage.setItem("user", JSON.stringify(data.message));
      navigate("/dashboard");
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
  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <LoginRegisterHeader isWhat="Login" />

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={loginHandler}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            {/* <div>
              <button
                type="button"
                className="flex w justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in with Google
              </button>

              <button
                type="submit"
                className="flex w justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in with Microsoft
              </button>
            </div> */}

            {/* <div className="space-x-4">
              <button
                onClick={() => {
                  window.open("http://localhost:8000/auth/google", "_self");
                }}
                className="bg-indigo-600  text-white text-sm font-semibold  py-2 px-4 rounded"
              >
                {" "}
                Google{" "}
              </button>
              <button
                onClick={() => {
                  window.open("http://localhost:8000/auth/microsoft", "_self");
                }}
                className="bg-indigo-600  text-white text-sm font-semibold  py-2 px-4 rounded"
              >
                {" "}
                Microsoft{" "}
              </button>
            </div> */}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/Register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
