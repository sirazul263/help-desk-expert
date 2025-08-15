import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
  rating: string | number;
}

const Rating = ({ rating }: RatingProps) => {
  const numericRating = Number(rating);

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(5)].map((_, i) => {
        if (i + 1 <= numericRating) {
          // Full star
          return <FaStar key={i} />;
        } else if (i < numericRating && numericRating < i + 1) {
          // Half star
          return <FaStarHalfAlt key={i} />;
        } else {
          // Empty star
          return <CiStar key={i} size={20} />;
        }
      })}
    </div>
  );
};

export default Rating;
