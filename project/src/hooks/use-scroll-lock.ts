import { useEffect, useRef } from 'react';

function useScrollLock() {
  const bodyRef = useRef(document.body);

  useEffect(() => {
    const { current } = bodyRef;
    const originalOverflow = window.getComputedStyle(current).overflow;
    current.style.overflow = 'hidden';

    return () => {
      current.style.overflow = originalOverflow;
    };
  }, []);

  return bodyRef;
}

export default useScrollLock;
