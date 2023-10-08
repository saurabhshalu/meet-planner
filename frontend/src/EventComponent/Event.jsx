import { useEffect, useState } from "react";
import EventList from "./EventList/EventList";
import EventCalView from "./EventCalView/EventCalView";
import { useNavigate } from "react-router-dom";
import useAuthenticated from "../hooks/useAuthenticated";
import axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoader from "../Components/FullScreenLoader";

export default function Events() {
  const [mode, setMode] = useState(true);
  const navigate = useNavigate();

  const { userDetails } = useAuthenticated();

  const [apiData, setAPIdata] = useState(null);

  const [isGoogleLinked, setIsGoogleLinked] = useState(true);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const callAPI = async () => {
      try {
        setLoading(true);
        if (userDetails.email) {
          const { data } = await axios.get(
            `http://localhost:8000/events/${userDetails.email}`
          );
          if (!data.success) {
            setIsGoogleLinked(data.isGoogleLinked);
            return toast.error(data.message || "Something went wrong....");
          }

          setAPIdata(data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const listItems = apiData?.success ? apiData.message : [];

  return (
    <>
      {loading && <FullScreenLoader />}
      <main className="container mx-auto px-4 my-8">
        <div className="flex justify-between">
          <h1 className="text-xl text-bold ml-6">My Appointments</h1>
          <div>
            <button
              onClick={() => {
                navigate("/slots");
              }}
            >
              Configure Slots
            </button>
          </div>
          <div className="flex gap-3 align-middle">
            <span>Hello, {userDetails.displayName}</span>
            <button
              onClick={() => {
                window.localStorage.removeItem("user");
                navigate("/", { replace: true });
              }}
              className="text-bold text-md text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
        {isGoogleLinked ? (
          <>
            <nav className="flex flex-row">
              <div
                className={
                  "Upcoming-events p-6 border-b-1" +
                  (mode ? "border-black" : "border-transparent")
                }
                onClick={() => setMode(true)}
              >
                <h4 className={"text-bold text-md"}>Upcoming appointments</h4>
              </div>
              <div
                className={
                  "Upcoming-events p-6 border-b-1" +
                  (mode ? "border-transparent" : "border-black")
                }
                onClick={() => setMode(false)}
              >
                <h4 className="text-bold text-md ">Calender View</h4>
              </div>
            </nav>

            {mode ? (
              <EventList items={listItems} />
            ) : (
              <EventCalView items={listItems} />
            )}
          </>
        ) : (
          <div className="mt-10 flex items-center content-center justify-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                window.open("http://localhost:8000/auth/google", "_self");
              }}
            >
              Link Google Account
            </button>
          </div>
        )}
      </main>
    </>
  );
}
