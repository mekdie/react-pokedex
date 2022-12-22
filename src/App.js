import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const pokeAPI = "https://pokeapi.co/api/v2";
    const [currentUrl, setCurrentUrl] = useState(`${pokeAPI}/pokemon`);
    const [nextUrl, setNextUrl] = useState(`${pokeAPI}/pokemon`);
    const [prevUrl, setPreviousUrl] = useState(`${pokeAPI}/pokemon`);
    const [loading, setLoading] = useState(true);

    //rerun the useEffect whenever the currentPageUrl changes
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        axios
            .get(currentUrl, { signal })
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
    }, [currentUrl]);

    function goNextPage() {
        setCurrentUrl(nextUrl);
    }

    function goPreviousPage() {
        setCurrentUrl(prevUrl);
    }
    return (
        <>
            <h1>Pokemon List Generator</h1>
            <Pagination
                nextPage={nextUrl ? goNextPage : null}
                prevPage={prevUrl ? goPreviousPage : null}
            />
            <PokemonList pokemon={pokemon} loading={loading} />
        </>
    );
}

export default App;
