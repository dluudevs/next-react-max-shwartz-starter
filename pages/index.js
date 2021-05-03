import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../utils/api-util";

const HomePage = ({ featuredEvents }) => {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta 
          name="description" 
          content="Find alot of great events that allow you to evolve..."
        />
      </Head>
      <div>
        <EventList items={featuredEvents} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
      revalidate: 1800, // 30 minutes
    },
  };
}

export default HomePage;
