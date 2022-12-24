import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    //live update on search query
    useEffect(() => {
        if (query) {
            navigate(`/search?q=${query}`);
        } else {
            navigate("/");
        }
    }, [query]);

    const onSearch = (value) => {
        setQuery(value);
    };
    return (
        <div>
            <input
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                placeholder="Search ID or Name"
                value={query}
            />
        </div>
    );
};

export default SearchBar;
