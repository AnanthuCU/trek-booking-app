import { useState, useEffect, useRef } from "react";

function useIsMobile(targetWidth: number): boolean {
  const [isMobile, setIsMobile] = useState(false); // Start with false on server
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
    // Only run this on the client
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < targetWidth);
      }
    };

    const handleResize = debounce(updateIsMobile, 300);

    updateIsMobile(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [targetWidth]);

  return isMobile;
}

export default useIsMobile;
