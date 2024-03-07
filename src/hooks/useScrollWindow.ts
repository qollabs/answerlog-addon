import { useState, useEffect } from 'react';

export const useScrollWindow = () => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        window.addEventListener('scroll', () => {
            if (mounted) {
                setScrollX(window.pageXOffset);
                setScrollY(window.pageYOffset);
                setLoading(false);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    return { scrollX, scrollY, loading };
};