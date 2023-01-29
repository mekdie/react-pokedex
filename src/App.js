import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";

//importing 1000 pokemons data
import { pokemonsData } from "./data/pokemons";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Home from "./components/Home";
import PokemonInfo from "./components/PokemonInfo";

//importing pages
import About from "./components/pages/About";

import { scale } from "./Helpers";

function App() {
    //dark mode toggle
    const [theme, setTheme] = useState("light-theme");
    const toggleTheme = () => {
        if (theme === "light-theme") {
            setTheme("dark-theme");
        } else {
            setTheme("light-theme");
        }
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

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
    const [totalPokemons, setTotalPokemons] = useState(0);

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

    //filter states
    const [selectedType, setSelectedType] = useState("all");
    const [selectedSort, setSelectedSort] = useState("default");
    const [selectedRegion, setSelectedRegion] = useState({
        value: 0,
        text: "All Regions",
    });
    const [filterReset, setFilterReset] = useState(false);
    const [resetAll, setResetAll] = useState(false);

    //set notFound conditionalFcons
    const [notFound, setNotFound] = useState(false);

    //pokemonInfo state
    const [pokemonInfoPage, setPokemonInfoPage] = useState(false);
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [pokemonLoading, setPokemonLoading] = useState(true);

    //pages state
    const [aboutPage, setAboutPage] = useState(false);
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

    //sort filter function on global
    const sortFilterFn = (localSort, a, b) => {
        if (localSort !== "letterAsc" && localSort !== "letterDsc") {
            //default, numDesc filter number
            if (localSort === "default") {
                return a.number - b.number;
            } else {
                return b.number - a.number;
            }
        } else {
            const nameA = a.name.toUpperCase(); //ignore upper and lowercase
            const nameB = b.name.toUpperCase();
            //letterAsc, letterDsc filter name
            if (nameA < nameB) {
                //the default is ascending or normal behaviour
                if (localSort === "letterAsc") {
                    return -1;
                } else {
                    return 1;
                }
            }
            if (nameA > nameB) {
                //the default is ascending or normal behaviour
                if (selectedSort === "letterAsc") {
                    return 1;
                } else {
                    return -1;
                }
            }
            //name must be equal
            return 0;
        }
    };

    const regionFilterFn = (pokemon, selectedRegion) => {
        switch (selectedRegion) {
            case 1:
                return `${pokemon.id} >= 1 && ${pokemon.id} <= 151`;
            case 2:
                return `${pokemon.id} >= 152 && ${pokemon.id} <= 251`;
            case 3:
                return `${pokemon.id} >= 252 && ${pokemon.id} <= 386`;
            case 4:
                return `${pokemon.id} >= 387 && ${pokemon.id} <= 493`;
            case 5:
                return `${pokemon.id} >= 494 && ${pokemon.id} <= 649`;
            case 6:
                return `${pokemon.id} >= 650 && ${pokemon.id} <= 721`;
            case 7:
                return `${pokemon.id} >= 722 && ${pokemon.id} <= 809`;
            case 8:
                return `${pokemon.id} >= 810 && ${pokemon.id} <= 905`;
            default:
                return `${pokemon.id}`;
        }
    };

    //get 1000++ of pokemons data
    async function getAllPokemons() {
        //uncomment to generate the API and objects

        // setLoading(true);
        // let fetchUrl = `https://pokeapi.co/api/v2/pokemon?limit=905&offset=0`;
        // let res = await fetch(fetchUrl);
        // let data = await res.json();

        // let pokemonsArr = data.results;
        // // //get the pokemon data
        // var pokemonsObject = [];
        // for (let i = 0; i < pokemonsArr.length; i++) {
        //     const basicInfoUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;

        //     const data = await fetch(basicInfoUrl).then((res) => res.json());

        //     let obj = {
        //         name: await fetch(
        //             `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
        //         )
        //             .then((res) => res.json())
        //             .then((res) => res.name),
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
        // // get pokemons data from data javascript
        // console.log(pokemonsObject);
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

        //filter bug at the end, need to find the current filter pokemons

        //add second condition which is the region
        const filter = pokemons.filter(
            (pokemon) =>
                pokemon.types.some(
                    (type) => type === selectedType || selectedType === "all"
                ) && eval(regionFilterFn(pokemon, selectedRegion.value))
        );

        //condition if reached end of page (no more pokemons found)
        if (filter.length < firstRecordIdx) {
            //disable next button BUG2
            setCurrentPage(1);
            firstRecordIdx = 0;
            lastRecordIdx = filter.length;
        }

        var pokemonsPaginate = filter.slice(firstRecordIdx, lastRecordIdx);

        //sort the pagination
        pokemonsPaginate.sort((a, b) => sortFilterFn(selectedSort, a, b));

        setPokemonsPaginate(pokemonsPaginate);

        //set final total pokemons here based on the final filter
        setTotalPokemons(filter.length);
    }, [currentPage, limit, selectedType, selectedSort, selectedRegion]);

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

        //set the number of initially
        setTotalPokemons(pokemonsData.length);
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
        setSelectedType(selected);
        setResetAll(false);
    }
    function onSortSelect(selected) {
        setSelectedSort(selected);
        setResetAll(false);
    }

    function onRegionSelect(selected) {
        var selectedText;
        var selectedValue;

        //check if selected.options defined or undefined
        // otherwise then it must be an object directly

        if (selected.options) {
            selectedValue = +selected.value;
            selectedText = selected.options[selected.selectedIndex].text;
        } else {
            selectedValue = selected.value;
            selectedText = selected.text;
        }
        setSelectedRegion({
            value: selectedValue,
            text: selectedText,
        });

        setResetAll(false);
    }

    //home props
    // https://stackoverflow.com/questions/51148064/reacts-props-with-the-same-name-as-their-value
    const homeProps = {
        limit, //limit={limit}
        goNextPage,
        goPreviousPage,
        currentPage,
        loading,
        pokemonsPaginate,
        updateLimit,
        totalPokemons,
        type: selectedType, //type={selectedType}
        region: selectedRegion.text,
        // nextFilterBtn = {}
        fetchPokemonInfo,
    };

    // state not updating immediatelly
    // https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately

    //function to reset the filter
    function resetFilter(flag) {
        setFilterReset(flag);
    }

    //url useEffect to also detect the path changes

    //1. fixed a bug where filters are not shown after you clicked pokemonInfo then go back using browser
    const currentUrl = useLocation();
    useEffect(() => {
        if (currentUrl.pathname === "/") {
            //show the filters etc
            setPokemonInfoPage(false);
            setAboutPage(false);
        }
    }, [currentUrl]);

    async function evolutionObj(data) {
        return {
            name: data.name,
            id: data.id,
            number: data.id.toString().padStart(3, "0"),

            imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id
                .toString()
                .padStart(3, "0")}.png`,
            pixelImage: await fetch(
                `https://pokeapi.co/api/v2/pokemon/${data.id}`
            )
                .then((res) => res.json())
                .then((res) => res.sprites.front_default),
        };
    }
    function multipleEvolvesURL(evolves_to) {
        let arr = [];
        evolves_to.map((evolve) => arr.push(evolve.species.url));
        return arr;
    }
    //pokemon info if from home page
    async function fetchPokemonInfo(pokemonId) {
        //add loading here so that
        setPokemonLoading(true);
        const basicInfoUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;

        const data = await Promise.all([
            fetch(basicInfoUrl).then((res) => res.json()),
            fetch(speciesUrl).then((res) => res.json()),
        ]);

        const basicInfo = data[0];
        const species = data[1];

        //add required data here

        const evolution_data = await fetch(species.evolution_chain.url).then(
            (res) => res.json()
        );

        //get all the urls for all stages (pokemon-species)
        let firstStage = evolution_data.chain.species.url;
        let secondStage =
            evolution_data.chain.evolves_to.length !== 0
                ? evolution_data.chain.evolves_to[0].species.url
                : null;
        let finalStage =
            // chained checking if there are any evolution previously
            // check if there are any evolution ?
            //      check the next evolution ?
            //          check if there are any evolution : false
            // : false
            evolution_data.chain.evolves_to.length !== 0
                ? evolution_data.chain.evolves_to[0].evolves_to.length !== 0
                    ? evolution_data.chain.evolves_to[0].evolves_to.length >= 1
                        ? //multiple evolution fn, else single evolution (direct url)
                          multipleEvolvesURL(
                              evolution_data.chain.evolves_to[0].evolves_to
                          )
                        : evolution_data.chain.evolves_to[0].evolves_to[0]
                              .species.url
                    : false
                : false;

        var stage1, stage2, stage3;
        if (firstStage) {
            const res = await fetch(firstStage);
            const evolution_data = await res.json();

            stage1 = await evolutionObj(evolution_data);
        } else {
            stage1 = null;
        }

        if (secondStage) {
            const res = await fetch(secondStage);
            const evolution_data = await res.json();

            stage2 = await evolutionObj(evolution_data);
        } else {
            stage2 = null;
        }
        if (finalStage && finalStage.length === 1) {
            const res = await fetch(finalStage);
            const evolution_data = await res.json();

            stage3 = await evolutionObj(evolution_data);
        } else if (finalStage.length > 1) {
            stage3 = [];
            finalStage.forEach(async (url) => {
                const res = await fetch(url);
                const data = await res.json();
                stage3.push(await evolutionObj(data));
            });
        } else {
            stage3 = null;
        }

        let evolution_chain = {
            first: stage1,
            second: stage2,
            final: stage3,
        };

        let pokemonData = {
            name: species.name, // get real name from species instead of basic info
            id: basicInfo.id,
            number: basicInfo.id.toString().padStart(3, "0"),
            description: species.flavor_text_entries.find(
                (text) => text.language.name === "en"
            ).flavor_text,
            types: basicInfo.types.map((types) => {
                return types.type.name;
            }),
            imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${basicInfo.id
                .toString()
                .padStart(3, "0")}.png`,
            pixelImage: basicInfo.sprites.front_default,
            abilities: basicInfo.abilities.map((ability) => {
                return ability.ability.name;
            }),
            height: basicInfo.height / 10, //convert to metres
            weight: basicInfo.weight / 10, //convert to kg
            hp: basicInfo.stats[0].base_stat,
            attack: basicInfo.stats[1].base_stat,
            defense: basicInfo.stats[2].base_stat,
            spAttack: basicInfo.stats[3].base_stat,
            spDefense: basicInfo.stats[4].base_stat,
            speed: basicInfo.stats[5].base_stat,
            evolution_chain: evolution_chain,
        };

        setPokemonInfo((prev) => ({ ...prev, ...pokemonData }));
        //updating the object values
        setPokemonLoading(false);
    }

    // useEffect(() => {
    //     console.log(searchbar.current);
    //     searchbar.current.innerHTML = "test";
    // }, []);
    return (
        <>
            {loading && <Preloader loadingProgress={loadingProgress} />}
            {!loading && (
                <>
                    <div className="heading">
                        <h1>Pokedex</h1>
                        <div className="themeToggle">
                            {!loading && (
                                <button onClick={toggleTheme}>
                                    {" "}
                                    Toggle Theme{" "}
                                </button>
                            )}
                        </div>
                    </div>
                    {!notFound && !aboutPage && (
                        <>
                            <Link to="/about">About page</Link>
                            <SearchBar onFilterReset={resetFilter} />
                        </>
                    )}
                    {!notFound && !aboutPage && !pokemonInfoPage && (
                        <Filters
                            types={allTypes}
                            onTypeSelect={onTypeSelect}
                            onSortSelect={onSortSelect}
                            onRegionSelect={onRegionSelect}
                            filterReset={filterReset}
                            selectedRegion={selectedRegion}
                            resetAll={resetAll}
                            setResetAll={setResetAll}
                        />
                    )}
                    <Routes>
                        <Route
                            path="/"
                            element={<Home {...homeProps} />}
                        ></Route>
                        <Route
                            path="/about"
                            element={
                                <About inAboutPage={(el) => setAboutPage(el)} />
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                <SearchResults
                                    pokemons={pokemons}
                                    typeFilter={selectedType}
                                    sortFilter={selectedSort}
                                    sortFilterFn={sortFilterFn}
                                    regionFilter={selectedRegion.value}
                                    regionFilterFn={regionFilterFn}
                                    filterReset={filterReset}
                                />
                            }
                        ></Route>
                        <Route
                            path="/pokemon/:pokemonId"
                            element={
                                <PokemonInfo
                                    data={pokemonInfo}
                                    fetchPokemonInfo={(childID) =>
                                        fetchPokemonInfo(childID)
                                    }
                                    inPokemonPage={(el) =>
                                        setPokemonInfoPage(el)
                                    }
                                    loading={pokemonLoading}
                                />
                            }
                        />
                        <Route
                            path="/*"
                            element={
                                <NotFound
                                    back={() => setNotFound(false)}
                                    notFound={(child) => setNotFound(child)}
                                    setPokemonInfoPage={(e) =>
                                        setPokemonInfoPage(e)
                                    }
                                />
                            }
                        ></Route>
                    </Routes>
                    <ScrollToTop />
                </>
            )}
        </>
    );
}

export default App;
