import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
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

    //capitalize first letter function
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //filtering the result according to name or number or types

    // The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.

    // The some() method tests whether at least one element in the array passes the test implemented by the provided function

    // The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

    // The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.

    // adding all the filters here with && for each filter

    // current filters: region && type && searchQuery
    const result = allPokemons.filter(
        (pokemon) =>
            (eval(regionFilterFn(pokemon, regionFilter)) &&
                pokemon.types.some(
                    (type) => type === typeFilter || typeFilter === "all"
                ) &&
                pokemon.name.includes(searchQuery.toLowerCase())) ||
            pokemon.number.includes(searchQuery) ||
            //search result based on flying
            // eslint-disable-next-line no-mixed-operators
            pokemon.types.some((type) => type.includes(searchQuery))
    );

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
            <div className="container">
                {result.map((pokemon) => {
                    return (
                        <div className="box" key={pokemon.id}>
                            <h4>{capitalizeFirstLetter(pokemon.name)}</h4>
                            <ul>
                                <li>Number: #{pokemon.number}</li>
                                <li>
                                    Types:&nbsp;
                                    <span key={pokemon.types}>
                                        {pokemon.types.toString()}
                                    </span>
                                </li>
                                <li>
                                    <LazyLoadImage
                                        src={pokemon.imageUrl}
                                        placeholderSrc={pokemon.pixelImage}
                                        width={150}
                                        height={150}
                                        alt={`${pokemon.name} model`}
                                    />
                                </li>
                            </ul>
                        </div>
                    );
                })}
                {result.length === 0 && (
                    <h3>
                        <i>Pokemons not found</i>
                    </h3>
                )}
            </div>
        </>
    );
};

export default SearchResults;
