
import { useEffect, useState } from "react";
import EventList from "./EventList/EventList";
import EventCalView from "./EventCalView/EventCalView";
import { useNavigate } from "react-router-dom";
import useAuthenticated from "../hooks/useAuthenticated";
import axios from "axios";
import { toast } from "react-toastify";

export default function Events() {
  const [mode, setMode] = useState(true);
  const navigate = useNavigate();

  const { userDetails } = useAuthenticated();

  const [apiData, setAPIdata] = useState(null);

  const [isGoogleLinked, setIsGoogleLinked] = useState(true);

  useEffect(() => {
    const callAPI = async () => {
      try {
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
      }
    };
    callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const listItems = apiData.success ? apiData.message : [];

  return (
    <>
      <main className="container mx-auto px-4 my-8">
        <div className="flex justify-between">
          <h1 className="text-xl text-bold ml-6">My Appointments</h1>
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

            {mode ? <EventList /> : <EventCalView />}
          </>
        ) : (
          <div>
            <button
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
