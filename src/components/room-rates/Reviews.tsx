import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  country: string;
  rating: number;
  comment: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Guest Reviews
      </h3>
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
              {review.author[0]}
            </div>
            <div>
              <p className="font-semibold">{review.author}</p>
              <p className="text-sm text-gray-600">{review.country}</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Star className="h-4 w-4 fill-booking-accent text-booking-accent" />
              <span className="font-semibold">{review.rating}</span>
            </div>
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;