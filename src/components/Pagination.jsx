import React, { useEffect } from "react";
import { useState } from "react";

const Pagination = ({ limit, applyLimit, prevPage, nextPage, currentPage }) => {
    // const prevCheck = (prevPage) => {
    //     //if there is previous page then go here
    //     if (prevPage) {
    //         setPrevDisabled(false);
    //         //if on loading then set it to false
    //         if (isLoading) {
    //             setPrevDisabled(true);
    //         } else {
    //             setPrevDisabled(false);
    //         }
    //     }
    //     //if there is none, then set it to true
    //     else {
    //         setPrevDisabled(true);
    //     }
    // };

    // const nextCheck = (nextPage) => {
    //     if (nextPage) {
    //         setNextDisabled(false);
    //         //if on loading then set it to false
    //         if (isLoading) {
    //             setNextDisabled(true);
    //         } else {
    //             setNextDisabled(false);
    //         }
    //     } else {
    //         setNextDisabled(true);
    //     }
    // };

    // useEffect(() => {
    //     prevCheck(prevPage);
    //     nextCheck(nextPage);
    // }, [nextPage, prevPage]);

    // BUG FOUND WHEN CHANGING POKEMONS QTY GENERATIONS AT HIGHER NUMBER

    // for example, changing to the generate numbers on pokemon 400++ to 250, it will show empty because simply the pokemons qty has been exceeded (bug1)
    return (
        <div>
            <label htmlFor="limit">
                Generate &nbsp;
                <select
                    id="limit"
                    name="limit"
                    value={limit}
                    onChange={applyLimit}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={250}>250</option>
                </select>
                &nbsp;Pokemons
            </label>
            <br />
            {/* <button onClick={prevPage} disabled={prevDisabled}>
                Previous
            </button>
            <button onClick={nextPage} disabled={nextDisabled}>
                Next
            </button>{" "} */}
            <button
                onClick={prevPage}
                disabled={currentPage === 1 ? true : false}
            >
                Previous
            </button>
            <button
                onClick={nextPage}
                disabled={currentPage * limit > 905 ? true : false}
            >
                Next
            </button>{" "}
        </div>
    );
};

export default Pagination;
