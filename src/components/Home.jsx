import React from "react";
import Pagination from "./Pagination";
import PokemonList from "./PokemonList";

const Home = ({
    limit,
    goNextPage,
    goPreviousPage,
    currentPage,
    loading,
    pokemonsPaginate,
    updateLimit,
    totalPokemons,
    type,
}) => {
    return (
        <>
            {/* Only show this part when NOT in not found page, going to optimize these further */}
            <Pagination
                limit={limit}
                nextPage={goNextPage}
                prevPage={goPreviousPage}
                currentPage={currentPage}
                applyLimit={(e) => updateLimit(e.target.value)}
                isLoading={loading}
            />
            <h3>
                Showing {totalPokemons} Pokémons of {type} type
                {type === "all" ? "s" : null}
            </h3>
            <PokemonList pokemons={pokemonsPaginate} loading={loading} />
        </>
    );
};

export default Home;
