    import React, { useState } from 'react';
import "../css/Bookdetails.css"
    import { useNavigate, useLocation } from 'react-router-dom';
    function Bookdetails() {


    const location = useLocation();
    const book = location.state?.book;


    return (
        <>
            <div className="full">
                <div className='display-details'>
                    <div className='left'>
                        <img src={book.coverImage} alt="" />
                    </div>
                    <div className='right'>
                        <h4 className='title'>Book Title: {book.title}</h4>
                        <p className='title'>Author: {book.author}</p>
                        <p className='title'>Description: {book.description}</p>
                        <p className='title'>Genre: {book.genre}</p>
                        <p className='title'>Published Year: {book.published_year}</p>
                        <h4>Reviews:</h4>
                        <div className='reviews'>
                            
                            {book.reviews && book.reviews.length > 0 ? (
                                <ul>
                                    {book.reviews.map((review) => (
                                        <div className='r-c' key={review._id}>
                                            <p className='r'>Rating: ({review.rating}/5)</p>
                                            <p className='r'>Review: {review.reviewText}</p>
                                            <p className='r'>Created At: {new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
      
    );
}

export default Bookdetails;
