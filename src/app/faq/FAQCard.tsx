type Props = {
  title: string;
  description: string;
};

const FAQCard = ({ title, description }: Props) => {
  return (
    <div className="border-dark-blue rounded-md shadow-[0_0_15px_#0B2447] w-[300px] p-6">
      <h2 className="text-dark-title text-lg mb-4 lg:mb-2 font-semibold">
        {title}
      </h2>
      <p className=" opacity-75">» {description}</p>
    </div>
  );
};

export default FAQCard;
