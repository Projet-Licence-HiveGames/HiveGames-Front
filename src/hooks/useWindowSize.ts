import { useEffect, useRef, useState } from "react";

type WindowSize = {
  isLaptop: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isMobileL: boolean;
  isMobileM: boolean;
};

const getWindowSize = (): WindowSize => {
  const width = window.innerWidth;
  return {
    isDesktop: width >= 1440,
    isLaptop: width >= 1024 && width <= 1440,
    isTablet: width >= 768 && width <= 1024,
    isMobileL: width >= 540 && width <= 768,
    isMobileM: width >= 368 && width <= 540,
    isMobile: width <= 768,
  };
};

const isDifferentWindowSize = (
  newSize: WindowSize,
  previousSize: WindowSize,
): boolean => {
  return (
    newSize.isLaptop !== previousSize.isLaptop ||
    newSize.isTablet !== previousSize.isTablet ||
    newSize.isDesktop !== previousSize.isDesktop ||
    newSize.isMobile !== previousSize.isMobile
  );
};

export const useWindowSize = (
  onResizeCallback?: (info: {
    size: WindowSize;
    isDifferentSize: boolean;
  }) => void,
) => {
  const [windowSize, setWindowSize] = useState<WindowSize>(() =>
    window
      ? getWindowSize()
      : {
          isLaptop: false,
          isTablet: false,
          isDesktop: false,
          isMobile: false,
          isMobileL: false,
          isMobileM: false,
        },
  );

  const prevSizeRef = useRef(windowSize);

  useEffect(() => {
    const handleResize = () => {
      const newSize = getWindowSize();
      const isDifferent = isDifferentWindowSize(newSize, prevSizeRef.current);

      if (isDifferent) {
        setWindowSize(newSize);
        prevSizeRef.current = newSize;
      }

      onResizeCallback?.({ size: newSize, isDifferentSize: isDifferent });
    };

    handleResize(); // Appel initial

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onResizeCallback]);

  return windowSize;
};

export default useWindowSize;
