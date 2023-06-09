import { useEffect, useState } from 'react';

function ButtonUp(): JSX.Element {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight
    ) {
      setVisibleReviews(visibleReviews + 3);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="up-btn"
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </button>
  );
}

export default ButtonUp;
