import { useEffect, useState } from "react";

import { getEntries } from '../services/firestore';

function useEntries(date) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (date) => {
      const data = await getEntries(date);
      setEntries(data);
      setLoading(false)
    }

    fetchData(date);
  }, [date, entries]);

  return [entries, loading];
};

export default useEntries;