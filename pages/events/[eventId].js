import { getFeaturedEvents, getEventById } from "../../utils/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event,
      revalidate: 30 // rmb this simply re-renders the page (and fetches data again) if a new event page is created, this needs to be generated during build time. revalidate will NOT pick it up (static pages dont have to worry about this because only the data changes not the pages being generated)
    },
  };
}

export async function getStaticPaths() {
  // load only featuredEvents to save build and load time
  const event = await getFeaturedEvents();
  const paths = event.map((e) => ({
    params: {
      eventId: e.id
    }
  }));

  return {
    paths,
    fallback: 'blocking', // cannot be false since only some pages are built, otherwise pages not returned by getStaticPaths will result in a 404 
    //true will dynamically generate a page that wasn't generated statically. Component renders first (and any loading state) and then the getStaticProps function
    //blocking the component does not render first, getStaticProps called before the component, wait for HTML to be generated (behaves similar to SSR without the ssr function)
  };
}

export default EventDetailPage;
