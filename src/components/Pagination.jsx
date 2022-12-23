import React from "react";

const Pagination = ({ nextPage, prevPage, limit, applyLimit }) => {
    return (
        <div>
            <form>
                <label htmlFor="limit">
                    Generate&nbsp;
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
                    &nbsp;Pokemon
                </label>
                <br />
            </form>
            <br />
            <button onClick={prevPage} disabled={prevPage ? false : true}>
                Previous
            </button>
            <button onClick={nextPage} disabled={nextPage ? false : true}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
