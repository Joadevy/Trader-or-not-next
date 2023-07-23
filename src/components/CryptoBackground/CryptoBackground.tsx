"use client";
import React, { useState, useEffect } from "react";

type BackgroundImage = {
  path: string;
  left: string;
  top: string;
};

const CryptoBackgrounds = () => {
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>(
    [],
  );

  useEffect(() => {
    // Función para obtener un valor aleatorio entre min (incluido) y max (excluido)
    const getRandomValue = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Rutas de las imágenes (ajusta las rutas según tus necesidades)
    const imagePaths = [
      "img/BTC.svg",
      "img/BTC.svg",
      "img/BTC.svg",
      "img/BTC.svg",
      "img/ADA.svg",
      "img/BAT.svg",
      "img/BNB.svg",
      "img/DOGE.svg",
      "img/ETH.svg",
      "img/LTC.svg",
      "img/EOS.svg",
      "img/USDT.svg",
      "img/XRP.svg",
      "img/XMR.svg",
      "img/BTC.svg",
      "img/BTC.svg",
      "img/BTC.svg",
      "img/BTC.svg",
      "img/ADA.svg",
      "img/BAT.svg",
      "img/BNB.svg",
      "img/DOGE.svg",
      "img/ETH.svg",
      "img/LTC.svg",
      "img/EOS.svg",
      "img/USDT.svg",
      "img/XRP.svg",
      "img/XMR.svg",
      // Agrega más rutas aquí
    ];

    // Crear un arreglo con objetos que contengan la ruta y posición aleatoria de cada imagen
    const imagesWithPositions = imagePaths.map((path) => {
      return {
        path: path,
        left: `${getRandomValue(0, 100)}%`,
        top: `${getRandomValue(0, 100)}%`,
      };
    });

    // Actualizar el estado con las imágenes y posiciones aleatorias
    setBackgroundImages(imagesWithPositions);
  }, []);

  return (
    <>
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="h-10 w-10 absolute bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage: `url(${image.path})`,
            left: image.left,
            top: image.top,
            zIndex: -1,
            filter: "grayscale(100%)",
          }}
        />
      ))}
      {/* Contenido del diseño aquí */}
    </>
  );
};

export default CryptoBackgrounds;
