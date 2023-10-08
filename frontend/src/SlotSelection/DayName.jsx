/* eslint-disable react/prop-types */
export default function DayName({ day }) {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return <h4>{DAYS[day]}</h4>;
}
