import React, { useEffect } from "react";
import { capitalizeFirstLetter as capitalize } from "../Helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useState } from "react";

const EvolutionChain = ({ data }) => {
    //evolution state to prevent delayed state update
    const [evolutionChain, setEvolutionChain] = useState();

    useEffect(() => {
        setEvolutionChain(data.evolution_chain);
    }, [data]);
    if (!evolutionChain) {
        return <h1>Loading...</h1>;
    }
    return (
        <div>
            <h2>Evolutions:</h2>
            <div className="evolution-panel pokemon-container">
                <div className="evolution-item box">
                    <Link
                        className="card-link"
                        to={`/pokemon/${evolutionChain.first.id}`}
                    >
                        <ul>
                            <li>{evolutionChain.first.number}</li>
                            <li>{capitalize(evolutionChain.first.name)}</li>
                            <LazyLoadImage
                                src={evolutionChain.first.imageUrl}
                                placeholderSrc={evolutionChain.first.pixelImage}
                                width={150}
                                height={150}
                                alt={`${evolutionChain.first.name} model`}
                            />
                        </ul>
                    </Link>
                </div>
                <div className="evolution-item box">
                    {evolutionChain.second && (
                        <Link
                            className="card-link"
                            to={`/pokemon/${evolutionChain.second.id}`}
                        >
                            <ul>
                                <li>{evolutionChain.second.number}</li>
                                <li>
                                    {capitalize(evolutionChain.second.name)}
                                </li>
                                <LazyLoadImage
                                    src={evolutionChain.second.imageUrl}
                                    placeholderSrc={
                                        evolutionChain.second.pixelImage
                                    }
                                    width={150}
                                    height={150}
                                    alt={`${evolutionChain.second.name} model`}
                                />
                            </ul>
                        </Link>
                    )}
                </div>

                <div className="evolution-item box">
                    {evolutionChain.final &&
                        !Array.isArray(evolutionChain.final) && (
                            <Link
                                className="card-link"
                                to={`/pokemon/${evolutionChain.final.id}`}
                            >
                                <ul>
                                    <li>{evolutionChain.final.number}</li>
                                    <li>
                                        {capitalize(evolutionChain.final.name)}
                                    </li>
                                    <LazyLoadImage
                                        src={evolutionChain.final.imageUrl}
                                        placeholderSrc={
                                            evolutionChain.final.pixelImage
                                        }
                                        width={150}
                                        height={150}
                                        alt={`${evolutionChain.final.name} model`}
                                    />
                                </ul>
                            </Link>
                        )}
                    {evolutionChain.final &&
                        Array.isArray(evolutionChain.final) && (
                            <>
                                {evolutionChain.final.map((evolve) => {
                                    return (
                                        <Link
                                            className="card-link"
                                            to={`/pokemon/${evolve.id}`}
                                        >
                                            <ul>
                                                <li>{evolve.number}</li>
                                                <li>
                                                    {capitalize(evolve.name)}
                                                </li>
                                                <LazyLoadImage
                                                    src={evolve.imageUrl}
                                                    placeholderSrc={
                                                        evolve.pixelImage
                                                    }
                                                    width={150}
                                                    height={150}
                                                    alt={`${evolve.name} model`}
                                                />
                                            </ul>
                                        </Link>
                                    );
                                })}
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default EvolutionChain;
