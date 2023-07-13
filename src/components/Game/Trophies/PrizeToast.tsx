import BottomRightToast from "../../Toast/BottomRightToast";

type Props = {
  score: number;
};

const PrizeToast = ({ score }: Props) => {
  return (
    <>
      {score === 1 ? (
        <BottomRightToast message="🏆: You got 1 predict and won the Rookie Trader Trophy!" />
      ) : score === 2 ? (
        <BottomRightToast message="🏆: You got 2 predicts in a row and won the Beginner Trader Trophy!" />
      ) : score === 5 ? (
        <BottomRightToast message="🏆: You got 5 predicts in a row and won the Advanced Trader Trophy!" />
      ) : score === 7 ? (
        <BottomRightToast message="🏆: You got 7 predicts in a row and won the Specialist Trader Trophy!" />
      ) : score === 10 ? (
        <BottomRightToast message="🏆: You got 10 predicts in a row and won the Professional Trader Trophy!" />
      ) : score === 12 ? (
        <BottomRightToast message="🏆: You got 12 predicts in a row and won the Master Trader Trophy!" />
      ) : null}
    </>
  );
};

export default PrizeToast;
