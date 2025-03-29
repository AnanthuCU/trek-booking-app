import { useEffect } from "react";

function useDebounce<T>(value: T, delay: number, callback: (val: T) => void) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);
}

export default useDebounce;
