import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage() {
  const [sales, setSales] = useState();
  /* const [isLoading, setIsLoading] = useState(false); */

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const requestUrl = "https://nextjs-dummy-backend-1fdba-default-rtdb.europe-west1.firebasedatabase.app/sales.json";

  /* const { data, error } = useSWR(requestUrl, (url) => fetch(url).then((res) => res.json())); */
  const { data, error } = useSWR(requestUrl, fetcher);

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
      }

      setSales(transformedSales);
      console.log();
    }
  }, [data]);

  /* 
    Other way of doing it...without SWR 
    ------------------------------------
    useEffect(() => {
    setIsLoading(true);
    fetch(url).then((response) =>
      response.json().then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
        }

        setSales(transformedSales);
        setIsLoading(false);
      })
    );
  }, []); */

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!sales) {
    return <p>Is Loading content...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
