"use client";

import { useEffect, useState } from "react";

import { getAllPokemon } from "../utils/pokemon";
import { ENDPOINT_URL } from "../page";

const ClientComp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await getAllPokemon(ENDPOINT_URL);
      console.log(res);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <h1>ポケモンデータを取得しました</h1>
      )}
    </>
  );
};

export default ClientComp;
