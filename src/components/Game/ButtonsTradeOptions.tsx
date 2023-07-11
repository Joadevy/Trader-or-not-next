import HomeButton from "../Buttons/HomeButton";

type Props = {
  higherPriceSelected: (_: boolean) => void;
};

const ButtonsTradeOptions = ({ higherPriceSelected }: Props) => {
  return (
    <div className="flex gap-2 h-10">
      <HomeButton
        handleClick={() => higherPriceSelected(true)}
        text="Higher price"
      />
      <HomeButton
        handleClick={() => higherPriceSelected(false)}
        text="Lower price"
      />
    </div>
  );
};

export default ButtonsTradeOptions;
