import React from "react";

const Filters = ({ types, selectedType }) => {
    return (
        <div>
            Types &nbsp;
            <select
                onChange={(e) => selectedType(e.target.value)}
                name="cars"
                id="cars"
            >
                <option value="all">All Types</option>
                {types.map((type) => (
                    <option value={type}>{type}</option>
                ))}
            </select>
        </div>
    );
};

export default Filters;
