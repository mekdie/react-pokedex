import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        setData((prev) => ({ ...prev, ...pokemonData }));
    }
    useEffect(() => {
        fetchData();
    });

    return (
        <div>
            Pokemon id: {pokemonId}
            <ul>
                <LazyLoadImage
                    src={data.imageUrl}
                    placeholderSrc={data.pixelImage}
                    width={150}
                    height={150}
                    alt={`${data.name} model`}
                />
                <li>Name: {data.name}</li>
                <li>ID: {data.id}</li>
                <li>Number: {data.number}</li>
                <li>Description: {data.description}</li>
                <li>Types: {data.types}</li>
                <li>Abilities: {data.abilities}</li>
                {/* <li>{data.abilities}</li> */}
                <li>Height: {data.height}m</li>
                <li>Weight: {data.weight}kg</li>
                <li>HP: {data.hp}</li>
                <li>ATK: {data.attack}</li>
                <li>DEF: {data.defense}</li>
                <li>SpATK: {data.spAttack}</li>
                <li>SpDEF: {data.spDefense}</li>
                <li>SPEED: {data.speed}</li>
            </ul>
        </div>
    );
};

export default PokemonInfo;
