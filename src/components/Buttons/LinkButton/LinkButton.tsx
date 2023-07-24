import Link from "next/link";

type Props = {
  text: string;
  linkTO: string;
};

export const LinkButton = ({ text, linkTO }: Props) => {
  return (
    <Link
      className="text-lg text-dark-title bg-dark-blue-100 hover:bg-dark-blue-100/80 focus:ring-4 focus:outline-none focus:ring-dark-blue-100/50 font-medium rounded-lg  px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-dark-blue-100/80 dark:focus:ring-dark-blue-100/40"
      href={linkTO}
    >
      {text}
    </Link>
  );
};
