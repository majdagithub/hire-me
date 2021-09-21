import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => 
<>
    <div className="pnf">
        <h1>Oops! We can't find the page you’re looking for.</h1>
        <Link to="/" className="btn btn-info">RETURN HOME</Link>
    </div>
</>;

export default PageNotFound;