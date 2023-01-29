import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const About = ({ inAboutPage }) => {
    // setEvolutionChain(data.evolution_chain);
    useEffect(() => {
        inAboutPage(true);
    }, []);

    return (
        <div>
            <Link to="/">Return to home</Link>
            <h2>About page here</h2>
        </div>
    );
};

export default About;
