import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import NotFound from "./NotFound";

//importing 1000 pokemons data
import pokemonsData from "./data/pokemons";
import Filters from "./components/Filters";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    const pokeAPI = "https://pokeapi.co/api/v2";

    const [pokemonPaginate, setPokemonPaginate] = useState([]);
    const [currentUrl, setCurrentUrl] = useState(`${pokeAPI}/pokemon`);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPreviousUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(20);

    //all pokemon
    const [pokemons, setPokemons] = useState([]);

    //set notFound conditional
    const [notFound, setNotFound] = useState(false);

    //rerun the useEffect whenever the currentPageUrl or limit changes
    async function paginatePokemons() {
        // console.log(currentUrl);
        setLoading(true);
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
                imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id
                    .toString()
                    .padStart(3, "0")}.png`,
                pixelImage: data.sprites.front_default,
                speciesUrl: data.species.url,
                abilities: data.abilities,
            };
            //push the data into allPokemon
            //so id = 0 equals to id = 1 in pokemon
            // setPokemon([...pokemon, obj]);
            pokemonsObject.push(obj);
        }
        // let sorted = pokemonsObject.sort((a, b) => a.id - b.id);
        setPokemonPaginate(pokemonsObject);
        setLoading(false);
    }

    //get 1000++ of pokemons data
    function getAllPokemons() {
        //uncomment to generate the API and objects

        // setLoading(true);
        // let fetchUrl = `${pokeAPI}/pokemon?limit=905&offset=0`;
        // let res = await fetch(fetchUrl);
        // let data = await res.json();

        // let pokemonsArr = data.results;
        // // //get the pokemon data
        // var pokemonsObject = [];
        // for (let i = 0; i < pokemonsArr.length; i++) {
        //     let res = await fetch(`${pokeAPI}/pokemon/${pokemonsArr[i].name}`);
        //     let data = await res.json();

        //     let obj = {
        //         name: data.name,
        //         id: data.id,
        //         number: data.id.toString().padStart(3, "0"),
        //         types: data.types,
        //         imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id
        //             .toString()
        //             .padStart(3, "0")}.png`,
        //         pixelImage: data.sprites.front_default,
        //     };
        //     // console.log(pokemons);
        //     // setPokemons([...pokemons, obj]);
        //     pokemonsObject.push(obj);
        // }

        // //get pokemons data from data javascript
        // console.log(pokemonsObject);
        // setPokemons(pokemonsObject); //fetching API object result
        setPokemons(pokemonsData);
    }
    //get all the pokemon names for each page
    useEffect(() => {
        setNotFound(false);
        paginatePokemons();
    }, [currentUrl, limit]);

    useEffect(() => {
        //get all pokemons
        getAllPokemons();
    }, []);

    // setTimeout(console.log(pokemons), 10000);
    function goNextPage() {
        setLoading(true);
        //this to keep the limit when click previous / next after setting up the limit in the previous/next page
        setCurrentUrl(
            `${nextUrl.slice(0, nextUrl.indexOf("&"))}&limit=${limit}`
        );
    }

    function goPreviousPage() {
        setLoading(true);
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
            <BrowserRouter>
                <h1>Pokedex</h1>
                {/* only show search bar if it is not on not found page  */}
                {!notFound && <SearchBar />}
                <Filters />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Pagination
                                    nextPage={nextUrl ? goNextPage : null}
                                    prevPage={prevUrl ? goPreviousPage : null}
                                    limit={limit}
                                    applyLimit={(e) =>
                                        updateLimit(e.target.value)
                                    }
                                    isLoading={loading}
                                />
                                <PokemonList
                                    paginate={pokemonPaginate}
                                    loading={loading}
                                />
                            </>
                        }
                    ></Route>
                    <Route
                        path="/search"
                        element={<SearchResults pokemons={pokemons} />}
                    ></Route>
                    <Route
                        path="*"
                        element={
                            <NotFound
                                notFound={(child) => setNotFound(child)}
                            />
                        }
                    ></Route>
                </Routes>
                <ScrollToTop />
            </BrowserRouter>
        </>
    );
}

export default App;
