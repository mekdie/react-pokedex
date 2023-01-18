import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

//react loading
import ReactLoading from "react-loading";

//capitalize
import { capitalizeFirstLetter as capitalize } from "../Helpers";
import EvolutionChain from "./EvolutionChain";

const PokemonInfo = ({ inPokemonPage, data, fetchPokemonInfo, loading }) => {
    //get the pokemonid from params if the user visit the link directly through the URL
    const { pokemonId } = useParams();
    const navigate = useNavigate();

    const [prevPokemon, setPrevPokemon] = useState();
    const [nextPokemon, setNextPokemon] = useState();

    // useEffect(() => {
    //     console.log(data.evolution_chain);
    //     setEvolutionChain(data.evolution_chain);
    // }, [data.evolution_chain]);

    // setEvolutionChain(data.evolution_chain);
    useEffect(() => {
        //check if data undefined (user visit the link directly)
        if (pokemonId >= 1 && pokemonId <= 905) {
            // console.log("fetching back");
            //fetching pokemonInfo based on the param pokemonId
            fetchPokemonInfo(pokemonId);

            inPokemonPage(true);
            fetchPrev(pokemonId);
            fetchNext(pokemonId);
        }
        //if the user enter random pokemonId, redirect to notfound page
        else {
            navigate("/404");
        }
    }, [pokemonId]);

    // useEffect(() => {
    // console.log(data.evolution_chain);
    // setEvolutionChain(data.evolution_chain);
    // if this is on = blinking without delay
    // if this is off = with delay and first time render will not shown
    // }, [pokemonId, data]); // add pokemonId to show first render

    //pokemon info if from home page
    async function fetchPrev(pokemonId) {
        var prevId;

        if (+pokemonId === 1) {
            prevId = 905;
        } else {
            prevId = +pokemonId - 1;
        }

        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${prevId}`;
        const data = await fetch(speciesUrl);

        const basicInfo = await data.json();

        //add required data here
        let pokemonData = {
            name: capitalize(basicInfo.name),
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

        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${nextId}`;
        const data = await fetch(speciesUrl);

        const basicInfo = await data.json();

        //add required data here
        let pokemonData = {
            name: capitalize(basicInfo.name),
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
                        #{prevPokemon.number} {prevPokemon.name}
                    </Link>
                </button>
            )}
            {nextPokemon && (
                <button>
                    <Link
                        className="card-link"
                        to={`/pokemon/${nextPokemon.id}`}
                    >
                        #{nextPokemon.number} {nextPokemon.name}
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
                <div style={{ marginTop: "25%" }}>
                    <ReactLoading
                        style={{
                            margin: "auto",
                            display: "block",
                            height: "5rem",
                            width: "5rem",
                        }}
                        type="spin"
                        color="black"
                    />
                </div>
            ) : (
                <>
                    <ul>
                        <LazyLoadImage
                            src={data.imageUrl}
                            placeholderSrc={data.pixelImage}
                            width={150}
                            height={150}
                            alt={`${data.name} model`}
                        />
                        <li>Name: {capitalize(data.name)}</li>
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
                    <EvolutionChain data={data} />
                </>
            )}
        </div>
    );
};
// test commit from another device
export default PokemonInfo;
