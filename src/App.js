import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import PokemonCard from "./components/pokemonCard/pokemonCard";
import { useMemo } from "react";

// funcion para buscar pokemones 

function useSearchPokemones(pokemones) {
  let [query, setQuery] = useState("");

  let [filterPoke, setFilterPoke] = useState(pokemones);

  useMemo(() => {
    const result = pokemones.filter((poke) => { 
      return poke.name.includes(query.toLowerCase());
    });
    setFilterPoke(result);
  }, [pokemones, query]);
  return { query, setQuery, filterPoke };
}

// aplicacion principal

function App() {
  let [nextPage, setNextPage] = useState(20);

  const downbutton = useRef(null);
  // const [show, setShow] = useState(false);

  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null,
    show: [],
  });

  const { query, setQuery, filterPoke } = useSearchPokemones(state.data);

  useEffect(() => {
    fetchPokemons();
  }, []);

  // useEffect(
  //   function () {      
  //     const observer = new window.IntersectionObserver(
  //         function  (entries) {          
  //         const { isIntersecting } = entries[0];
          
  //         if (isIntersecting) {       
            
  //           showMorePokemons()  
  //           // observer.disconnect();                        
  //         }
  //       },
  //       { threshold: 0.8 }
  //     );
  //     observer.observe(downbutton.current);
  //   },
  //   [downbutton]
  //   );

  const fetchPokemons = async () => {
    setState({
      ...state,
      loading: true,
    });   

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=1120`
      );

      const data = await response.json();
      const show = await data.results.slice(0, nextPage);

      setNextPage(nextPage + 20);

      setState({
        ...state,
        data: data.results,
        loading: false,
        show,
      });
      
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error,
      });
    }
  }; 

 
  

  // funcion para buscar pokemones sin usar memo

  // let filterPomemons = pokemones.filter((poke) => {
  //   return poke.name.includes(query.toLowerCase());
  // });

  // funcion para buscar con use memo

  if (state.error) {
    return `Error: ${state.error.message}`;
  } else if (!query) {
    return (     
      <div className="app">
        <div>
          <label>buscar</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </div>        

        <div className="container-pokemons">
          {state.show.map((card) => {
            return (
              <PokemonCard name={card.name} id={card.url} key={card.url} data = {state.data}  />
            );
          })}
        </div>

        {/* Las dos siguientes líneas preguntan al hook loading si esta true o false para mostrar un cargando o mostrar un boton (si loading esta true aparece un cargando..., si loading esta false aparece un boton de cargar mas) */}

        {/* {!state.loading && ( */}
          <button className="load-more" onClick={() => fetchPokemons()} ref={downbutton}>
            load more
          </button>
          {/* )}  */}
        {state.loading && <h1>cargando</h1>}
      </div>
    );
  }

  return (
    
    <div className="app">
      <div>
        <label>buscar</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>

      <div className="container-pokemons">
        {filterPoke.length === 0 ? <h1>{`no hay pokemones que se llamen ${query}`}</h1> :
        filterPoke.map((card) => {
          return <PokemonCard name={card.name} id={card.url} key={card.url} />;
        }) }
      </div>     

      {state.loading && <h1>cargando</h1>}
    </div>
  );
}

export default App;
