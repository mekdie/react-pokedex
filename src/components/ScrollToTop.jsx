import React from "react";
import { useEffect } from "react";
import { HiArrowLongUp } from "react-icons/hi2";
const ScrollToTop = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);
    const btnScrollToTop = document.querySelector(".btnScrollToTop");

    window.addEventListener("scroll", (e) => {
        btnScrollToTop.style.display = window.scrollY > 20 ? "block" : "none";
    });

    //gotta need to revamp the scroll to top design
    return (
        <div>
            <button
                className="btnScrollToTop"
                onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
                // onScroll={(e) => {
                //     e.style.display = window.scrollY > 20 ? "block" : "none";
                // }}
                style={{
                    position: "fixed",
                    right: "1rem",
                    bottom: "1rem",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    cursor: "pointer",
                }}
            >
                <HiArrowLongUp size={20} />
            </button>
        </div>
    );
};

export default ScrollToTop;
