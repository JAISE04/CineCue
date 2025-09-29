import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NoResults = ({ query }) => {
  const navigate = useNavigate();
  const { user, setShowSuggestMovieModal } = useAuth();

  const handleSuggestClick = () => {
    if (user) {
      setShowSuggestMovieModal(true);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="no-results">
      <h3>No movies found for "{query}"</h3>
      <button onClick={handleSuggestClick} className="suggest-button"
      style={{ background: "#e50914",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  margin: "10px auto",}}>
        Suggest a movie
      </button>
    </div>
  );
};

export default NoResults;
