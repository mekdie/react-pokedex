import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";

function App() {
    const pokeAPI = "https://pokeapi.co/api/v2";

    const [pokemon, setPokemon] = useState([]);
    const [currentUrl, setCurrentUrl] = useState(`${pokeAPI}/pokemon`);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPreviousUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(20);

    //rerun the useEffect whenever the currentPageUrl or limit changes
    async function fetchPokemons() {
        // console.log(currentUrl);
        let fetchUrl = `${currentUrl}`;
        let res = await fetch(fetchUrl);
        let data = await res.json();

        setNextUrl(data.next);
        setPreviousUrl(data.previous);
        // setPokemon(data.results.map((p) => p.name));

        let pokemonArr = data.results;

        var pokemonsObject = [];
        // //get the pokemon data
        for (let i = 0; i < pokemonArr.length; i++) {
            let res = await fetch(`${pokeAPI}/pokemon/${pokemonArr[i].name}`);
            let data = await res.json();

            let obj = {
                name: data.name,
                id: data.id,
                number: data.id.toString().padStart(3, "0"),
                base_experience: data.base_experience,
                stats: data.stats,
                types: data.types,
                imageUrl: data.sprites.front_default,
                speciesUrl: data.species.url,
                abilities: data.abilities,
            };
            //push the data into allPokemon
            //so id = 0 equals to id = 1 in pokemon
            // setPokemon([...pokemon, obj]);
            pokemonsObject.push(obj);
        }
        // let sorted = pokemonsObject.sort((a, b) => a.id - b.id);
        setPokemon(pokemonsObject);
    }
    //get all the pokemon names
    useEffect(() => {
        fetchPokemons();
        setLoading(false);
    }, [currentUrl, limit]);

    function goNextPage() {
        //this to keep the limit when click previous / next after setting up the limit in the previous/next page
        setCurrentUrl(
            `${nextUrl.slice(0, nextUrl.indexOf("&"))}&limit=${limit}`
        );
    }

    function goPreviousPage() {
        //this to keep the limit when click previous / next after setting up the limit in the previous/next page
        setCurrentUrl(
            `${prevUrl.slice(0, prevUrl.indexOf("&"))}&limit=${limit}`
        );
    }

    function updateLimit(limit) {
        setLimit(limit);
        //remove limit query (&limit) before assigning a new limit query (hardcoded)
        let updatedUrl;
        //the problem was the URL that messedup with the limit

        //only slice in certain conditions

        //conditions:
        // 1. when changing limit for the first time
        // 2. when changing limit for the second time onwards
        // 3. when changing limit after paginate
        if (currentUrl.includes("?")) {
            // condition 3
            if (currentUrl.includes("offset")) {
                updatedUrl = `${currentUrl.slice(
                    0,
                    currentUrl.indexOf("&")
                )}&limit=${limit}`;
            }
            // condition 2
            else {
                updatedUrl = `${currentUrl.slice(
                    0,
                    currentUrl.indexOf("?")
                )}?limit=${limit}`;
            }
        }
        //condition 1
        else {
            updatedUrl = `${currentUrl}?limit=${limit}`;
        }
        setCurrentUrl(updatedUrl);
    }
    return (
        <>
            <h1>Pokedex</h1>
            <Search />
            <Pagination
                nextPage={nextUrl ? goNextPage : null}
                prevPage={prevUrl ? goPreviousPage : null}
                limit={limit}
                applyLimit={(e) => updateLimit(e.target.value)}
            />
            <PokemonList pokemon={pokemon} loading={loading} />
        </>
    );
}

export default App;
