import React, { useEffect } from "react";
import { useState } from "react";
const Filters = ({
    types,
    onTypeSelect,
    onSortSelect,
    onRegionSelect,
    filterReset,
    selectedRegion,
}) => {
    const [resetAll, setResetAll] = useState(false);

    function onResetFilters() {
        setResetAll(true);
    }
    useEffect(() => {
        if (filterReset) {
            //if true (delete all search bar) the reset with default selected otherwise not
            onTypeSelect("all");

            // FIX BUG-001 HERE to reselect the previous region when we clear the search bar

            // current bug: the number shows 905 because we dont get through the onRegionSelect function in app.js
            // console.log(selectedRegion);
            onRegionSelect(selectedRegion);
        }

        if (resetAll) {
            onTypeSelect("all");
            onSortSelect("default");
            onRegionSelect({ value: 0, text: "All Regions" });
        }
    }, [filterReset, resetAll]);

    return (
        <>
            <h3>Filters:</h3>
            <div>
                Types &nbsp;
                <select
                    onChange={(e) => onTypeSelect(e.target.value)}
                    name="typeFilters"
                    id="typeFilters"
                >
                    <option value="all" selected={filterReset}>
                        all types
                    </option>
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
                    onChange={(e) => onRegionSelect(e.target)}
                    name="region"
                    id="region"
                >
                    <option value="0" selected={resetAll}>
                        All Regions
                    </option>
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
                    onChange={(e) => onSortSelect(e.target.value)}
                    name="sort"
                    id="sort"
                >
                    <option value="default" selected={resetAll}>
                        Lowest Number (first)
                    </option>
                    <option value="numDesc">Highest Number (first)</option>
                    <option value="letterAsc">A-Z</option>
                    <option value="letterDsc">Z-A</option>

                    {/* {types.map((type) => (
                        <option value={type}>{type}</option>
                    ))} */}
                </select>
            </div>
            <button onClick={onResetFilters}> Reset Filters</button>
        </>
    );
};

export default Filters;
