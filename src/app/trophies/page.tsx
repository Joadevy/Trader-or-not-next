// "use client";
import Trophy from "./Trophy";

const page = () => {
  //   const dataTrophies = localStorage.getItem("trophies") ?? "[]";

  return (
    <main className="text-dark-text p-4">
      <h1 className=" text-dark-title text-2xl">My trophies</h1>

      <article className="grid grid-cols-2 grid-flow-row-dense gap-4 mt-4">
        <Trophy
          description="Obtain 1 trades in a row to unlock."
          gained={true}
          name="Rookie Trophy"
          srcImg="/img/trophies/1TrophyIcon.webp"
        />
        <Trophy
          description="Obtained because you got 2 trades in a row."
          gained={true}
          name="Rookie Trophy"
          srcImg="/img/trophies/2TrophyIcon.webp"
        />
        <Trophy
          description="Obtained because you got 5 trades in a row."
          gained={true}
          name="Rookie Trophy"
          srcImg="/img/trophies/5TrophyIcon.webp"
        />
        <Trophy
          description="Obtained because you got 7 trades in a row."
          gained={true}
          name="Rookie Trophy"
          srcImg="/img/trophies/7TrophyIcon.webp"
        />
        <Trophy
          description="Obtained because you got 10 trades in a row."
          gained={true}
          name="Rookie Trophy"
          srcImg="/img/trophies/10TrophyIcon.webp"
        />
        <Trophy
          description="Obtained because you got 12 trades in a row."
          gained={true}
          name="Rookie Trophy"
          srcImg="/img/trophies/12TrophyIcon.webp"
        />
      </article>
    </main>
  );
};

export default page;
