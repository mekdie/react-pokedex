import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const PokemonInfo = ({ inPokemonPage, data, fetchPokemonInfo, loading }) => {
    //get the pokemonid from params if the user visit the link directly through the URL
    const { pokemonId } = useParams();
    const navigate = useNavigate();

    const [prevPokemon, setPrevPokemon] = useState();
    const [nextPokemon, setNextPokemon] = useState();

    useEffect(() => {
        //check if data undefined (user visit the link directly)
        if (pokemonId >= 1 && pokemonId <= 905) {
            // if (Object.keys(data).length === 0) {
            fetchPokemonInfo(pokemonId);
            // }
            inPokemonPage(true);
            fetchPrev(pokemonId);
            fetchNext(pokemonId);
        }
        //if the user enter random pokemonId, redirect to notfound page
        else {
            navigate("/404");
        }
    }, [pokemonId]);

    //pokemon info if from home page
    async function fetchPrev(pokemonId) {
        var prevId;

        if (+pokemonId === 1) {
            prevId = 905;
        } else {
            prevId = +pokemonId - 1;
        }

        const basicInfoUrl = `https://pokeapi.co/api/v2/pokemon/${prevId}`;
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
    //pokemon info if from home page
    async function fetchNext(pokemonId) {
        var nextId;

        if (+pokemonId === 905) {
            nextId = 1;
        } else {
            nextId = +pokemonId + 1;
        }
        var basicInfoUrl;

        basicInfoUrl = `https://pokeapi.co/api/v2/pokemon/${nextId}`;
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
                        <li>
                            Types:{" "}
                            {data.types.map((type) => (
                                <span key={type} className={`pkm-type ${type}`}>
                                    {type}
                                </span>
                            ))}
                        </li>
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
            {data.evolution_chain && (
                <div className="evolution-panel">
                    <h2>Evolutions:</h2>
                    <ul>
                        <li>
                            <ul>
                                <li>{data.evolution_chain.first.number}</li>
                                <li>{data.evolution_chain.first.name}</li>
                                <LazyLoadImage
                                    src={data.evolution_chain.first.imageUrl}
                                    placeholderSrc={
                                        data.evolution_chain.first.imageUrl
                                    }
                                    width={150}
                                    height={150}
                                    alt={`${data.evolution_chain.first.name} model`}
                                />
                            </ul>
                        </li>
                        {data.evolution_chain.second && (
                            <li>
                                <ul>
                                    <li>
                                        {data.evolution_chain.second.number}
                                    </li>
                                    <li>{data.evolution_chain.second.name}</li>
                                    <LazyLoadImage
                                        src={
                                            data.evolution_chain.second.imageUrl
                                        }
                                        placeholderSrc={
                                            data.evolution_chain.second.imageUrl
                                        }
                                        width={150}
                                        height={150}
                                        alt={`${data.evolution_chain.second.name} model`}
                                    />
                                </ul>
                            </li>
                        )}
                        {data.evolution_chain.final && (
                            <li>
                                <ul>
                                    <li>{data.evolution_chain.final.number}</li>
                                    <li>{data.evolution_chain.final.name}</li>
                                    <LazyLoadImage
                                        src={
                                            data.evolution_chain.final.imageUrl
                                        }
                                        placeholderSrc={
                                            data.evolution_chain.final.imageUrl
                                        }
                                        width={150}
                                        height={150}
                                        alt={`${data.evolution_chain.final.name} model`}
                                    />
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
// test commit from another device
export default PokemonInfo;
