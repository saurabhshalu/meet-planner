import { useState } from "react";
import DayName from "./DayName";

export default function SlotSelection() {
  const [data, setData] = useState({});

  const defaultData = [
    {
      dayOfWeek: 0,
      startTime: "09:00:00",
      endTime: "17:00:00:00",
      isAvailable: false,
    },
    {
      dayOfWeek: 1,
      startTime: "09:00:00",
      endTime: "17:00:00",
      isAvailable: true,
    },
    {
      dayOfWeek: 2,
      startTime: "09:00:00",
      endTime: "17:00:00",
      isAvailable: true,
    },
    {
      dayOfWeek: 3,
      startTime: "09:00:00",
      endTime: "17:00:00",
      isAvailable: true,
    },
    {
      dayOfWeek: 4,
      startTime: "09:00:00",
      endTime: "17:00:00",
      isAvailable: true,
    },
    {
      dayOfWeek: 5,
      startTime: "09:00:00",
      endTime: "17:00:00",
      isAvailable: true,
    },
    {
      dayOfWeek: 6,
      startTime: "09:00:00",
      endTime: "17:00:00",
      isAvailable: false,
    },
  ];

  data.timeslots = defaultData;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Availability
          </h2>
          <main>
            <h2 className="text-lg font-bold my-2">Set your weekly hours</h2>
            <div className="flex flex-col	">
              <span className="flex justify-between">
                <h3 className="mb-5 text-lg font-medium text-gray-700 ">
                  Choose a duration:
                </h3>
                <ul className="grid w-full gap-6 md:grid-cols-3">
                  <li>
                    <input
                      type="radio"
                      id="minimumMeetingDuration_30"
                      value=""
                      className="hidden peer"
                      name="minimumMeetingDuration"
                    />
                    <label
                      htmlFor="timeslot_30"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-red-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50  "
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          30 mins
                        </div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="minimumMeetingDuration_60"
                      value=""
                      className="hidden peer"
                      name="minimumMeetingDuration"
                    />
                    <label
                      htmlFor="timeslot_60"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-red-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 "
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          60 mins
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </span>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Set your Custom Link
                </label>

                <div className="mt-2 mb-5">
                  <div className="custom-link flex flex-row">
                    <label className="pt-1 bg-slate-400 px-4">
                      cookies.com/
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-none "
                    />
                  </div>
                </div>
                <span className="flex">
                  <input
                    type="checkbox"
                    className="mr-3 mb-8 mt-0"
                    name="custom-link-confirmation"
                  />
                  <label htmlFor="custom-link-confirmation">
                    Custom link once created would not be changed. You sure want
                    to proceed?
                  </label>
                </span>
              </div>
              <table className="gap-10">
                {defaultData.map((obj) => {
                  return (
                    <tr key={obj.dayOfWeek}>
                      <td className="my-5">
                        <input
                          type="checkbox"
                          name="DaysAvailable"
                          checked={obj.isAvailable}
                        />
                      </td>
                      <td className="px-2">
                        <DayName dayOfWeek={obj.dayOfWeek} />
                      </td>
                      <td className="px-2">
                        <input
                          type="time"
                          name={"startTime-" + obj.dayOfWeek}
                          step={30}
                          value={obj.isAvailable && obj.startTime}
                        />
                      </td>
                      <td className="px-2">
                        <input
                          type="time"
                          name={"endTime-" + obj.dayOfWeek}
                          step={30}
                          value={obj.isAvailable && obj.endTime}
                        />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </main>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
