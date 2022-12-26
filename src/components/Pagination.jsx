import React, { useEffect } from "react";
import { useState } from "react";

const Pagination = ({ nextPage, prevPage, limit, applyLimit, isLoading }) => {
    const [prevDisabled, setPrevDisabled] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);

    const prevCheck = (prevPage) => {
        //if there is previous page then go here
        if (prevPage) {
            setPrevDisabled(false);
            //if on loading then set it to false
            if (isLoading) {
                setPrevDisabled(true);
            } else {
                setPrevDisabled(false);
            }
        }
        //if there is none, then set it to true
        else {
            setPrevDisabled(true);
        }
    };

    const nextCheck = (nextPage) => {
        if (nextPage) {
            setNextDisabled(false);
            //if on loading then set it to false
            if (isLoading) {
                setNextDisabled(true);
            } else {
                setNextDisabled(false);
            }
        } else {
            setNextDisabled(true);
        }
    };

    useEffect(() => {
        prevCheck(prevPage);
        nextCheck(nextPage);
    }, [nextPage, prevPage]);

    return (
        <div>
            <form>
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
                    </select>
                    &nbsp;Pokemons
                </label>
                <br />
            </form>
            <br />
            <button onClick={prevPage} disabled={prevDisabled}>
                Previous
            </button>
            <button onClick={nextPage} disabled={nextDisabled}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
