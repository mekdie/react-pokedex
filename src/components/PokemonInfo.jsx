import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PokemonInfo = ({ inPokemonPage, data, fetchPokemonInfo, loading }) => {
    //get the pokemonid from params if the user visit the link directly through the URL
    const { pokemonId } = useParams();

    useEffect(() => {
        //check if data undefined (user visit the link directly)
        if (Object.keys(data).length === 0) {
            fetchPokemonInfo(pokemonId);
        }
        console.log("in pokemon info page, pokemon info page === true");
        inPokemonPage(true);
    }, []);

    return (
        <div>
            {/* set notFound to false because we are going back to non not found page  */}
            <button>
                <Link
                    className="card-link"
                    onClick={() => inPokemonPage(false)}
                    to="/"
                >
                    Go back to home
                </Link>
            </button>
            <br />
            {loading ? (
                <h3>
                    <i>Loading ... </i>
                </h3>
            ) : (
                <>
                    <ul>
                        <LazyLoadImage
                            src={data.imageUrl}
                            placeholderSrc={data.imageUrl}
                            width={150}
                            height={150}
                            alt={`${data.name} model`}
                        />
                        <li>Name: {data.name}</li>
                        <li>ID: {data.id}</li>
                        <li>Number: {data.number}</li>
                        <li>
                            Description: {data.description.replace("\f", " ")}
                        </li>
                        <li>Types: {data.types}</li>
                        <li>Abilities: {data.abilities}</li>
                        {/* <li>{data.abilities}</li> */}
                        <li>Height: {data.height}m</li>
                        <li>Weight: {data.weight}kg</li>
                        <li>HP: {data.hp}</li>
                        <li>ATK: {data.attack}</li>
                        <li>DEF: {data.defense}</li>
                        <li>SpATK: {data.spAttack}</li>
                        <li>SpDEF: {data.spDefense}</li>
                        <li>SPEED: {data.speed}</li>
                    </ul>
                </>
            )}
        </div>
    );
};
// test commit from another device
export default PokemonInfo;
