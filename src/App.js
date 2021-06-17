import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonCard from "./components/pokemonCard/pokemonCard";

function App() {
  // en el hook pockemon guardamos los datos recibidos de la llamada a la api
  // el objeto con results que va como parametro predeterminado se pone para que no falle la aplicacion. Results va a usarse mas adelante

  // let [pokemon, setPokemon] = useState({ results: [] });

  // let [showPokemon, letShowPokemon] = useState({ results: [] });

  // estado que indica si la aplicación está cargando algún dato. Pasa a false cuando los datos han sido correctamente cargados en la llamada asíncrona.

  // let [loading, setLoading] = useState(true);

  // estado que indica si falló la carga de los datos. Pasa a error cuando la llamada asincrona falla (en el catch)

  // let [error, setError] = useState(null);

  // estado que le indica a la llamada a la api que queremos cargar otros 20 pokemones. El parámetro limit indica cuantos pokemones queremos ver en la pagina, cada vez que apretamos el boton cargar mas, este estado se suma 20, para que muestre otros 20 pokemones

  let [nextPage, setNextPage] = useState(20);

  let [query, setQuery] = useState("");

  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  // función asíncrona que llama un endpoint de la api de pokemones. Maneja los estados de load, error y datos

  // const showOnlyFewPokemons = (page) => {
  //   const pokemonArray = pokemon.results.slice(0, page);
  //   letShowPokemon(pokemonArray);
  // };

  // useEffect es un hook que equivale a componentDidMount. Sirve para que se ejecute la función una vez haya cargado el componente. El segundo parametro de useEffect es un array vacio que sirve para que no se cargue muchas veces el fetchPokemons


  useEffect(() => {
    fetchPokemons();
    
    // showOnlyFewPokemons(nextPage);
  }, []);

  const fetchPokemons = async () => {
    setState({
      ...state,
      loading: true,
    });
    // setLoading(true);
    // setError(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${nextPage}`
      );
      const data = await response.json();

      setState({
        ...state,
        data: data.results,
        loading: false,
      });

      // setPokemon(data);
      // setLoading(false);
      setNextPage(nextPage + 20);
    } catch (error) {

      setState({
        ...state, loading:false, error: error
      })
      // setLoading(false);
      // setError(error);
    }
  };

  // si hay error retorna el mensaje del error que queda guardado en el hook error

  // if (error) {
  //   return `Error: ${error.message}`;
  // }

  // return retorna la aplicación web como tal donde se muestran los datos recibidos y mostrados mediante una función map de los arrays en javascript

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
        {state.data.map((card) => {
          return <PokemonCard name={card.name} id={card.url} key={card.url} />;
        })}
      </div>

      {/* Las dos siguientes líneas preguntan al hook loading si esta true o false para mostrar un cargando o mostrar un boton (si loading esta true aparece un cargando..., si loading esta false aparece un boton de cargar mas) */}

      {!state.loading && (
        <button className="load-more" onClick={() => fetchPokemons()}>
          load more
        </button>
      )}
      {state.loading && <h1>cargando</h1>}
    </div>
  );
}

export default App;
