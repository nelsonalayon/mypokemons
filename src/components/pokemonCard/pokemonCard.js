import React, { useState, useEffect } from "react";

import './styles.css'

const PokemonCard = (props) => {
  let [onePokemon, setOnePokemon] = useState({sprites: { front_default: "" }}) 

  const fetchOnePokemon = async () => {
    const thisPokemon = await fetch(props.id)
    const dataPokemon = await thisPokemon.json()
    setOnePokemon(dataPokemon)
  }

  useEffect(
    () => {
      fetchOnePokemon()
    }, []
  )

  return (
    <div className ="container" id={props.id} >
      <img src={onePokemon.sprites.front_default} alt="pokemon"></img>
      <p>{props.name}</p>
    </div>
  );
};

export default PokemonCard;
