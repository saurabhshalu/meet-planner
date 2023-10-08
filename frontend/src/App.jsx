// import { useEffect, useState } from "react";
import Login from "./Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register/Register";
import OtpVerification from "./OtpVerification/OtpVerification";
import SlotSelection from "./SlotSelection/SlotSelection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Verify",
      element: <OtpVerification />,
    },
    {
      path: "/Slots",
      element: <SlotSelection />,
    },
  ]);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:8000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setUser(null);
  //       });
  //   };
  //   getUser();
  // }, []);

  // const logout = () => {
  //   window.open("http://localhost:8000/auth/logout", "_self");
  // };

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer>
        {/* {user && (
          <div>
            Hello {user.displayName}... <button onClick={logout}>Logout</button>
          </div>
        )} */}

        {/* <Login /> */}
      </ToastContainer>
    </>
  );
}

export default App;
