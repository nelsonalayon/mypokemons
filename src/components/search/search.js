import './styles.css'

const Search = (props) => {
    return (
        <div className = "field-search">          
        <input
          type="text"
        //   value="{query}"
        //   onChange="{(e) => setQuery(e.target.value)}"
          placeholder= "busca tu pokemon"
        ></input>
        {props.children}
      </div>        
    )
}

export default Search