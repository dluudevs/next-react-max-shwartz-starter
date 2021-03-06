import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../utils/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  // Programmatically navigate - navigate to a different page after an action is done
  // EventsPage handles it as we want pages to handle navigations, not components (EventsSearch)
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="find a lot of great events that allow you to evolve"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
