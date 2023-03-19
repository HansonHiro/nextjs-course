import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales); //undefined if useState()
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    //from swr hook
    "https://nextjs-course-41ccc-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  ); //transformation (?)

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-41ccc-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = []; //from object to array as in firebase

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []); //sales.json is from Firebase table.

  //   if (isLoading) {
  //     return <p> Loading...</p>;
  //   }

  //   if (!sales) {
  //     return <p>No data yet.</p>;
  //   }

  if (error) {
    return <p>Failed to load.</p>;
  }
  if (!data && !sales) {
    return <p> Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li> // render initial sales.
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  //good for swift data changes.
  //next js feature not react
  const response = await fetch(
    "https://nextjs-course-41ccc-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = []; //from object to array as in firebase

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformedSales } }; //re-execute with revalidate: 10 every 10 sec after deployment.
}

export default LastSalesPage;
