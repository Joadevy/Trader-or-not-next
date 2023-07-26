import React from "react";

type Props = {
  children: React.ReactNode;
};

const StatCardContainer = ({ children }: Props) => {
  return (
    <div className="border-dark-blue rounded-md shadow-[0_0_25px_#19376D] w-[300px] p-6 bg-dark-blue">
      {children}
    </div>
  );
};

export default StatCardContainer;
