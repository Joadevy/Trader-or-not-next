export const endpoint = "https://api.binance.com/api/v3/ticker/price";

export const getPrice = async (symbol: string): Promise<number> => {
  const response = await fetch(`${endpoint}?symbol=${symbol}`);
  const data = await response.json();

  return parseFloat(data.price);
};
