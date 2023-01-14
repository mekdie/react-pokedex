import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const PokemonInfo = ({ inPokemonPage, data, fetchPokemonInfo, loading }) => {
    //get the pokemonid from params if the user visit the link directly through the URL
    const { pokemonId } = useParams();

    const [prevPokemon, setPrevPokemon] = useState();
    const [nextPokemon, setNextPokemon] = useState();

    useEffect(() => {
        //check if data undefined (user visit the link directly)
        // if (Object.keys(data).length === 0) {
        fetchPokemonInfo(pokemonId);
        // }
        inPokemonPage(true);
        fetchPrev(pokemonId);
        fetchNext(pokemonId);
    }, [pokemonId]);

    //pokemon info if from home page
    async function fetchPrev(pokemonId) {
        if (+pokemonId === 1) {
            setPrevPokemon(false);
        } else {
            var basicInfoUrl;

            basicInfoUrl = `https://pokeapi.co/api/v2/pokemon/${
                +pokemonId - 1
            }`;
            const data = await fetch(basicInfoUrl);

            const basicInfo = await data.json();

            //add required data here
            let pokemonData = {
                name: basicInfo.name,
                id: basicInfo.id,
                number: basicInfo.id.toString().padStart(3, "0"),
            };
            setPrevPokemon((prev) => ({ ...prev, ...pokemonData })); //updating the object values
        }
    }
    //pokemon info if from home page
    async function fetchNext(pokemonId) {
        if (+pokemonId === 905) {
            setNextPokemon(false);
        } else {
            var basicInfoUrl;

            basicInfoUrl = `https://pokeapi.co/api/v2/pokemon/${
                +pokemonId + 1
            }`;
            const data = await fetch(basicInfoUrl);

            const basicInfo = await data.json();

            //add required data here
            let pokemonData = {
                name: basicInfo.name,
                id: basicInfo.id,
                number: basicInfo.id.toString().padStart(3, "0"),
            };
            setNextPokemon((prev) => ({ ...prev, ...pokemonData })); //updating the object values
        }
    }

    return (
        <div>
            {/* set notFound to false because we are going back to non not found page  */}
            {prevPokemon && (
                <button>
                    <Link
                        className="card-link"
                        to={`/pokemon/${prevPokemon.id}`}
                    >
                        #{prevPokemon.number}{" "}
                        {capitalizeFirstLetter(prevPokemon.name)}
                    </Link>
                </button>
            )}
            {nextPokemon && (
                <button>
                    <Link
                        className="card-link"
                        to={`/pokemon/${nextPokemon.id}`}
                    >
                        #{nextPokemon.number}{" "}
                        {capitalizeFirstLetter(nextPokemon.name)}
                    </Link>
                </button>
            )}
            <br />
            <br />
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
