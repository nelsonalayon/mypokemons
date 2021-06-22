import React, { useState, useEffect, useRef, Fragment } from "react";
import Modal from "../modal/Modal";

import "./styles.css";

const PokemonCard = (props) => {
  const element = useRef(null);
  const [show, setShow] = useState(true);

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

  let [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchOnePokemon = async () => {
    const thisPokemon = await fetch(props.id);
    const dataPokemon = await thisPokemon.json();
    setOnePokemon(dataPokemon);
  };

  useEffect(() => {
    fetchOnePokemon();
  }, []);

  // intersection observer para scroll infinito

  useEffect(
    function () {
      const observer = new window.IntersectionObserver(
        function (entries) {
          const { isIntersecting } = entries[0];
          if (isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        },
        { threshold: 0.8 }
      );
      observer.observe(element.current);
    },
    [element]
  );

  const handleOpenModal = () => {
    modalIsOpen === true ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  return (
    <div  ref={element}>
      {show && (
        <Fragment>
          <button onClick={() => handleOpenModal()} className="container">
            <img
              className="photo-pokemon"
              src={onePokemon.sprites.front_default}
              alt={onePokemon.name}
            ></img>
            <div className = "box-name">
               <h2 >{props.name}</h2>
            </div>
           

            <Modal
              isOpen={modalIsOpen}
              handleModal={handleOpenModal}
              id={onePokemon.id}
              img={onePokemon.sprites.front_default}
              name={onePokemon.name}
              type={onePokemon.types[0].type.name}
              ability={onePokemon.abilities[0].ability.name}
            />
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default PokemonCard;
