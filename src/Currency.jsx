import React, { useEffect, useState } from "react";
import axios from "axios";

function Currency() {
  const [currenciesRates, setCurrenciesRates] = useState([]);

  useEffect(() => {
    const fetchCurrenciesRates = async () => {
      try {
        const apiKey = "6fb2ea298b814b619ce818be1cc59c80";
        const response = await axios.get(
          `https://api.currencyfreaks.com/latest?apikey=${apiKey}`
        );
        const data = response.data;

        const baseCurrency = "USD";
        const targetCurrencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

        const updatedCurrenciesRates = targetCurrencies.map((currency) => {
          const currencyData = parseFloat(data.rates[currency]);
          return {
            currency,
            exchangeRate: currencyData.toFixed(2),
            weBuy: (currencyData * 1.05).toFixed(2),
            weSell: (currencyData * 0.95).toFixed(2),
          };
        });

        setCurrenciesRates(updatedCurrenciesRates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchCurrenciesRates();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#409CDD",
        color: "#fff",
      }}
    >
      <h1>Display Currency Rates</h1>
      <div
        style={{
          display: "inline-block",
        }}
      >
        <table style={{ width: "50%", margin: "0 auto" }}>
          <tr>
            <th style={{ border: "1px solid #fff" }}>Currency</th>
            <th style={{ border: "1px solid #fff" }}>We Buy</th>
            <th style={{ border: "1px solid #fff" }}>Exchange Rate</th>
            <th style={{ border: "1px solid #fff" }}>We Sell</th>
          </tr>
          <tbody>
            {currenciesRates.map((rate) => (
              <tr key={rate.currency}>
                <td style={{ border: "1px solid #fff" }}>{rate.currency}</td>
                <td style={{ border: "1px solid #fff" }}>{rate.weBuy}</td>
                <td style={{ border: "1px solid #fff" }}>
                  {rate.exchangeRate}
                </td>
                <td style={{ border: "1px solid #fff" }}>{rate.weSell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Rates are based from 1 USD <br />
        This application users API from https://currencyfreaks.com/.
      </p>
    </div>
  );
}

export default Currency;
