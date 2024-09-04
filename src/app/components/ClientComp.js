"use client";

import { useEffect, useState } from "react";

import { getAllPokemon, getPokemon } from "../utils/pokemon";
import { ENDPOINT_URL } from "../page";
import Card from "./Card/Card";

const ClientComp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await getAllPokemon(ENDPOINT_URL);
      // 各ポケモンのデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
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

  // console.log(pokemonData);

  const handlePrevPage = async () => {
    if (!prevURL) return;

    setIsLoading(true);
    const data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setIsLoading(false);
  };
  const handleNextPage = async () => {
    setIsLoading(true);
    const data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setIsLoading(false);
  };
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
      <div className="btn">
        {prevURL ? <button onClick={handlePrevPage}>前へ</button> : <div></div>}

        <button onClick={handleNextPage}>次へ</button>
      </div>
    </>
  );
};

export default ClientComp;
