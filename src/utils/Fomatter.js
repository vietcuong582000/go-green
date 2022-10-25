import currency from "currency.js";
import moment from "moment";

export function formatCurrency(number) {
  return currency(number, {symbol: '', precision: 0}).format()
}

export function formatDate(value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY')
  }
}
