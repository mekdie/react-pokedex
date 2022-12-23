import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";

function App() {
    const pokeAPI = "https://pokeapi.co/api/v2";

    const [pokemon, setPokemon] = useState([]);
    const [currentUrl, setCurrentUrl] = useState(`${pokeAPI}/pokemon`);
    const [nextUrl, setNextUrl] = useState(`${pokeAPI}/pokemon`);
    const [prevUrl, setPreviousUrl] = useState(`${pokeAPI}/pokemon`);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(20);

    //rerun the useEffect whenever the currentPageUrl changes
    const fetchPokemons = async () => {};

    //get all the pokemon names
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            let res = await fetch(`${currentUrl}?limit=${limit}`);
            let data = await res.json();

            setNextUrl(data.next);
            setPreviousUrl(data.previous);
            // setPokemon(data.results.map((p) => p.name));

            let pokemonArr = data.results;
            console.log(pokemonArr);

            var pokemonsObject = [];
            // //get the pokemon data
            for (let i = 0; i < pokemonArr.length; i++) {
                let res = await fetch(
                    `${pokeAPI}/pokemon/${pokemonArr[i].name}`
                );
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
        fetchData();
        setLoading(false);

        //currently cant do both limit and currentURl (can only do next and previous)
    }, [currentUrl, limit]);

    function goNextPage() {
        setCurrentUrl(nextUrl);
    }

    function goPreviousPage() {
        setCurrentUrl(prevUrl);
    }
    return (
        <>
            <h1>Pokedex</h1>
            <Search />
            <Pagination
                nextPage={nextUrl ? goNextPage : null}
                prevPage={prevUrl ? goPreviousPage : null}
                limit={limit}
                applyLimit={(e) => setLimit(e.target.value)}
            />
            <PokemonList pokemon={pokemon} loading={loading} />
        </>
    );
}

export default App;
