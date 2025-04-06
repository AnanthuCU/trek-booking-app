import { useState, useEffect } from "react";

// Custom hook to get the window's client width with debounce
const useWindowWidth = (delay: number = 300): number => {
  const [windowWidth, setWindowWidth] = useState<number>(0); // Safe initial value for SSR

  useEffect(() => {
    if (typeof window === "undefined") return; // Skip effect on server

    let timeoutId: NodeJS.Timeout;

    const updateWindowWidth = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, delay);
    };

    // Set initial value on client
    setWindowWidth(window.innerWidth);

    // Set up resize listener
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [delay]);

  return windowWidth;
};

export default useWindowWidth;
