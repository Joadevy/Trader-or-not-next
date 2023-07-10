type Props = {
  handleClick: () => void;
  description: string;
};

const BackButton = ({ handleClick, description }: Props) => {
  return (
    <button
      className="text-white bg-dark-blue-100 hover:bg-dark-blue-100/80 focus:ring-4 focus:outline-none focus:ring-dark-blue-100/50 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:hover:bg-dark-blue-100/80 dark:focus:ring-dark-blue-100/40"
      type="button"
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        className="w-4 h-4 rotate-180"
        fill="none"
        viewBox="0 0 14 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5h12m0 0L9 1m4 4L9 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <span className="sr-only">{description}</span>
    </button>
  );
};

export default BackButton;
