import { useEffect, useState } from "react";

import { getEntries } from '../services/firestore';

function useEntries(date) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async (date) => {
      const data = await getEntries(date);
      setEntries(data);
    }

    fetchData(date);
  }, [date, entries]);

  return [entries];
};

export default useEntries;