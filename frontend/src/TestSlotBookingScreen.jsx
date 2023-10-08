import { useState } from "react";
import Calendar from "react-calendar";
import "../node_modules/react-calendar/dist/Calendar.css";

const slotJson = [
  { start: "2018-01-20T09:00:00+05:30", end: "2018-01-20T10:00:00+05:30" },
  { start: "2018-01-20T11:00:00+05:30", end: "2018-01-20T12:00:00+05:30" },
  { start: "2018-01-20T13:00:00+05:30", end: "2018-01-20T14:00:00+05:30" },
  { start: "2018-01-20T17:00:00+05:30", end: "2018-01-20T18:00:00+05:30" },
];

function TestSlotBookingScreen() {
  // const [value, onChange] = useState<Value>(new Date());
  // const maxDate=(new Date()).getDate()+90;
  const maxCalenderDate = new Date();
  maxCalenderDate.setDate(new Date().getDate() + 90);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    // Add your save logic here
    // Typically, you would send data to the server or update state
    // For this example, we'll just close the popup
    closePopup();
  };

  return (
    <div className="row">
      <h1 className="font-medium mt-100">
        <center>Select Date and Time</center>
      </h1>
      <div className=" flex items-center justify-center h-screen">
        {/* <Calendar onChange={onChange} value={value} /> */}
        <Calendar
          value={selectedDate}
          onChange={handleDateClick}
          maxDate={maxCalenderDate}
          minDate={new Date()}
        />
        <div>
          {selectedDate && <p>Selected Date: {selectedDate.toDateString()}</p>}

          {slotJson.map((item, index) => (
            //   <li key={index}>{item}</li>
            <div
            onClick={openPopup}
              className="card text-gray-900 mt-2"
              key={index}
            >
              <div className="card-content">
                <h2 className="card-title">
                  {item.start} - {item.end}
                </h2>
                {/* <p className="card-description">
              This is a sample card description.
            </p>
            <button className="card-button">Learn More</button> */}
              </div>
            </div>
          ))}
        </div>
        {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h2>Enter Details</h2> 
              {/* title,desc,time,email */}
              <p>This is the content of the popup.</p>
              <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="Title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="Title"
                  name="Title"
                  type="Title"
                  autoComplete="Title"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  id="Description"
                  name="Description"
                  type="Description"
                  autoComplete="Description"
                  required
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Time
              </label>
              <div className="mt-2">
                Selected Time slot
              </div>
            </div>

          </form>

              <button className="close-button" onClick={closePopup}>
                Close
              </button>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default TestSlotBookingScreen;
