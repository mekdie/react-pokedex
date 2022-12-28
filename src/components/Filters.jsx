import React from "react";

const Filters = ({ types, selectedType }) => {
    return (
        <>
            <div>
                Types &nbsp;
                <select
                    onChange={(e) => selectedType(e.target.value)}
                    name="typeFilters"
                    id="typeFilters"
                >
                    <option value="all">all types</option>
                    {types.map((type) => (
                        <option value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                (in progress) Generations / Region &nbsp;
                <select
                    // onChange={(e) => selectedType(e.target.value)}
                    name="generations"
                    id="generations"
                    disabled
                >
                    <option value="all">All Gen</option>
                    {/* {types.map((type) => (
                        <option value={type}>{type}</option>
                    ))} */}
                </select>
            </div>
            <div>
                (in progress) Sort By &nbsp;
                <select
                    // onChange={(e) => selectedType(e.target.value)}
                    name="sort"
                    id="sort"
                    disabled
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
