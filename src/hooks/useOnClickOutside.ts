import { useRef, useEffect } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
    handler?: (event?: Event) => void,
) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const listener: EventListener = (event) => {
            const { current } = ref;
            if (!current || current.contains(event.target as Node)) {
                return;
            }
            if (handler !== undefined) handler(event);
            event.preventDefault();
        };

        document.addEventListener('click', listener, { capture: true });
        return () => {
            document.removeEventListener('click', listener, { capture: true });
        };
    }, [ref, handler]);

    return ref;
};
