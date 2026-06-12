import React, { useState, useEffect } from "react";

function Review() {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    useEffect(() => {
        const savedReviews = localStorage.getItem("restaurant_reviews");
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) return;

        const newReview = {
            id: Date.now(),
            name: name,
            comment: comment,
            rating: rating,
            date: new Date().toLocaleDateString(),
        };

        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);

        localStorage.setItem("restaurant_reviews", JSON.stringify(updatedReviews));

        setName("");
        setComment("");
        setRating(5);
    };

    return (
        <div className="review-container">
            <h2 className="review-main-title">CUSTOMER REVIEWS</h2>

            <form className="review-form" onSubmit={handleSubmit}>
                <h3>Leave a Review</h3>

                <div className="form-group">
                    <label>Your Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Rating</label>
                    <div className="star-rating-input">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isFilled = star <= rating;

                            return (
                                <button
                                    type="button"
                                    key={star}
                                    className={`star-btn ${isFilled ? "filled" : ""}`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setRating(star)}
                                >
                                    ★
                                </button>
                            );
                        })}
                        <span className="rating-value">({rating}/5)</span>
                    </div>
                </div>

                <div className="form-group">
                    <label>Your Review</label>
                    <textarea
                        rows="4"
                        placeholder="Share your experience with us..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-review-btn">
                    Submit Review
                </button>
            </form>

            <div className="reviews-list">
                <h3>What People Say</h3>
                {reviews.length === 0 ? (
                    <p className="summary-empty">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((rev) => (
                        <div className="review-card" key={rev.id}>
                            <div className="review-card-header">
                                <h4>{rev.name}</h4>
                                <span className="review-date">{rev.date}</span>
                            </div>
                            <div className="review-stars">
                                {"⭐".repeat(rev.rating)}
                            </div>
                            <p className="review-text">{rev.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Review;