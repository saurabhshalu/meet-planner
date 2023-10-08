import { useEffect, useState } from "react";
import DayName from "./DayName";
import { toast } from "react-toastify";
import axios from "axios";
import useAuthenticated from "../hooks/useAuthenticated";
import FullScreenLoader from "../Components/FullScreenLoader";
import { useNavigate } from "react-router-dom";

const defaultData = [
  {
    day: 0,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isActive: false,
  },
  {
    day: 1,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isActive: true,
  },
  {
    day: 2,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isActive: true,
  },
  {
    day: 3,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isActive: true,
  },
  {
    day: 4,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isActive: true,
  },
  {
    day: 5,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isActive: true,
  },
  {
    day: 6,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isActive: false,
  },
];

export default function SlotSelection() {
  const [accepted, setAccepted] = useState(false);
  const { userDetails } = useAuthenticated();

  const [customLink, setCustomLink] = useState("");

  const [duration, setDuration] = useState(30);
  const [slotData, setSlotData] = useState(defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8000/planner/details/${userDetails.email}`
        );

        if (!data.success) {
          toast.error(data.message || "Something went wrong....");
          return navigate("/dashboard");
        }
        if (data.message && Object.values(data.message).length > 1) {
          setSlotData(data.message.timeslots);
          setCustomLink(data.message.customURL);
          setDuration(data.message.minimumMeetingDuration);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAvailableChange = (week, available) => {
    setSlotData((old) => {
      const currentItems = [...old];
      currentItems[week].isActive = available;
      return currentItems;
    });
  };

  const handleDateChange = (week, value, which = "start") => {
    setSlotData((old) => {
      const currentItems = [...old];
      if (which === "start") {
        currentItems[week].startTime = value;
      } else {
        currentItems[week].endTime = value;
      }
      return currentItems;
    });
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:8000/planner/InsertPlannerDetails`,
        {
          uniqueLink: customLink,
          email: userDetails.email,
          minimumMeetingDuration: duration,
          timeslots: slotData,
        }
      );
      if (!data.success) {
        return toast.error(data.message || "Something went wrong....");
      }

      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Availability
          </h2>
          <main>
            <h2 className="text-lg font-bold my-2">Set your weekly hours</h2>
            <div className="flex flex-col	">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value={30}>30 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
              {/* <span className="flex justify-between">
                <h3 className="mb-5 text-lg font-medium text-gray-700 ">
                  Choose a duration:
                </h3>
                <ul className="grid w-full gap-6 md:grid-cols-3">
                  <li>
                    <input
                      type="radio"
                      id="minimumMeetingDuration_30"
                      value={30}
                      checked={duration}
                      className="hidden peer"
                      name="minimumMeetingDuration"
                      onChange={(e) => setDuration(e.target.value)}
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
                      value={60}
                      checked={duration}
                      onChange={(e) => setDuration(e.target.value)}
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
              </span> */}
              <br />
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
                      id="textcustom"
                      name="uniqueText"
                      type="text"
                      required
                      value={customLink}
                      onChange={(e) => setCustomLink(e.target.value)}
                      className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-none "
                    />
                  </div>
                </div>
              </div>
              <table className="gap-10">
                {slotData.map((obj) => {
                  return (
                    <tr key={obj.day}>
                      <td className="my-5">
                        <input
                          type="checkbox"
                          name="DaysAvailable"
                          checked={obj.isActive}
                          onChange={(e) =>
                            handleAvailableChange(obj.day, e.target.checked)
                          }
                        />
                      </td>
                      <td className="px-2">
                        <DayName day={obj.day} />
                      </td>
                      <td className="px-2">
                        <input
                          type="time"
                          name={"startTime-" + obj.day}
                          step={30}
                          value={obj.isActive && obj.startTime}
                          onChange={(e) => {
                            handleDateChange(obj.day, e.target.value, "start");
                          }}
                        />
                      </td>
                      <td className="px-2">
                        <input
                          type="time"
                          name={"endTime-" + obj.day}
                          step={30}
                          value={obj.isActive && obj.endTime}
                          onChange={(e) => {
                            handleDateChange(obj.day, e.target.value, "end");
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </main>
          <button
            onClick={handleSave}
            disabled={!customLink || !accepted}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed"
          >
            Save
          </button>
          <div className="flex">
            <input
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              type="checkbox"
              className="mr-3 mb-8 mt-0"
              name="custom-link-confirmation"
            />
            <label htmlFor="custom-link-confirmation">
              Custom link once created would not be changed. You sure want to
              proceed?
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
