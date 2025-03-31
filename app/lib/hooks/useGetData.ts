import { useEffect, useState } from "react";

export const useGetData = () => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  //   // via fetch

  useEffect(() => {
    // used to abort a previous call.  useful if you are doing multiple fetches consecutively
    // to prevent race conditions when trying to call setData
    const controller = new AbortController();

    fetch("https://dummyjson.com/products", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    return () => {
      controller.abort();
    };
  }, []);
};
