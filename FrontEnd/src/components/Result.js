import React from "react";
import { useParams } from "react-router-dom";
import ResultCard from "./ResultCard";
import Header from "./Header";

function Result() {
    const {userId} = useParams();

    const {pType, disease} = useParams();
    return (
        <div>
            <Header logged={1} />
            <ResultCard 
                pType={pType}
                disease={disease}
                userId={userId}
            />
        </div>
    );
}

export default Result;