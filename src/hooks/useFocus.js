import { useEffect, useRef } from 'react';

export const useFocus = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return ref;
};
