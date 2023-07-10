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

  return (
    <div className="h-10">
      <p className="text-3xl">{timeLeft}</p>
    </div>
  );
};

export default Countdown;
