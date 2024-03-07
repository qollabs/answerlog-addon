import { useRef, useEffect, useCallback } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right' | '';

export const useScrollFadeIn = <T extends HTMLElement = HTMLDivElement>(
    direction: Direction = 'up',
    duration = 1,
    delay = 0,
    threshold = 0.5,
) => {
    const ref = useRef<T>(null);

    const handleDirection = (name: Direction) => {
        switch (name) {
            case 'up':
                return 'translate3d(0, 25%, 0)';
            case 'down':
                return 'translate3d(0, -25%, 0)';
            case 'left':
                return 'translate3d(25%, 0, 0)';
            case 'right':
                return 'translate3d(-25%, 0, 0)';
            default:
                return '';
        }
    };

    const handleScroll = useCallback(
        ([entry]) => {
            const { current } = ref;

            if (current && entry.isIntersecting) {
                current.style.transitionProperty = 'all';
                current.style.transitionDuration = `${duration}s`;
                current.style.transitionTimingFunction =
                    'cubic-bezier(0, 0, 0.2, 1)';
                current.style.transitionDelay = `${delay}s`;
                current.style.opacity = '1';
                current.style.transform = 'translate3d(0, 0, 0)';
            }
        },
        [delay, duration],
    );

    useEffect(() => {
        let observer: IntersectionObserver;
        const { current } = ref;

        if (current) {
            observer = new IntersectionObserver(handleScroll, {
                threshold,
            });
            observer.observe(current);
        }

        return () => observer && observer.disconnect();
    }, [handleScroll, threshold]);

    return {
        ref,
        style: {
            opacity: 0,
            transform: handleDirection(direction),
        },
    };
};