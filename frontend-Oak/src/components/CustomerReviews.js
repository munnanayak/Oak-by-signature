import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    image: null,
  });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewReview({ ...newReview, image: e.target.files[0] });
  };

  const handleAddReview = () => {
    setReviews([...reviews, newReview]);
    setNewReview({ rating: 0, comment: '', image: null });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  return (
    <section className="py-12 flex flex-col items-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Leave Your Valuable Review</h2>
        <textarea
          name="comment"
          value={newReview.comment}
          onChange={handleReviewChange}
          placeholder="Write your review here"
          className="w-full mb-4 px-4 py-2 border rounded"
          rows="4"
        />
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer ${newReview.rating >= star ? 'text-blue-500' : 'text-gray-400'}`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <button
          onClick={handleAddReview}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Review
        </button>
      </div>
      <div className="w-full max-w-2xl mt-12">
        {reviews.map((review, index) => (
          <div key={index} className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <div>
                <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
                <p>{review.comment}</p>
                {review.image && <img src={URL.createObjectURL(review.image)} alt="Review" className="mt-2" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
