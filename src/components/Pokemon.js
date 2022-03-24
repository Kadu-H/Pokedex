import React, {useContext} from "react";
import ReactDOM from 'react-dom'
import FavoriteContext from "../contexts/favoritesContext";



const Pokemon = (props) =>{
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)
    const {pokemon} = props
    const pokemonType = pokemon.types[0].type.name;
    const onFavoriteClick = () =>{
        updateFavoritePokemons(pokemon.name)
    }
    const favorite = favoritePokemons.includes(pokemon.name) ? "🌟" : "⭐"
    var linkImg;
    if (favorite === "🌟"){
        linkImg = "https://img.icons8.com/fluency/48/000000/star.png";
    }   
    if(favorite === "⭐"){
        linkImg = "https://img.icons8.com/ios/50/ffffff/star--v1.png";
    }
    console.log(pokemon)
    var idPokecard = ("pokemon-card "+pokemon.name)
    return(
        <div className="controlPokeCard" id="pokemonss">
        <div className={idPokecard} id={pokemonType} >
            
            <div className="pokemon-image-container">
                <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="card-body">
                <div className="card-top">
                    <h3>{pokemon.name}</h3>
                    <div>#{pokemon.id}</div>
                </div>
                <div className="card-bottom">
                    <div className="pokemon-type">
                        {pokemon.types.map((type, index) => {
                            return(
                                
                                <div key={index} id={type.type.name} className="pokemon-type-text">{type.type.name}</div>
                            )
                        })}
                    </div>
                    <button className="pokemon-favorite-btn" onClick={onFavoriteClick}>
                    <img src={linkImg}/>
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Pokemon