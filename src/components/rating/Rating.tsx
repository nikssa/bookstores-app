import { useEffect, useState } from 'react';
import Star from '../common/Star';
import './Rating.scss';

type RatingProps = {
  rating?: number;
};

function Rating({ rating = 0 }: RatingProps) {
  const [ratingState, setRatingState] = useState(rating);
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setStars([]);
    const stars = [];
    for (let index = 0; index < 5; index++) {
      if (ratingState > index) {
        stars.push(
          <div
            key={index}
            onMouseEnter={() => {
              setRatingState(index + 1);
            }}>
            <Star style={{ fill: 'orange' }} />
          </div>
        );
      } else {
        stars.push(
          <div
            key={index}
            onMouseEnter={() => {
              setRatingState(index + 1);
            }}>
            <Star style={{ opacity: '0.1' }} />
          </div>
        );
      }
    }
    setStars(stars);
  }, [ratingState]);

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
