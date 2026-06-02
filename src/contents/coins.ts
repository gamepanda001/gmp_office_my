import currencies from "./currency.json"


const coinList = currencies.map((currency) => currency.id);

// const coinList = [
//   "AED",
//   "AUD",
//   "BDT",
//   "BRL",
//   "CLP",
//   "COP",
//   "EGP",
//   "ETB",
//   "EUR",
//   "GHS",
//   "IDR",
//   "INR",
//   "KES",
//   "KRW",
//   "KWD",
//   "LBP",
//   "MMK",
//   "MXN",
//   "MYR",
//   "NGN",
//   "NPR",
//   "PEN",
//   "PHP",
//   "PKR",
//   "SAR",
//   "SEK",
//   "THB",
//   "TND",
//   "TRY",
//   "UGX",
//   "USD",
//   "VND",
//   "XAF",
//   "XOF",
//   "ZAR",
// ];

export const currenciesArr= currencies

export default coinList;
