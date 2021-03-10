import currencyMask from "./currencyMask";

export default function formatValueToCurrency(value) {
  const formatedValue = currencyMask(value * 100);

  return `R$ ${formatedValue}`;
};