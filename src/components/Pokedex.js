import React from "react";
import Pokemon from "./Pokemon";
import	Pagination from "./Pagination"
import { Grid } from "@mui/material";

const Pokedex = (props) =>{

    const {pokemons, loading, page, setPage, totalPages} = props;
    const onLeftClickHanler = () => {
        if(page > 0){
            setPage(page - 1)
        }
    }
    const onRightClickHanler = () => {
        if(page+1 !== totalPages){
            setPage(page + 1)
        }
    }
    return(
        <div id="pokedexID">
            <div className="pokedex-header">
            <h1 id="titleH1">Pokedex</h1>
            <Pagination 
                page={page+1}
                totalPages={totalPages}
                onLeftClick={onLeftClickHanler}
                onRightClick={onRightClickHanler}
            />
            </div>
            {loading ? (
            <div>Carregando, segura fera...</div>
            ) : (
            <Grid container>
                {pokemons && pokemons.map((pokemon, index) => {
                    return (
                        <Pokemon key={index} pokemon={pokemon} />
                    )
                })}
            </Grid>
            )
            }
        </div>
    )
}
export default Pokedex;