import { useState } from 'react';
import Star from '../common/Star';
import './Rating.scss';

type RatingProps = {
  rating?: number;
};

function Rating({ rating = 0 }: RatingProps) {
  const [ratingState, setRatingState] = useState(rating);
  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <div key={index} onMouseEnter={() => setRatingState(index + 1)}>
        <Star
          style={{ fill: ratingState > index ? 'orange' : 'rgba(0,0,0,0.1)' }}
        />
      </div>
    ));

  return (
    <div
      className='rating'
      onMouseEnter={() => setRatingState(0)}
      onMouseLeave={() => setRatingState(rating)}>
      {stars}
    </div>
  );
}

export default Rating;
