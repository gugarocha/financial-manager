export default function currencyMask(value) {
  let maskedValue = String(value);

  maskedValue = maskedValue.replace(/\D/g, '')
  maskedValue = maskedValue.replace(/(\d)(\d{2})$/, '$1,$2')
  maskedValue = maskedValue.replace(/(?=(\d{3})+(\D))\B/g, '.')
  
  return maskedValue;
};