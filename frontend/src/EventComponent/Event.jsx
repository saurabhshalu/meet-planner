import { useState } from "react";
import EventList from "./EventList/EventList";
// import EventCalView from "./EventCalView/EventCalView";
import TestCalender from "../TestCalender";

export default function Events() {
  const [mode, setMode] = useState(true);

  let eventData = {
    kind: "calendar#events",
    etag: '"p32capev2rji820o"',
    summary: "manalijain26798@gmail.com",
    description: "",
    updated: "2023-10-07T19:59:43.167Z",
    timeZone: "Asia/Kolkata",
    accessRole: "owner",
    defaultReminders: [
      {
        method: "popup",
        minutes: 30,
      },
    ],
    nextSyncToken: "CJisu-Lc5IEDEJisu-Lc5IEDGAUg9a-UkAIo9a-UkAI=",
    items: [
      {
        kind: "calendar#event",
        etag: '"3033900081221000"',
        id: "c4pjee9pcoq6abb26oo6ab9k6srj0bb26pi62b9ncgqj8cb66sr3ie9kc4",
        status: "tentative",
        htmlLink:
          "https://www.google.com/calendar/event?eid=YzRwamVlOXBjb3E2YWJiMjZvbzZhYjlrNnNyajBiYjI2cGk2MmI5bmNncWo4Y2I2NnNyM2llOWtjNF8yMDE4MDkxNlQwMjMwMDBaIG1hbmFsaWphaW4yNjc5OEBt",
        created: "2018-01-26T07:00:40.000Z",
        updated: "2018-01-26T07:00:40.651Z",
        summary: "Chacha's birthday ",
        creator: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        organizer: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        start: {
          dateTime: "2018-09-16T08:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2018-09-16T09:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        recurrence: ["RRULE:FREQ=YEARLY;WKST=MO;INTERVAL=1"],
        iCalUID:
          "c4pjee9pcoq6abb26oo6ab9k6srj0bb26pi62b9ncgqj8cb66sr3ie9kc4@google.com",
        sequence: 1,
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 0,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3033900123446000"',
        id: "6oo62opkcksj4b9hclj3ab9k68om2bb1ccsj8b9j6crm8cpk6dgmcc36c4",
        status: "tentative",
        htmlLink:
          "https://www.google.com/calendar/event?eid=Nm9vNjJvcGtja3NqNGI5aGNsajNhYjlrNjhvbTJiYjFjY3NqOGI5ajZjcm04Y3BrNmRnbWNjMzZjNF8yMDE4MDkyNVQwMjMwMDBaIG1hbmFsaWphaW4yNjc5OEBt",
        created: "2018-01-26T07:01:01.000Z",
        updated: "2018-01-26T07:01:01.786Z",
        summary: "Mami's birthday",
        creator: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        organizer: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        start: {
          dateTime: "2018-09-25T08:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2018-09-25T09:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        recurrence: ["RRULE:FREQ=YEARLY;WKST=MO;INTERVAL=1"],
        iCalUID:
          "6oo62opkcksj4b9hclj3ab9k68om2bb1ccsj8b9j6crm8cpk6dgmcc36c4@google.com",
        sequence: 1,
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 0,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3033900177658000"',
        id: "60rj4p9h60o6ab9kcopjcb9k6tij2b9ocksjcbb561gmap1k6lj34cho6g",
        status: "tentative",
        htmlLink:
          "https://www.google.com/calendar/event?eid=NjByajRwOWg2MG82YWI5a2NvcGpjYjlrNnRpajJiOW9ja3NqY2JiNTYxZ21hcDFrNmxqMzRjaG82Z18yMDE4MDkyMlQwMjMwMDBaIG1hbmFsaWphaW4yNjc5OEBt",
        created: "2018-01-26T07:01:28.000Z",
        updated: "2018-01-26T07:01:28.878Z",
        summary: "Vidhi's birthday",
        creator: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        organizer: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        start: {
          dateTime: "2018-09-22T08:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2018-09-22T09:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        recurrence: ["RRULE:FREQ=YEARLY;WKST=MO;INTERVAL=1"],
        iCalUID:
          "60rj4p9h60o6ab9kcopjcb9k6tij2b9ocksjcbb561gmap1k6lj34cho6g@google.com",
        sequence: 1,
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 0,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3033900289888000"',
        id: "6phm8oj660o66b9pcdi30b9k6gp36b9ochim2b9hcgr38d9l74qj2db1c8",
        status: "tentative",
        htmlLink:
          "https://www.google.com/calendar/event?eid=NnBobThvajY2MG82NmI5cGNkaTMwYjlrNmdwMzZiOW9jaGltMmI5aGNncjM4ZDlsNzRxajJkYjFjOF8yMDE4MTAwMlQwMjMwMDBaIG1hbmFsaWphaW4yNjc5OEBt",
        created: "2018-01-26T07:02:24.000Z",
        updated: "2018-01-26T07:02:24.983Z",
        summary: "Jinali's birthday",
        creator: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        organizer: {
          email: "manalijain26798@gmail.com",
          displayName: "Manali Jain",
          self: true,
        },
        start: {
          dateTime: "2018-10-02T08:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2018-10-02T09:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        recurrence: ["RRULE:FREQ=YEARLY;WKST=MO;INTERVAL=1"],
        iCalUID:
          "6phm8oj660o66b9pcdi30b9k6gp36b9ochim2b9hcgr38d9l74qj2db1c8@google.com",
        sequence: 1,
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 0,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3389902519180000"',
        id: "c9j30dhn64pmabb2ccqm2b9kc8o3ibb164o66bb5cpi3ccpocgqjachk60",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=YzlqMzBkaG42NHBtYWJiMmNjcW0yYjlrYzhvM2liYjE2NG82NmJiNWNwaTNjY3BvY2dxamFjaGs2MCBtYW5hbGlqYWluMjY3OThAbQ",
        created: "2023-09-17T11:46:27.000Z",
        updated: "2023-09-17T11:47:39.590Z",
        summary: "Medicine - powder",
        creator: {
          email: "manalijain26798@gmail.com",
          self: true,
        },
        organizer: {
          email: "manalijain26798@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2023-10-02T20:30:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2023-10-02T21:30:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        iCalUID:
          "c9j30dhn64pmabb2ccqm2b9kc8o3ibb164o66bb5cpi3ccpocgqjachk60@google.com",
        sequence: 1,
        reminders: {
          useDefault: true,
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3393417555170000"',
        id: "05i358op75po5oiq9mjfa34plc",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=MDVpMzU4b3A3NXBvNW9pcTltamZhMzRwbGMgbWFuYWxpamFpbjI2Nzk4QG0",
        created: "2023-10-07T19:59:37.000Z",
        updated: "2023-10-07T19:59:37.585Z",
        creator: {
          email: "manalijain26798@gmail.com",
          self: true,
        },
        organizer: {
          email: "manalijain26798@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2023-10-02T15:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: "2023-10-02T16:00:00+05:30",
          timeZone: "Asia/Kolkata",
        },
        iCalUID: "05i358op75po5oiq9mjfa34plc@google.com",
        sequence: 0,
        reminders: {
          useDefault: true,
        },
        eventType: "default",
      },
    ],
  };
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
        {console.log(eventData.items)}
        {mode ? (
          <EventList objList={eventData.items} />
        ) : (
          <TestCalender objList={eventData.items} />
        )}
      </main>
    </>
  );
}
