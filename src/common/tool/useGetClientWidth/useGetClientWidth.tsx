import { useState, useEffect } from "react";

type UseGetClientWidth = (ref: React.RefObject<HTMLElement>) => number;

const useGetClientWidth: UseGetClientWidth = (ref) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Check if ref is set
    if (!ref.current) return;

    // Create a ResizeObserver to observe changes in the element's size
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Update the width state when the element's width changes
        setWidth(entry.contentRect.width);
      }
    });

    // Start observing the element
    resizeObserver.observe(ref.current);

    // Cleanup the observer when the component unmounts
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]);

  return width;
};

export default useGetClientWidth;
