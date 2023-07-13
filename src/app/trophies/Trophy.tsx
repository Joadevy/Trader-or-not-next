import Image from "next/image";

type Props = {
  srcImg: string;
  name: string;
  gained: boolean;
  description: string;
  date?: string;
};

const Trophy = ({ srcImg, gained, name, description, date }: Props) => {
  return (
    <div className="border border-dark-blue rounded-md flex p-3">
      <header className={"order-2 " + (gained ? "" : "text-gray-500")}>
        <h2>{name}</h2>
        <p>{description}</p>
        {gained && <p>Obtained on {date}</p>}
      </header>
      <div className="w-20 h-20 relative order-1">
        <Image fill alt="" className={gained ? "" : "grayscale"} src={srcImg} />
      </div>
    </div>
  );
};

export default Trophy;
