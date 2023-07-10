"use client";

// eslint-disable-next-line import/no-unresolved
import { TradeResult } from "@/components/Game/Game";

const page = () => {
  const historyTrades = localStorage.getItem("tradesInARow")
    ? (JSON.parse(localStorage.getItem("tradesInARow")!) as TradeResult[])
    : [];

  return (
    <main>
      <h1 className=" text-dark-title text-2xl">Successful streak of trades</h1>
      <div className=" text-dark-text flex gap-2">
        {historyTrades.map((trade, index) => (
          <div key={index} className="border p-2 rounded-md">
            <p>Crypto: {trade.ticker.name}</p>
            <p>Initial price: {trade.initialPrice}</p>
            <p>Final price: {trade.finalPrice}</p>
            <p>Selection: {trade.selection} price</p>
            <p>{new Date(trade.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
