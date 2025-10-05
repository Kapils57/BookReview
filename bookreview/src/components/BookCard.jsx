import React from "react";
import "../css/Bookcard.css";

import { useNavigate } from "react-router-dom";

function BookCard({ book, showEdit }) {
  const navigate = useNavigate();


  const averageRating =
    book.reviews?.length > 0
      ? (book.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / book.reviews.length).toFixed(1)
      : "No ratings yet";


  const handleEdit = () => navigate("/registerbooks", { state: { book, showEdit: true } });
  const onReviewClick = () => navigate("/addreview", { state: { book } });
  const details = () => navigate("/bookdetails", { state: { book } });

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={book.coverImage} alt={book.title} />
        <div className="movie-overlay">
          {showEdit ? (
            <button className="edit-btn" onClick={handleEdit}>
              ✎
            </button>
          ) : (
            <>
             
              <button className="favorite-btn2" onClick={onReviewClick}>
                AR
              </button>
            </>
          )}
        </div>
      </div>

      <div className="movie-info">
        <h3>{book.title}</h3>
        <p>{book.published_year}</p>
        <p>
          Average Rating: {averageRating !== "No ratings yet" ? `${averageRating} / 5` : ""}
        </p>
        <button className="favorite-btn3" onClick={details}>
          RE
        </button>
      </div>
    </div>
  );
}

export default BookCard;



