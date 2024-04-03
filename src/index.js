const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

// all currency names
app.get("/getAllCurrencyNames", async (req, res) => {
  const nameURL =
    "https://openexchangerates.org/api/currencies.json?app_id=147f5ac3197745199b93ae3fd45d5258";
  // data fetching from the api (fetching means getting the data from the api and storing it in the variable)
  try {
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;
    return res.json(nameData);
  } catch (err) {
    console.error(err);
  }
});

//target currency
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountinSourceCurrency } =
    req.query;
  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=147f5ac3197745199b93ae3fd45d5258`;
    const dataResponce = await axios.get(dataUrl);
    const rates = dataResponce.data.rates;

    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetAmount = (targetRate / sourceRate) * amountinSourceCurrency;

    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.error(err);
  }
});

//list of all the posts
app.listen(5000, () => {
  console.log("Server is running ");
});
