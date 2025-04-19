import { useEffect, useRef, useState } from "react";

type WindowSize = {
  isLaptop: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobile: boolean;
};

const getWindowSize = (): WindowSize => {
  const width = window.innerWidth;
  return {
    isLaptop: width >= 1024 && width <= 1440,
    isTablet: width >= 768 && width <= 1024,
    isDesktop: width >= 1440,
    isMobile: width < 768,
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

const useWindowSize = (
  onResizeCallback?: (info: {
    size: WindowSize;
    isDifferentSize: boolean;
  }) => void,
) => {
  const [windowSize, setWindowSize] = useState<WindowSize>(() =>
    window
      ? getWindowSize()
      : { isLaptop: false, isTablet: false, isDesktop: false, isMobile: false },
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
