import { useState } from "react";
import EventList from "./EventList/EventList";
import EventCalView from "./EventCalView/EventCalView";

export default function Events() {
  const [mode, setMode] = useState(true);

  return (
    <>
      <main className="container mx-auto px-4 my-8">
        <h1 className="text-xl text-bold ml-6">My Appointments</h1>
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
      </main>
    </>
  );
}
