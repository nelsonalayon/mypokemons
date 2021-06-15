import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./components/pokemonCard/pokemonCard";

function App() {
  let [pokemon, setPokemon] = useState({ results: [] });

  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [nextPage, setNextPage] = useState(1);

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${nextPage}`
      );
      const data = await response.json();
      setPokemon(data);
      setLoading(false);
      setNextPage(nextPage + 20);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <div className="App">
      <div className="container-pokemons">
        {pokemon.results.map((card) => {
          return <PokemonCard name={card.name} id={card.url} />;
        })}
      </div>

      {!loading && <button onClick={() => fetchPokemons()}>load more</button>}
      {loading && <h1>cargando</h1>}
    </div>
  );
}

export default App;
