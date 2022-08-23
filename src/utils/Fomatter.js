import currency from "currency.js";

export function formatCurrency(number) {
  return currency(number, {symbol: '', precision: 0}).format()
}
