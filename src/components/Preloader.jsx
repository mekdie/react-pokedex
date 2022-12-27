import React from "react";

const Preloader = () => {
    return (
        <div className="wrapper">
            <p className="loading-description">Loading Pokedex</p>
            <div className="preloader-wrapper">
                <div className="pokeball"></div>
            </div>
        </div>
    );
};

export default Preloader;
