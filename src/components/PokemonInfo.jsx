import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PokemonInfo = () => {
    //get the pokemonid from params
    const { pokemonId } = useParams();
    const [data, setData] = useState({});
    async function fetchData() {
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
            description: species.flavor_text_entries[0].flavor_text,
            types: basicInfo.types.map((types) => {
                return types.type.name;
            }),
            imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${basicInfo.id
                .toString()
                .padStart(3, "0")}.png`,
            pixelImage: basicInfo.sprites.front_default,
            abilities: basicInfo.abilities,
            height: basicInfo.height / 10, //convert to metres
            weight: basicInfo.weight / 10, //convert to kg
            hp: basicInfo.stats[0].base_stat,
            attack: basicInfo.stats[1].base_stat,
            defense: basicInfo.stats[2].base_stat,
            spAttack: basicInfo.stats[3].base_stat,
            spDefense: basicInfo.stats[4].base_stat,
            speed: basicInfo.stats[5].base_stat,
        };

        setData((data) => [...data, ...pokemonData]);
    }
    useEffect(() => {
        fetchData();
    });

    return (
        <div>
            Pokemon id: {pokemonId}
            <ul>
                <li>Name{data.name}</li>
                <li>{data.id}</li>
                <li>{data.number}</li>
                <li>{data.description}</li>
                <li>{data.types}</li>
                <li>{data.abilities}</li>
                <li>{data.height}</li>
                <li>{data.weight}</li>
                <li>{data.hp}</li>
                <li>{data.attack}</li>
                <li>{data.defense}</li>
                <li>{data.spAttack}</li>
                <li>{data.spDefense}</li>
                <li>{data.speed}</li>
            </ul>
        </div>
    );
};

export default PokemonInfo;
