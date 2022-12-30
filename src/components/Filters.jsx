import React from "react";

const Filters = ({ types, selectedType, selectedSort, selectedRegion }) => {
    return (
        <>
            <h3>Filters:</h3>
            <div>
                Types &nbsp;
                <select
                    onChange={(e) => selectedType(e.target.value)}
                    name="typeFilters"
                    id="typeFilters"
                >
                    <option value="all">all types</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                Regions (Gen) &nbsp;
                <select
                    onChange={(e) => selectedRegion(e.target)}
                    name="region"
                    id="region"
                >
                    <option value="0">All Regions</option>
                    <option value="1">Kanto (Gen I)</option>
                    <option value="2">Johto (Gen II)</option>
                    <option value="3">Hoenn (Gen III)</option>
                    <option value="4">Sinnoh (Gen IV)</option>
                    <option value="5">Unova (Gen V)</option>
                    <option value="6">Kalos (Gen VI)</option>
                    <option value="7">Alola (Gen VII)</option>
                    <option value="8">Galar (Gen VIII)</option>
                </select>
            </div>
            <div>
                Sort By &nbsp;
                <select
                    onChange={(e) => selectedSort(e.target.value)}
                    name="sort"
                    id="sort"
                >
                    <option value="default">Lowest Number (first)</option>
                    <option value="numDesc">Highest Number (first)</option>
                    <option value="letterAsc">A-Z</option>
                    <option value="letterDsc">Z-A</option>

                    {/* {types.map((type) => (
                        <option value={type}>{type}</option>
                    ))} */}
                </select>
            </div>
        </>
    );
};

export default Filters;
