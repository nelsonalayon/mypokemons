import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";

import "./styles.css";

const PokemonCard = (props) => {
  let [onePokemon, setOnePokemon] = useState({
    sprites: { front_default: "" },
    name: "",
    types: [
      {
        type: {
          name: "",
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: "",
        },
      },
    ],
  });

  let [modalIsOpen, setModalIsOpen] = useState(false)

  const fetchOnePokemon = async () => {
    const thisPokemon = await fetch(props.id);
    const dataPokemon = await thisPokemon.json();
    setOnePokemon(dataPokemon);
  };

  useEffect(() => {
    fetchOnePokemon();
  }, []);

  const handleOpenModal = () => {
    modalIsOpen === true ? setModalIsOpen(false): setModalIsOpen(true)
  }

  return (
    <div className="container">
      <img src={onePokemon.sprites.front_default} alt="pokemon"></img>
      <p>{props.name}</p>
      <button onClick={() => handleOpenModal()}>Detalles del pokemon</button>
      <Modal
        isOpen={modalIsOpen}
        handleModal={handleOpenModal}
        id={onePokemon.id}
        img={onePokemon.sprites.front_default}
        name={onePokemon.name}
        type={onePokemon.types[0].type.name}
        ability={onePokemon.abilities[0].ability.name}
      />
    </div>
  );
};

export default PokemonCard;
