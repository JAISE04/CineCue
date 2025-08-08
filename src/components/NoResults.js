import React from "react";

const NoResults = ({ query }) => (
  <div className="no-results">
    <h3>No movies found for "{query}"</h3>
    <p>Try adjusting your search or filters</p>
  </div>
);

export default NoResults;
