import type { CryptoTicker } from "@/components/Game/gameHelpers";

import CryptoButton from "../Buttons/CryptoButton";

type Props = {
  higherPriceSelected: (_: boolean) => void;
  shortNameTicker: CryptoTicker["shortName"];
};

const ButtonsTradeOptions = ({
  higherPriceSelected,
  shortNameTicker,
}: Props) => {
  return (
    <div className="flex gap-2 h-10">
      <CryptoButton
        handleClick={() => higherPriceSelected(true)}
        isHigher={true}
        shortNameTicker={shortNameTicker}
        text="Higher price"
      />
      <CryptoButton
        handleClick={() => higherPriceSelected(false)}
        isHigher={false}
        shortNameTicker={shortNameTicker}
        text="Lower price"
      />
    </div>
  );
};

export default ButtonsTradeOptions;
