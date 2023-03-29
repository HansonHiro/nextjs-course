import useSWR from "swr";

function TestPage() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://nextjs-course-41ccc-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  console.log("test data", data);
  console.log("test error", error);
  return <h1>Test Page</h1>;
}

export default TestPage;
