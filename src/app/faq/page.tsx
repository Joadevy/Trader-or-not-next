import FAQCard from "./FAQCard";

const page = () => {
  return (
    <main className="p-4 text-dark-text">
      <h1 className="text-dark-title text-2xl mb-4 text-center lg:text-left">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-wrap gap-8 items-center justify-center lg:items-stretch lg:justify-normal">
        <FAQCard
          description="It's a game where you have to predict the price of cryptocurrencies, accumulating points for each correct prediction and winning trophies."
          title="What is this app about?"
        />

        <FAQCard
          description="When you make a correct prediction, you earn one point. However, if you make a wrong prediction, you will lose all your points. So, be careful and patient!"
          title="What are the rules of the game?"
        />

        <FAQCard
          description="A cryptocurrency is a digital form of currency secured by cryptography and operates on decentralized networks, like blockchain."
          title="What is cryptocurrency?"
        />

        <FAQCard
          description="A trader is a person who aims to make money by buying and selling assets. They are constantly engaged in predicting future price movements."
          title="What is a trader?"
        />

        <FAQCard
          description="It represents a continuous sequence of positive outcomes without any intervening opposite results."
          title="What is a streak of trades?"
        />

        <FAQCard
          description="Due to its highly volatile nature and the market's continuous 24/7 operation, the cryptocurrency experiences frequent price fluctuations."
          title="Why does the price change every 5 seconds?"
        />

        <FAQCard
          description="Yes, it's the actual and past prices of each asset in the market. For that reason, it might not change at some point when you select an option."
          title="Is asset price real?"
        />
      </div>
    </main>
  );
};

export default page;
