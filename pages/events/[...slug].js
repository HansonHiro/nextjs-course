import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/events/error-alert";

import useSWR from "swr";
import Head from "next/head";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const fetcher = (url) => fetch(url).then((r) => r.json());

  const filterData = router.query.slug; //used to client-side data fetching

  const { data, error } = useSWR(
    "https://nextjs-course-41ccc-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  console.log("test data", data);
  console.log("test error", error);
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key], //every nested objects / fields. but somehow the title is not shown.
        });
      }

      // return events;
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth; //transform to numbers with +

  if (
    // props.hasError) { //since now is using client-side data fetching.
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values! </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = props.events;
  // getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <p>No events found for chosen filter!</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1); //Date starts from zero instead of one.
  // (numYear, numMonth - 1)
  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}.`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug; //access .slug because slug is the catch-all grouping parameter name.

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth; //transform to numbers with +

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//     };
//     // <Fragment>
//     //   <ErrorAlert>
//     //     <p>Invalid filter. Please adjust your values! </p>
//     //   </ErrorAlert>
//     //   <div className="center">
//     //     <Button link="/events">Show All Events</Button>
//     //   </div>
//     // </Fragment>  => not possible to return jsx, need to be object.
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
