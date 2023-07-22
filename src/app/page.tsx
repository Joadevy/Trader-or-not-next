// eslint-disable-next-line import/no-unresolved
// import CryptoBackgrounds from "@/components/CryptoBackground";
// eslint-disable-next-line import/no-unresolved
import HomeMenu from "@/components/homeMenu";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center p-6 lg:pb-6 relative">
      <header className="text-dark-text flex flex-col items-center gap-2 lg:gap-0 text-center">
        <h1 className="text-4xl font-bold text-dark-title">
          You are a pro trader! Aren&apos;t you?
        </h1>
        <p>
          » Try to find out if the price of the cryptocurrency will rise or fall
          within 5 seconds.
        </p>
      </header>

      <HomeMenu />
      {/* <CryptoBackgrounds /> */}
    </main>
  );
}
