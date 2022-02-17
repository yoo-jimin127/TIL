import {useState, useEffect} from "react";

function Cointracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect (() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then(json => {
      setCoins(json); // coin state change
      setLoading(false); // loading state change
    });
  }, []);

  return (
    <div>
      <h1>The Coins! {coins.length === 0 ? null : `[${coins.length}]` }</h1>
      {loading ? <strong>Loading...</strong> : 
      <ul>
        {coins.map((coin => 
        <li>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD</li>
        ))}
      </ul>}
    </div>
  );
}

export default Cointracker;