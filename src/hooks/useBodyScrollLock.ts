import { useEffect, useLayoutEffect, useState } from 'react';

export const useBodyScrollLock = (initialLocked = false) => {
    const [locked, setLocked] = useState(initialLocked);

    useLayoutEffect(() => {
        if (!locked) {
            return () => 0;
        }

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        document.body.style.overflow = 'hidden';

        const root = document.getElementById('__next');
        const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

        if (scrollBarWidth) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            if (scrollBarWidth) {
                document.body.style.paddingRight = originalPaddingRight;
            }
        };
    }, [locked]);

    useEffect(() => {
        if (locked !== initialLocked) {
            setLocked(initialLocked);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialLocked]);

    return { locked, setLocked };
};