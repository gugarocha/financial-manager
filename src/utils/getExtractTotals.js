export function getTotalCredit(entries) {
  const totalCredit = entries.reduce((acumulator, entry) => {
    if (entry.category === 'credit') {
      return acumulator + entry.value;
    };
    return acumulator;
  }, 0);

  return totalCredit || 0;
};

export function getTotalDebit(entries) {
  const totalDebit = entries.reduce((acumulator, entry) => {
    if (entry.category === 'debit') {
      return acumulator + entry.value;
    };
    return acumulator;
  }, 0);

  return totalDebit || 0;
};

export function getTotalBalance(entries) {
  const totalBalance = entries.reduce((acumulator, entry) => {
    if (entry.category === 'credit') {
      return acumulator + entry.value;
    };
    return acumulator - entry.value
  }, 0);

  return totalBalance || 0;
};