import { useState, useEffect } from "react";

// Helper function to debounce the resize event
const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = (debounceDelay: number = 200): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Debounce the resize event handler
    const debouncedResize = debounce(handleResize, debounceDelay);

    // Add resize event listener
    window.addEventListener("resize", debouncedResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [debounceDelay]);

  return windowSize;
};

export default useWindowSize;
