import React,{useEffect, useState} from 'react';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Seachbar from './components/Searchbar';
import { FavoriteProvider } from './contexts/favoritesContext';
import ReactDOM from 'react-dom'


const favoritesKey = "f"
function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([])
  const itensPerPage = 24
  

  const fetchPokemons = async () =>{
    try{
      setLoading(true)
      const data = await getPokemons(itensPerPage, itensPerPage*page)
      const promises = data.results.map(async (pokemon) =>{
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises);
      setPokemons(results)
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error){
      console.log("fetchPokemonsError: ", error)  
    }
  }

  const loadFavoritePokemons = () =>{
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect( () => {

    loadFavoritePokemons();
  }, [page]
  );


  useEffect( () => {

    console.log("carregou")
    fetchPokemons();
  }, [page]
  );

  const updateFavoritePokemons = (name) =>{
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0){
      updatedFavorites.splice(favoriteIndex, 1)
    }
    else{
      updatedFavorites.push(name)
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites)
  }

  const onSearchHandle = async (pokemon) =>{
    if(!pokemon){
      return fetchPokemons()
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result){
      setNotFound(true)
    } else{
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  return (
    <div id='body'>
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons}}
    >
    <div>
      <Navbar/>
      <Seachbar onSearch={onSearchHandle} />
      {notFound ? (
        <div className='not-found-text'>Nenhum Pokemon com esse nome na area!</div>
      ) :
      <Pokedex 
      pokemons={pokemons} 
      loading={loading} 
      page={page} 
      totalPages={totalPages} 
      setPage={setPage}
      />}
    </div>
    </FavoriteProvider>
    </div>
  );
}

export default App;
