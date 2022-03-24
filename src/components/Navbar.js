import React, {useContext} from "react"
import FavoriteContext from "../contexts/favoritesContext";

const Navbar = () => {
    const {favoritePokemons} = useContext(FavoriteContext)
    function onToggle(){
        // Get the checkbox
        var checkBox = document.getElementById("myCheck");
        // Get the output text
        var body = document.getElementById("body");
        var contFav = document.getElementById("contFav");

        // If the checkbox is checked, display the output text
        if (checkBox.checked === true){
            body.style.backgroundColor = "rgb(43, 45, 53)"
            contFav.style.color = "white"
            document.getElementById("titleH1").style.color = "white"
            document.getElementById("contPages").style.color = "white"
        } else {
            body.style.backgroundColor = "rgb(215, 218, 230)"
            contFav.style.color = "black"
            document.getElementById("titleH1").style.color = "black"
            document.getElementById("contPages").style.color = "black"
        }
    }
    
    return (
        <nav>
            <div>
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png"
                alt="Pokemon-logo"
                className="nav-img"
                />
            </div>
            <div className="contagem-Fav" id="contFav">{favoritePokemons.length} <img src='https://img.icons8.com/fluency/48/000000/star.png' alt="star" /></div>
            <div className="theme">
                <label class="switch">
                    <input type="checkbox" id="myCheck" onClick={onToggle}/>
                    <span class="slider"></span>
                </label>
            </div>
        </nav>
    );
}

export default Navbar;