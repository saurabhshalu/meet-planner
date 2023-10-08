/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import EventItem from "./EventItem/EventItem";

export default function EventList({ items = [] }) {
  return (
    <div className="flex gap-5 flex-wrap">
      {items?.map((x) => (
        <>
          <EventItem key={x.id} data={x} />
        </>
      ))}
    </div>
  );
}
