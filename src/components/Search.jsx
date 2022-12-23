import React from "react";
import { useState } from "react";

const Search = ({ searchQuery }) => {
    const [query, setQuery] = useState("");
    return (
        <div>
            <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="coming soon... (search)"
                value={query}
                disabled={true}
            />
            {query && <p>Search results for "{query}..."</p>}
        </div>
    );
};

export default Search;
