import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { capitalizeFirstLetter as capitalize } from "../Helpers";
const SearchResults = ({
    pokemons,
    typeFilter,
    sortFilter,
    sortFilterFn,
    regionFilter,
    regionFilterFn,
}) => {
    // Get the q param from the URL
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");

    const navigate = useNavigate();

    //if the query is empty or only search param without q then go back to home
    useEffect(() => {
        if (!searchParams.get("q")) {
            navigate("/");
        }
    }, []);

    //generate all pokemons here

    // ===== PROTOTYPES HARDCODED FOR TESTING ==== //

    const allPokemons = pokemons;

    // var insensitiveRegex = new RegExp(allPokemons.join("|"), "i");
    // const regex = insensitiveRegex.test(searchQuery);
    // console.log(regex);

    //filtering the result according to name or number or types

    // The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.

    // The some() method tests whether at least one element in the array passes the test implemented by the provided function

    // The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

    // The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.

    // adding all the filters here with && for each filter

    // current filters: region && type && searchQuery

    //the bug is caused by overlapping conditions inside search bar

    var result = allPokemons.filter((pokemon) => {
        return (
            (eval(regionFilterFn(pokemon, regionFilter)) &&
                pokemon.types.some(
                    (type) => type === typeFilter || typeFilter === "all"
                ) &&
                pokemon.name.includes(searchQuery.toLowerCase())) ||
            pokemon.number.includes(searchQuery) ||
            pokemon.types.some((type) => type.includes(searchQuery))
        );
    });

    //filter priority

    // 1. search bar can search for anything if the filter is not selected (all default)
    // 2. if any filter is selected then ignore the search bar result (or specifically the type search result)

    if (typeFilter !== "all" || regionFilter !== 0) {
        result = allPokemons.filter(
            (pokemon) =>
                (eval(regionFilterFn(pokemon, regionFilter)) &&
                    pokemon.types.some(
                        (type) => type === typeFilter || typeFilter === "all"
                    ) &&
                    pokemon.name.includes(searchQuery.toLowerCase())) ||
                pokemon.number.includes(searchQuery)
        );
    }

    //sorting the results
    result.sort((a, b) => sortFilterFn(sortFilter, a, b));

    // console.log(result);
    // console.log(typeFilter);

    //generating types for each pokemon
    //each pokemon types are in an array

    //this has been moved while fetching all pokemons data to app.js / parent
    // allPokemons.map((pokemon) => {
    //     let pokemonTypes = pokemon.types;
    //     pokemonTypes.map((types) => {
    //         console.log(types.type.name);
    //     });
    // });

    return (
        <>
            <div>
                {searchQuery && (
                    <h3>
                        <strong>{result.length}</strong> results found for "
                        {searchQuery}..." with applied filters
                    </h3>
                )}
            </div>
            {/* The reason this is being put back again is because if it using a reusable component from PokemonList, simply the Link doesnt work idk why  */}
            <div className="pokemon-container">
                {result.map((p) => {
                    return (
                        // <p key={p.id}>{p.name}</p>
                        <div className="box" key={p.id}>
                            <Link className="card-link" to={`/pokemon/${p.id}`}>
                                <h4> {capitalize(p.name)} </h4>
                                <ul>
                                    <li>Number: #{p.number}</li>
                                    <li className="type-list">
                                        {p.types.map((type) => (
                                            <span
                                                key={type}
                                                className={`pkm-type ${type}`}
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </li>
                                    <LazyLoadImage
                                        src={p.imageUrl}
                                        placeholderSrc={p.pixelImage}
                                        width={150}
                                        height={150}
                                        alt={`${p.name} model`}
                                    />
                                </ul>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default SearchResults;
