import { useEffect, useState } from "react";

import { getEntries } from '../services/firestore';

function useEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEntries();
      setEntries(data);
    }

    fetchData();
  }, [])

  return [entries];
};

export default useEntries;