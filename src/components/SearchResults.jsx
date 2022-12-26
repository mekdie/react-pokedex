import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchResults = () => {
    // Get the q param from the URL
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");

    const navigate = useNavigate();

    //if the query is empty or only search param without q then go back to home
    useEffect(() => {
        if (!searchParams.get("q")) {
            navigate("/");
        }
    }, []);

    //generate all pokemons here

    //search with filter
    //https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

    // ===== PROTOTYPES HARDCODED FOR TESTING ==== //

    const allPokemons = [
        "Bulbasaur",
        "Ivysaur",
        "Venusaur",
        "Charmander",
        "Charmeleon",
        "Charizard",
        "Squirtle",
        "Wartortle",
        "Blastoise",
        "Caterpie",
        "Metapod",
        "Butterfree",
        "Weedle",
        "Kakuna",
        "Beedrill",
        "Pidgey",
        "Pidgeotto",
        "Pidgeot",
        "Rattata",
        "Raticate",
        "Spearow",
        "Fearow",
        "Ekans",
        "Arbok",
        "Pikachu",
        "Raichu",
        "Sandshrew",
        "Sandslash",
        "Nidoran",
        "Nidorina",
        "Nidoqueen",
        "Nidoran",
        "Nidorino",
        "Nidoking",
        "Clefairy",
        "Clefable",
        "Vulpix",
        "Ninetales",
        "Jigglypuff",
        "Wigglytuff",
        "Zubat",
        "Golbat",
        "Oddish",
        "Gloom",
        "Vileplume",
        "Paras",
        "Parasect",
        "Venonat",
        "Venomoth",
        "Diglett",
        "Dugtrio",
        "Meowth",
        "Persian",
        "Psyduck",
        "Golduck",
        "Mankey",
        "Primeape",
        "Growlithe",
        "Arcanine",
        "Poliwag",
        "Poliwhirl",
        "Poliwrath",
        "Abra",
        "Kadabra",
        "Alakazam",
        "Machop",
        "Machoke",
        "Machamp",
        "Bellsprout",
        "Weepinbell",
        "Victreebel",
        "Tentacool",
        "Tentacruel",
        "Geodude",
        "Graveler",
        "Golem",
        "Ponyta",
        "Rapidash",
        "Slowpoke",
        "Slowbro",
        "Magnemite",
        "Magneton",
        "Farfetch'd",
        "Doduo",
        "Dodrio",
        "Seel",
        "Dewgong",
        "Grimer",
        "Muk",
        "Shellder",
        "Cloyster",
        "Gastly",
        "Haunter",
        "Gengar",
        "Onix",
        "Drowzee",
        "Hypno",
        "Krabby",
        "Kingler",
        "Voltorb",
        "Electrode",
        "Exeggcute",
        "Exeggutor",
        "Cubone",
        "Marowak",
        "Hitmonlee",
        "Hitmonchan",
        "Lickitung",
        "Koffing",
        "Weezing",
        "Rhyhorn",
        "Rhydon",
        "Chansey",
        "Tangela",
        "Kangaskhan",
        "Horsea",
        "Seadra",
        "Goldeen",
        "Seaking",
        "Staryu",
        "Starmie",
        "Mr. Mime",
        "Scyther",
        "Jynx",
        "Electabuzz",
        "Magmar",
        "Pinsir",
        "Tauros",
        "Magikarp",
        "Gyarados",
        "Lapras",
        "Ditto",
        "Eevee",
        "Vaporeon",
        "Jolteon",
        "Flareon",
        "Porygon",
        "Omanyte",
        "Omastar",
        "Kabuto",
        "Kabutops",
        "Aerodactyl",
        "Snorlax",
        "Articuno",
        "Zapdos",
        "Moltres",
        "Dratini",
        "Dragonair",
        "Dragonite",
        "Mewtwo",
        "Mew",
    ];
    // var insensitiveRegex = new RegExp(allPokemons.join("|"), "i");

    // const regex = insensitiveRegex.test(searchQuery);

    // console.log(regex);
    const result = allPokemons
        .map((element) => element.toLowerCase())
        .filter((pokemon) => pokemon.includes(searchQuery));

    // console.log(result);

    return (
        <>
            <div>
                {searchQuery && <p>Search results for "{searchQuery}..."</p>}
            </div>
            <div>
                <h1>Pokemon search results here</h1>
                <h3>
                    {result.map((e) => {
                        return <p>{e}</p>;
                    })}
                </h3>
            </div>
        </>
    );
};

export default SearchResults;
