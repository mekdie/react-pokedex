import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
    //random string placeholder to avoid several condition

    // SEARCH CONDITION
    // 1. put the query string directly to the url
    // 2. unable to change path due to else if inside useEffect
    // 3. make sure to go back to home if query is empty
    // 4. update the input value when use enter the manual url
    // 5. only search path qithout query (refer to search results) - NOT YET

    // ===== NETFLIX INSPIRED ======= //
    const [query, setQuery] = useState("tHr2VR7PSMEGTCBwEyWk");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    //live update on search query
    useEffect(() => {
        if (query !== "tHr2VR7PSMEGTCBwEyWk" && query) {
            navigate(`/search?q=${query}`);
        } else if (!query && window.location.pathname === "/search") {
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
                // if query equals to random string placeholder then it means user enter manual url
                value={
                    query === "tHr2VR7PSMEGTCBwEyWk"
                        ? searchParams.get("q")
                            ? searchParams.get("q")
                            : ""
                        : query
                }
            />
        </div>
    );
};

export default SearchBar;
