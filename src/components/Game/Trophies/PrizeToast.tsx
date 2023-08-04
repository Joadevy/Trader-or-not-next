import BottomRightToast from "../../Toast/BottomRightToast";

type Props = {
  score: number;
};

const PrizeToast = ({ score }: Props) => {
  return (
    <>
      {score === 1 ? (
        <BottomRightToast message="Boom! 1 prediction, 1 Rookie Trader Trophy claimed!" />
      ) : score === 2 ? (
        <BottomRightToast message="Binary brilliance! 2 perfect predictions, Beginner Trader Trophy in the bag!" />
      ) : score === 5 ? (
        <BottomRightToast message="High five! 5 predictions in a row, Advanced Trader Trophy earned!" />
      ) : score === 7 ? (
        <BottomRightToast message="Heptapredicted! 7 perfect calls, Specialist Trader Trophy unlocked!" />
      ) : score === 10 ? (
        <BottomRightToast message="Perfect ten! 10 consecutive predictions nailed, Professional Trader Trophy claimed!" />
      ) : score === 12 ? (
        <BottomRightToast message="Booyah! 12 flawless predictions, Master Trader Trophy conquered!" />
      ) : null}
    </>
  );
};

export default PrizeToast;
