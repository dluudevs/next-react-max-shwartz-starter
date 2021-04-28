import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../utils/api-util";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
      revalidate: 900,
    },
  };
}

export default HomePage;
