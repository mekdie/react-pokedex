import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = ({ notFound, back }) => {
    //passing not found condition to parents
    useEffect(() => {
        //true we are in not found
        notFound(true);
    });
    return (
        <>
            <div>NotFound</div>
            {/* set notFound to false because we are going back to non not found page  */}
            <Link onClick={back} to="/">
                Go back to home
            </Link>
        </>
    );
};

export default NotFound;
