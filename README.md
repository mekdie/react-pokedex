# Pokédex built with React

Pokédex app from Pokémon Franchise built with React and Open Source PokeAPI to support with its data generation. Thanks to PokeAPI, all the data for this project can be generated. Pokémon and Pokémon character names are trademarks of Nintendo. This project is merely for learning purposes (personal project to enhance ReactJS knowledge).

## Demo

View this Pokédex Project live [here](https://mekdie-reactpokedex.netlify.app/).
<br>
https://mekdie-reactpokedex.netlify.app/

## Technologies

-   ReactJS
-   React Router DOM
-   JavaScript
-   Bootstrap / Tailwind / React-Bootstrap (Not yet implemented and selected)
-   PokeAPI
-   Fetch API / Axios

## Features (and TO-DO):

-   Pagination ✔️
-   Filters (FIX THE SHOWING FILTERS FOR DIFFERENT PAGES BUG) ⚠️
    -   Types ✔️
    -   Region ✔️
    -   Reset Filter ✔️
-   Generate options:
    -   Quantity ✔️
    -   Sort ✔️
-   Preloader loading ✔️
-   Search Pokemons by name and ID (live search inspired / referring to Netflix's search) ✔️
-   Clear search function ✔️
-   Scroll to top (need to be enhanced further) ✔️
-   Sort Pokemons (Number and Letters) ✔️
-   Type colors ✔️
-   Separate / Router page for pokemon info 🔄
-   Add previous or next pokemon inside the pokemon info 🔄
-   Add type weaknesses, etc. for each pokemon
-   Generate random pokemons (surprise me feature)
-   Load more for generate random pokemons
-   Generate Pokemons Loading (for live search directly from API)
-   Designs on all pages using CSS Framework (Either bootstrap, Tailwind, or Material UI)
-   Modal box on pokemon info
-   Responsive Design
-   Dark Mode toggle (can be achieved with bootstrap / tailwind - daisyUI)
-   Change the select options with react-select
-   multiple type filters
-   code clean up and bug fixes
-   change fetch api into using react query

## Pages

-   Homepage (showing all pokemons with pagination and filter)
-   Search (with query - list all the searched pokemons)
-   Details (about the specific pokemon)
-   Not Found - 404 Page (wildcard url path - no page found)

## React and JavaScript Knowledge Implemented:

-   React:
    -   State and Props
    -   Hooks:
        -   useState
        -   useEffect
        -   useNavigation
        -   useSearchParams
    -   Custom hooks
    -   React Router DOM (Routing and Links)
-   JavaScript:
    -   String and Array Manipulation
    -   Logical Operators
    -   Objects
    -   Spread Operator
    -   Destructing
    -   Ternary Operator
    -   DOM Manipulation

## Copyright and Licenses

© 2022 Pokémon. © 1995–2022 Nintendo/Creatures Inc./GAME FREAK inc. Pokémon, Pokémon character names, Nintendo Switch, Nintendo 3DS, Nintendo DS, Wii, Wii U, and WiiWare are trademarks of Nintendo.

The MIT License (MIT):

Copyright (c) 2022-present McDony Lee - Mekdie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

BUG WHEN LOAD THE POKEMON INFO AND WHEN GO BACK TO HOMEPAGE AFTER GOING TO POKEMON INFO

-   fix a bug when loading the pokemon info
-   fix a bug when press the back button
-   fix the component showing / hiding when going to pokemon info page
