import { useEffect, useState } from "react";

const useTrophies = () => {
  const [trophies, setTrophies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/trophies.json");
        const data = await res.json();

        setTrophies(data); // Guardar la cantidad total de trofeos
      } catch (error) {
        console.error("Error fetching trophies:", error);
      }
    })();
  }, []);

  return { trophies }; // Devolver la cantidad total de trofeos
};

export default useTrophies;
