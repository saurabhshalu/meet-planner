/* eslint-disable react/prop-types */
export default function DayName({ dayOfWeek }) {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return <h4>{DAYS[dayOfWeek]}</h4>;
}
