const LoaderTrophy = () => {
  return (
    <div className="border border-gray-500 rounded-md flex gap-2 p-3 w-[350px] h-[100px] animate-pulse">
      <header className="order-2 h-14 w-full flex flex-col gap-2">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <div className="h-3 w-1/2 bg-gray-500 rounded-md" />
        <div className="h-5 w-full bg-gray-500 rounded-md" />
      </header>
      <div className="w-12 h-12 relative order-1 bg-gray-400 rounded-full" />
    </div>
  );
};

export default LoaderTrophy;
