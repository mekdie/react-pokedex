import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const pokeAPI = "https://pokeapi.co/api/v2";
    const [currentUrl, setCurrentUrl] = useState(`${pokeAPI}/pokemon`);
    const [nextUrl, setNextUrl] = useState(`${pokeAPI}/pokemon`);
    const [prevUrl, setPreviousUrl] = useState(`${pokeAPI}/pokemon`);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(20);

    //rerun the useEffect whenever the currentPageUrl changes
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        axios
            .get(`${currentUrl}?limit=${limit}`, { signal })
            .then((res) => {
                setLoading(false); //set loading to false to indication get url has succeed
                setNextUrl(res.data.next);
                setPreviousUrl(res.data.previous);
                setPokemon(res.data.results.map((p) => p.name));
            })
            .catch((err) => {
                console.log(err);
            });
        //cancel old request
        return function cleanup() {
            controller.abort();
        };
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
