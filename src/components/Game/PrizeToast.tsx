import BottomRightToast from "../Toast/BottomRightToast";

type Props = {
  score: number;
};

const PrizeToast = ({ score }: Props) => {
  return (
    <>
      {score === 2 ? (
        <BottomRightToast message="🏆: You got 2 predicts in a row and won the rookie trader trophy!" />
      ) : score === 5 ? (
        <BottomRightToast message="🏆: You got 5 predicts in a row and won the middle trader trophy!" />
      ) : score === 7 ? (
        <BottomRightToast message="🏆: You got 7 predicts in a row and won the senior trader trophy!" />
      ) : score === 10 ? (
        <BottomRightToast message="🏆: You got 10 predicts in a row and won the professional trader trophy!" />
      ) : null}
    </>
  );
};

export default PrizeToast;
