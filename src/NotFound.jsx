import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = ({ notFound }) => {
    //passing not found condition to parents
    useEffect(() => {
        notFound(true);
    });
    return (
        <>
            <div>NotFound</div>
            <Link to="/">Go back to home</Link>
        </>
    );
};

export default NotFound;
