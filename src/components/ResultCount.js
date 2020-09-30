import React from "react";
import "../App.css";

const ResultCount = ({resultLength, totalNews}) => {
    return(
        <div className="results-count">
        {resultLength > 0
          ? `Showing ${resultLength} of ${totalNews} results`
          : "No Results Found" }
      </div>
    )
}

export default ResultCount;