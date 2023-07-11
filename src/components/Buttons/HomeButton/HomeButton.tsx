type Props = {
  text: string;
  handleClick: () => void;
};

export const HomeButton = ({ text, handleClick }: Props) => {
  return (
    <button
      className="text-dark-title bg-dark-blue-100 hover:bg-dark-blue-100/80 focus:ring-4 focus:outline-none focus:ring-dark-blue-100/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-dark-blue-100/80 dark:focus:ring-dark-blue-100/40"
      type="button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
