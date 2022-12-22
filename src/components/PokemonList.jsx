import React from "react";

const PokemonList = ({ pokemon, loading }) => {
    return (
        <>
            {loading ? (
                <h3>
                    <i>Loading ... </i>
                </h3>
            ) : (
                <ul>
                    {pokemon.map((p) => (
                        <li key={p}> {p} </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default PokemonList;
