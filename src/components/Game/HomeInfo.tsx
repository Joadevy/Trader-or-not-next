import { CryptoTicker } from "./gameHelpers";

type Props = {
  ticker: CryptoTicker;
  initialPrice: number;
};

const HomeInfo = ({ ticker, initialPrice }: Props) => {
  return (
    <>
      <h2>
        Cryptocurrency name:{" "}
        <span className=" text-dark-blue-300">
          {ticker.name} ({ticker.shortName})
        </span>
      </h2>
      <h3>
        Actual Price:{" "}
        <span className=" text-dark-blue-300">{initialPrice.toFixed(2)}</span>
      </h3>
    </>
  );
};

export default HomeInfo;
