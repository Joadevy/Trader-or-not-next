"use client";
import Image from "next/image";

type Props = {
  srcImg: string;
  name: string;
  gained: boolean;
  description: string;
  date?: Date;
};

const Trophy = ({ srcImg, gained, name, description, date }: Props) => {
  return (
    <div className="border border-dark-blue rounded-md flex p-3 w-[350px] h-[100px]">
      <header className={"order-2 " + (gained ? "" : "text-gray-500")}>
        <h2>{name}</h2>
        <p>{description}</p>
        {gained && (
          <p>
            {date
              ? "Obtained on " +
                new Date(date).toLocaleString(navigator.language ?? "es-AR")
              : ""}
          </p>
        )}
      </header>
      <div className="w-20 h-20 relative order-1">
        <Image
          fill
          alt=""
          className={gained ? "" : "grayscale"}
          sizes="10vw"
          src={srcImg}
        />
      </div>
    </div>
  );
};

export default Trophy;
