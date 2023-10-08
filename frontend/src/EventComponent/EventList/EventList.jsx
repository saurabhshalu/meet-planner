
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import EventItem from "./EventItem/EventItem";

export default function EventList({ objList }) {
  return (
    <>
      {objList?.map((x) => (
        <>
          <EventItem data={x} />
        </>
      ))}
    </>
  );
}
