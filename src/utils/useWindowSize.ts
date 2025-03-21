import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        isLaptop: false,
        isTablet: false,
        isDesktop: false,
        isMobile: false
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            setWindowSize({
                isLaptop: width >= 1024 && width <= 1440,
                isTablet: width >= 768 && width <= 1024,
                isDesktop: width >= 1440,
                isMobile: width < 768
            });
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
