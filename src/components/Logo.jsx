import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Logo = ({ className = 'h-24 md:h-28', imgClassName = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="Shimpi Bandhan Logo" className={`h-full w-auto object-contain drop-shadow-sm ${imgClassName}`} />
    </Link>
  );
};

export default Logo;
