// import { useEffect, useState } from "react";
import Login from "./Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register/Register";
import OtpVerification from "./OtpVerification/OtpVerification";
import SlotSelection from "./SlotSelection/SlotSelection";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventList from "./EventComponent/Event";
import ProtectedRoute from "./Components/ProtectedRoute";
import TestSlotBookingScreen from "./TestSlotBookingScreen";

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
      element: (
        <ProtectedRoute>
          <SlotSelection />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <EventList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/appointment/:uniqueId",
      element: <TestSlotBookingScreen />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
