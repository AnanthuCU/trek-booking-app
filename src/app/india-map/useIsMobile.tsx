import { useState, useEffect, useRef } from "react";

function useIsMobile(targetWidth: number): boolean {
  const [isMobile, setIsMobile] = useState(window.innerWidth < targetWidth);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom debounce function
  const debounce = (func: () => void, delay: number) => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(func, delay);
    };
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < targetWidth);
    }, 300); // Debounce delay: 300ms

    // Set initial state and add listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return isMobile;
}

export default useIsMobile;
