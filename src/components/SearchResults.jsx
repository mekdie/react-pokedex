import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchResults = ({ pokemons }) => {
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

    //search with filter
    //https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

    // ===== PROTOTYPES HARDCODED FOR TESTING ==== //

    const allPokemons = pokemons;

    // var insensitiveRegex = new RegExp(allPokemons.join("|"), "i");
    // const regex = insensitiveRegex.test(searchQuery);
    // console.log(regex);

    //capitalize first letter function
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //filtering the result according to name or number

    const result = allPokemons.filter(
        (pokemon) =>
            pokemon.name.includes(searchQuery.toLowerCase()) ||
            pokemon.number.includes(searchQuery)
    );

    return (
        <>
            <div>
                {searchQuery && <p>Search results for "{searchQuery}..."</p>}
            </div>
            <div>
                <h1>Pokemon search results here</h1>
                <h3>
                    {result.map((pokemon) => {
                        return (
                            <div key={pokemon.id}>
                                <p>{capitalizeFirstLetter(pokemon.name)}</p>
                                <ul>
                                    <li>Number: #{pokemon.number}</li>
                                    <li>
                                        Types:{" "}
                                        {pokemon.types.map(({ type }) => (
                                            <span key={type.url}>
                                                {type.name}{" "}
                                            </span>
                                        ))}
                                    </li>
                                    <li>
                                        <img
                                            src={pokemon.imageUrl}
                                            alt={`${pokemon.name} model`}
                                            width={150}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `${pokemon.pixelImage}`;
                                            }}
                                        />
                                        <img
                                            src={pokemon.pixelImage}
                                            alt={`${pokemon.name} model`}
                                            width={150}
                                        />
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </h3>
            </div>
        </>
    );
};

export default SearchResults;
