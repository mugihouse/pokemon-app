"use client";

import { useEffect, useState } from "react";

import { getAllPokemon, getPokemon } from "../utils/pokemon";
import { ENDPOINT_URL } from "../page";
import Card from "./Card/Card";

const ClientComp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await getAllPokemon(ENDPOINT_URL);
      // 各ポケモンのデータを取得
      loadPokemon(res.results);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);
  return (
    <>
      {isLoading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ClientComp;
