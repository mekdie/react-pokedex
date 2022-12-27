import React from "react";

const Preloader = ({ loadingProgress }) => {
    return (
        <div className="wrapper">
            <div className="loading-description">
                <p>Loading Pokedex</p>
                <p>{loadingProgress}%</p>
            </div>
            <div className="preloader-wrapper">
                <div className="pokeball"></div>
            </div>
        </div>
    );
};

export default Preloader;
