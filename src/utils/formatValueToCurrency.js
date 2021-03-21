import currencyMask from "./currencyMask";

export default function formatValueToCurrency(value) {
  const formatedValue = currencyMask(Math.round(value * 100));

  return `R$ ${formatedValue}`;
};