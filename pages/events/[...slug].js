import { getFilteredEvents } from "../../utils/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/event-detail/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = ({ hasError, filteredEvents, numDate }) => {
  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || !filteredEvents.length) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const { numYear, numMonth } = numDate;
  const date = new Date(numYear, numMonth - 1); // date constructor expects month to start at 0
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// there are too many different combinations of years / months (this is a catch all route, it would be too resource intensive to statically generate) and they're all equally likely to be picked since they are filters (not a good use case for fallback with getStaticPaths)
// use ssr to request appropriate data and generate page
export async function getServerSideProps(context) {
  const [year, month] = context.params.slug; // remember that these are strings
  const numYear = +year; // coerece string to number
  const numMonth = +month;

  // handle all logic here if possible, let the component focus solely on rendering and pass it props
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({ numYear, numMonth });
  return {
    props: {
      filteredEvents,
      numDate: { numYear, numMonth }
    },
  };
}

export default FilteredEventsPage;
