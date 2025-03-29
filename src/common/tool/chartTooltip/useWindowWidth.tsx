import { useState, useEffect } from "react";

// Custom hook to get the window's client width with debounce
const useWindowWidth = (delay: number = 300): number => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Function to update window width state with debounce
    const updateWindowWidth = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, delay); // Delay in ms
    };

    // Set up the event listener for resize events
    window.addEventListener("resize", updateWindowWidth);

    // Cleanup the event listener when the component unmounts
    return () => {
      clearTimeout(timeoutId); // Clear the timeout on cleanup
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [delay]); // Dependency array includes delay to allow customization of debounce time

  return windowWidth;
};

export default useWindowWidth;
