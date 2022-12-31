import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import axios from "axios";
const PokemonList = ({ pokemons, loading }) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <>
            {loading ? (
                <h3>
                    <i>Loading ... </i>
                </h3>
            ) : (
                <div className="container">
                    {pokemons.map((p) => {
                        // console.log(p.name);
                        return (
                            // <p key={p.id}>{p.name}</p>
                            <div className="box" key={p.id}>
                                <h4> {capitalizeFirstLetter(p.name)} </h4>
                                <ul>
                                    <li>Number: #{p.number}</li>
                                    <li>
                                        Types:&nbsp;
                                        <span key={p.types}>
                                            {p.types.toString()}
                                        </span>
                                    </li>

                                    {/* <img
                                            src={p.imageUrl}
                                            alt={`${p.name} model`}
                                            width={150}
                                        />
                                        <img
                                            src={p.pixelImage}
                                            alt={`${p.name} model`}
                                            width={150}
                                        /> */}
                                    <LazyLoadImage
                                        src={p.imageUrl}
                                        placeholderSrc={p.pixelImage}
                                        width={150}
                                        height={150}
                                        alt={`${p.name} model`}
                                    />
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default PokemonList;
