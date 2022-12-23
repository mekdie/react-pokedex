import React from "react";
// import axios from "axios";
const PokemonList = ({ pokemon, loading }) => {
    return (
        <>
            {loading ? (
                <h3>
                    <i>Loading ... </i>
                </h3>
            ) : (
                <ul>
                    {pokemon.map((p) => {
                        // console.log(p.name);
                        return (
                            // <p key={p.id}>{p.name}</p>
                            <div key={p.id}>
                                <li> {p.name.toUpperCase()} </li>
                                <ul>
                                    <li>Number: #{p.number}</li>
                                    <li>
                                        Types:{" "}
                                        {p.types.map(({ type }) => (
                                            <span key={type.url}>
                                                {type.name}{" "}
                                            </span>
                                        ))}
                                    </li>
                                    <li>
                                        <img
                                            src={p.imageUrl}
                                            alt={`${p.name} model`}
                                        />
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default PokemonList;
