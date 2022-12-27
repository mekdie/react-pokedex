import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";

//importing 1000 pokemons data
import { pokemonsData } from "./data/pokemons";
import Filters from "./components/Filters";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";

function App() {
    const pokeAPI = "https://pokeapi.co/api/v2";

    // const [pokemonPaginate, setPokemonPaginate] = useState([]);
    // const [currentUrl, setCurrentUrl] = useState(`${pokeAPI}/pokemon`);
    // const [nextUrl, setNextUrl] = useState("");
    // const [prevUrl, setPreviousUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    //no of records to be displayed on each page
    const [limit, setLimit] = useState(20);

    //all pokemon
    const [pokemons, setPokemons] = useState([]);

    //pokemon paginate
    const [pokemonsPaginate, setPokemonsPaginate] = useState([]);

    //all types
    const allTypes = [
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dark",
        "dragon",
        "steel",
        "fairy",
    ];
    const [type, setType] = useState("all");

    //set notFound conditional
    const [notFound, setNotFound] = useState(false);

    //rerun the useEffect whenever the currentPageUrl or limit changes
    // async function paginatePokemons() {
    //     // console.log(currentUrl);
    //     setLoading(true);
    //     let fetchUrl = `${currentUrl}`;
    //     let res = await fetch(fetchUrl);
    //     let data = await res.json();

    //     setNextUrl(data.next);
    //     setPreviousUrl(data.previous);
    //     // setPokemon(data.results.map((p) => p.name));

    //     let pokemonArr = data.results;

    //     var pokemonsObject = [];
    //     // //get the pokemon data
    //     for (let i = 0; i < pokemonArr.length; i++) {
    //         let res = await fetch(`${pokeAPI}/pokemon/${pokemonArr[i].name}`);
    //         let data = await res.json();

    //         let obj = {
    //             name: data.name,
    //             id: data.id,
    //             number: data.id.toString().padStart(3, "0"),
    //             base_experience: data.base_experience,
    //             stats: data.stats,
    //             types: data.types,
    //             imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id
    //                 .toString()
    //                 .padStart(3, "0")}.png`,
    //             pixelImage: data.sprites.front_default,
    //             speciesUrl: data.species.url,
    //             abilities: data.abilities,
    //         };
    //         //push the data into allPokemon
    //         //so id = 0 equals to id = 1 in pokemon
    //         // setPokemon([...pokemon, obj]);
    //         pokemonsObject.push(obj);
    //     }
    //     // let sorted = pokemonsObject.sort((a, b) => a.id - b.id);
    //     setPokemonPaginate(pokemonsObject);
    //     setLoading(false);
    // }

    // https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

    // a function to scale a range of number into another range of number
    function scale(number, inMin, inMax, outMin, outMax) {
        return (
            ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
        );
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
        //     setLoadingProgress(
        //         scale(i, 0, pokemonsArr.length, 0, 100).toFixed(0)
        //     );

        //     let res = await fetch(`${pokeAPI}/pokemon/${pokemonsArr[i].name}`);
        //     let data = await res.json();

        //     let obj = {
        //         name: data.name,
        //         id: data.id,
        //         number: data.id.toString().padStart(3, "0"),
        //         types: data.types.map((types) => {
        //             return types.type.name;
        //         }),
        //         imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id
        //             .toString()
        //             .padStart(3, "0")}.png`,
        //         pixelImage: data.sprites.front_default,
        //     };
        //     // console.log(pokemons);
        //     // setPokemons([...pokemons, obj]);
        //     pokemonsObject.push(obj);
        // }
        // // //get pokemons data from data javascript
        // // console.log(pokemonsObject);
        // setPokemons(pokemonsObject); //fetching API object result
        // setLoading(true);

        //set Loading to false after finish "loading"
        // console.log("sopmthing");
        setPokemons(pokemonsData);

        // setLoading(false);
    }
    //get all the pokemon names for each page
    // useEffect(() => {
    //     setNotFound(false);
    //     paginatePokemons();
    // }, [currentUrl, limit]);

    useEffect(() => {
        var lastRecordIdx = currentPage * limit;
        var firstRecordIdx = lastRecordIdx - limit;
        // const nPages = Math.ceil(905 / limit);

        //check if index doesnt exist here to fix the bug1
        // current solution: back to beginning with 250 limit
        if (lastRecordIdx > 1000) {
            firstRecordIdx = 0;
            lastRecordIdx = +limit; //converting limit to numbers
            setCurrentPage(1);
        }

        const pokemonsPaginate = pokemons.slice(firstRecordIdx, lastRecordIdx);

        // console.log(firstRecordIdx, lastRecordIdx);
        // console.log("repeat this");
        setPokemonsPaginate(pokemonsPaginate);
    }, [currentPage, limit]);

    //run only when the limit changes
    // useEffect(() => {
    //     var lastRecordIdx =
    // }, [limit]);

    //only run on the first render
    useEffect(() => {
        //get all pokemons
        setNotFound(false);
        getAllPokemons();
        //set a fake loading / artificial loading
        var i = 1;
        function artificialLoading() {
            setTimeout(function () {
                if (i < 100) {
                    setLoadingProgress(scale(i, 0, 100, 0, 100).toFixed(0));
                    i++;
                    artificialLoading();
                } else {
                    //100% flick
                    setLoadingProgress(100);
                    setTimeout(() => setLoading(false), 100);
                }
            }, 15);
        }
        artificialLoading();

        //initial paginate 20 records
        setPokemonsPaginate(pokemonsData.slice(0, 20));
    }, []);

    // setTimeout(console.log(pokemons), 10000);
    function goNextPage() {
        setCurrentPage((prev) => prev + 1);
        // setLoading(true);
        // //this to keep the limit when click previous / next after setting up the limit in the previous/next page
        // setCurrentUrl(
        //     `${nextUrl.slice(0, nextUrl.indexOf("&"))}&limit=${limit}`
        // );
    }

    function goPreviousPage() {
        setCurrentPage((prev) => prev - 1);
        // setLoading(true);
        // //this to keep the limit when click previous / next after setting up the limit in the previous/next page
        // setCurrentUrl(
        //     `${prevUrl.slice(0, prevUrl.indexOf("&"))}&limit=${limit}`
        // );
    }

    function updateLimit(limit) {
        setLimit(limit);
        //remove limit query (&limit) before assigning a new limit query (hardcoded)
        // let updatedUrl;
        //the problem was the URL that messedup with the limit

        //only slice in certain conditions

        //conditions:
        // 1. when changing limit for the first time
        // 2. when changing limit for the second time onwards
        // 3. when changing limit after paginate
        // if (currentUrl.includes("?")) {
        //     // condition 3
        //     if (currentUrl.includes("offset")) {
        //         updatedUrl = `${currentUrl.slice(
        //             0,
        //             currentUrl.indexOf("&")
        //         )}&limit=${limit}`;
        //     }
        //     // condition 2
        //     else {
        //         updatedUrl = `${currentUrl.slice(
        //             0,
        //             currentUrl.indexOf("?")
        //         )}?limit=${limit}`;
        //     }
        // }
        // //condition 1
        // else {
        //     updatedUrl = `${currentUrl}?limit=${limit}`;
        // }
        // setCurrentUrl(updatedUrl);
    }
    function onTypeSelect(selected) {
        setType(selected);
    }
    return (
        <>
            {loading && <Preloader loadingProgress={loadingProgress} />}
            {!loading && (
                <BrowserRouter>
                    <h1>Pokedex</h1>

                    {/* Only show this part when NOT in not found page, going to optimize these further */}
                    {!notFound && <SearchBar />}
                    {!notFound && (
                        <Filters types={allTypes} selectedType={onTypeSelect} />
                    )}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Pagination
                                        limit={limit}
                                        nextPage={goNextPage}
                                        prevPage={goPreviousPage}
                                        currentPage={currentPage}
                                        applyLimit={(e) =>
                                            updateLimit(e.target.value)
                                        }
                                        isLoading={loading}
                                    />
                                    <PokemonList
                                        pokemons={pokemonsPaginate}
                                        loading={loading}
                                    />
                                </>
                            }
                        ></Route>
                        <Route
                            path="/search"
                            element={
                                <SearchResults
                                    pokemons={pokemons}
                                    typeFilter={type}
                                />
                            }
                        ></Route>
                        <Route
                            path="*"
                            element={
                                <NotFound
                                    back={() => setNotFound(false)}
                                    notFound={(child) => setNotFound(child)}
                                />
                            }
                        ></Route>
                    </Routes>
                    <ScrollToTop />
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
