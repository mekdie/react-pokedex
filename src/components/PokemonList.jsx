import React from "react";
// import axios from "axios";
const PokemonList = ({ paginate, loading }) => {
    return (
        <>
            {loading ? (
                <h3>
                    <i>Loading ... </i>
                </h3>
            ) : (
                <ul>
                    {paginate.map((p) => {
                        // console.log(p.name);
                        return (
                            // <p key={p.id}>{p.name}</p>
                            <div key={p.id}>
                                <li> {p.name.toUpperCase()} </li>
                                <ul>
                                    <li>Number: #{p.number}</li>
                                    <li>
                                        Types:{" "}
                                        {p.types.map(({ type }) => (
                                            <span key={type.url}>
                                                {type.name}{" "}
                                            </span>
                                        ))}
                                    </li>
                                    <li>
                                        <img
                                            src={p.imageUrl}
                                            alt={`${p.name} model`}
                                            width={150}
                                        />
                                        <img
                                            src={p.pixelImage}
                                            alt={`${p.name} model`}
                                            width={150}
                                        />
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default PokemonList;
