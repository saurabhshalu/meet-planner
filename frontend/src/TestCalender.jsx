/* eslint-disable no-const-assign */
import { useState } from "react";
import WeekCalendar from "react-week-calendar";
import "react-week-calendar/dist/style.less";

const bookedSlots = [
  {
    start: new Date(2023, 9, 11, 10, 0),
    end: new Date(2023, 9, 11, 11, 0),
    title: "Meeting 1",
  },
  {
    start: new Date(2023, 9, 12, 14, 0),
    end: new Date(2023, 9, 12, 15, 0),
    title: "Meeting 2",
  },
  // Add more booked slots as needed
];

function TestCalender() {
  const [selectedDateDynamic, setselectedDateDynamic] = useState(new Date());

  // Define a function to determine if a date is disabled
  const isDateDisabled = (date) => {
    var dayOfWeek = date.getDay();
    var isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
    return isWeekend; // Change this based on your logic
  };

  // Define a function to customize event rendering
  const eventRender = (event, key) => {
    // Apply custom styling for disabled slots
    const isDisabled = isDateDisabled(event.start);
    const eventStyles = {
      backgroundColor: isDisabled ? "gray" : "blue",
      color: isDisabled ? "black" : "white",
      opacity: isDisabled ? 0.6 : 1,
      cursor: isDisabled ? "not-allowed" : "pointer",
    };

    return (
      <div key={key} className="custom-event" style={eventStyles}>
        {event.title}
      </div>
    );
  };

  const handleIntervalSelect = () => {
    return true;
  };

  const handleLeftClick = () => {
    // Add your custom logic here
    console.log("here...1");
    var updatedDate = JSON.parse(JSON.stringify(selectedDateDynamic));
    updatedDate.setDate(selectedDateDynamic.getDate() - 7);
    if (!updatedDate < new Date()) {
      console.log(updatedDate);
      console.log(selectedDateDynamic);
      selectedDateDynamic = updatedDate;
    }
  };

  const handleRightClick = () => {
    const updatedDate = new Date(selectedDateDynamic.getTime());
    const maxCalenderDate = new Date();
    maxCalenderDate.setDate(new Date().getDate() + 90);
    updatedDate.setDate(selectedDateDynamic.getDate() + 7);
    if (updatedDate > new Date() && updatedDate < maxCalenderDate) {
      console.log(updatedDate);
      setselectedDateDynamic(new Date(updatedDate.getTime()));
      console.log(selectedDateDynamic);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-md-offset-3 px-50"></div>
        <h1>
          <button onClick={handleLeftClick}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.8 13H15q.425 0 .713-.288T16 12q0-.425-.288-.713T15 11h-3.2l.9-.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275l-2.6 2.6q-.3.3-.3.7t.3.7l2.6 2.6q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7l-.9-.9Zm.2 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                />
              </svg>
            </span>
          </button>
          <span>My Week Calendar</span>

          <button onClick={handleRightClick}>
            <span className="py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <g transform="rotate(180 12 12)">
                  <path
                    fill="currentColor"
                    d="M11.8 13H15q.425 0 .713-.288T16 12q0-.425-.288-.713T15 11h-3.2l.9-.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275l-2.6 2.6q-.3.3-.3.7t.3.7l2.6 2.6q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7l-.9-.9Zm.2 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                  />
                </g>
              </svg>
            </span>
          </button>
        </h1>
        <div className="px-5">
          <WeekCalendar
            selectedDate={selectedDateDynamic} // Initial date to display
            events={bookedSlots} // List of events to display
            showTime={true} // Show event times
            scaleUnit={60}
            dayFormat={"DD.MM.YYYY ,ddd"}
            // scaleFormat={'HH:mm:ss'}
            onEventClick={(event) =>
              console.log("onEventClick", event, bookedSlots)
            }
            onIntervalSelect={handleIntervalSelect}
            onIntervalUpdate={(event) => console.log("onIntervalUpdate", event)}
            onIntervalRemove={(event) => console.log("onIntervalRemove", event)}
            eventRender={eventRender}
          />
        </div>
      </div>
    </>
  );
}

export default TestCalender;
