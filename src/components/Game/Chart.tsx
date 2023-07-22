import { createChart, ColorType, Time } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

import { CryptoTicker } from "./gameHelpers";

// eslint-disable-next-line import/no-unresolved
import { getHistoricalPrices } from "@/utils/api/api";

type Props = {
  ticker: CryptoTicker;
  data: Data[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
};

export type Data = {
  time: Time;
  value: number;
};

type ChartProps = {
  ticker: CryptoTicker;
};

export const ChartComponent = (props: Props) => {
  const {
    data,
    colors: {
      backgroundColor = "#0B2447",
      lineColor = "#2962FF",
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const chartContainerRef: any = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true,
      },
    });

    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });

    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

function Chart({ ticker }: ChartProps) {
  const [data, setData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    getHistoricalPrices(ticker.symbol, "1m", 20).then((data) => setData(data));
  }, [ticker]);

  if (!data)
    return (
      <div className=" rounded-lg border border-slate-600 overflow-hidden mt-2 w-full h-[350px] flex items-center justify-center">
        <p className="text-slate-600 animate-spin text-3xl">↻</p>
      </div>
    );

  return <ChartComponent data={data} ticker={ticker} />;
}

export default Chart;
