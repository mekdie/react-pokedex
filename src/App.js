import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
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
        let pokemonData = {
            name: basicInfo.name,
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
        };
        setPokemonInfo((prev) => ({ ...prev, ...pokemonData })); //updating the object values
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
                    {!notFound && <SearchBar onFilterReset={resetFilter} />}
                    {!notFound && !pokemonInfoPage && (
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
                                    onFetchPokemonInfo={(childID) =>
                                        fetchPokemonInfo(childID)
                                    }
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
