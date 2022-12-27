import React from "react";

const Filters = ({ types, selectedType }) => {
    return (
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
    );
};

export default Filters;
