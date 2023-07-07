import { useEffect, useState } from "react";

type Props = {
  seconds: number;
};

const Countdown = ({ seconds }: Props) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft > 1) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return <>{timeLeft}</>;
};

export default Countdown;
