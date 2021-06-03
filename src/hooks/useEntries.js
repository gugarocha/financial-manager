import { useCallback, useEffect, useState } from "react";

import { getEntries } from '../services/firestore';

function useEntries(date) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const data = await getEntries(date);
    setEntries(data);
    setLoading(false);
  }, [date]);

  useEffect(fetchData, [fetchData]);

  return [entries, loading];
};

export default useEntries;