import { useCallback, useEffect, useState } from "react";

import { getEntries } from '../services/firestore';

function useEntries(date) {
  const [entries, setEntries] = useState([]);
  const [futureEntries, setFutureEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const data = await getEntries(date);

    const current = [];
    const future = [];

    data.forEach(entry => 
      entry.datetime <= new Date()
        ? current.push(entry)
        : future.push(entry)
    );

    setEntries(current);
    setFutureEntries(future);

    setLoading(false);
  }, [date]);

  useEffect(fetchData, [fetchData]);

  return [entries, futureEntries, loading];
};

export default useEntries;