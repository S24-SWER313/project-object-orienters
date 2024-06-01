import React from 'react'
import { useParams } from "react-router-dom";

function CodePage() {
    const { value } = useParams();
    return (
        <div>
            <h1>Code Page</h1>
            <p>Code Page is under construction</p>
        </div>
    );
}

export default CodePage