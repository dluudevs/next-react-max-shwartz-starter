import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  // Programmatically navigate - navigate to a different page after an action is done
  // EventsPage handles it as we want pages to handle navigations, not components (EventsSearch)
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`)
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
