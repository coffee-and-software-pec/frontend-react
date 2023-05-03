import React from "react";

import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <>
            <div>Landing Page</div>
            <Link to={"/home"}>navegar para home</Link>
        </>
    )
}

export default LandingPage;