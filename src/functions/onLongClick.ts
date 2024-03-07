import { MouseEventHandler, MutableRefObject } from 'react';
import { mobileDetector } from './browserDetector';

export const onLongClick = (
    target: any,
    duration: number,
    callback: () => any,
) => {
    if (target) {
        if (mobileDetector() !== 'other') {
            target.addEventListener('touchstart', () => {
                const timer = setTimeout(callback, duration);
                target.addEventListener('touchmove', () => {
                    clearTimeout(timer);
                });
                target.addEventListener('touchend', () => {
                    clearTimeout(timer);
                });
            });
        } else {
            target.addEventListener('mousedown', () => {
                const timer = setTimeout(callback, duration);
                target.addEventListener('mouseup', () => {
                    clearTimeout(timer);
                });
            });
        }
    }

    // mousedown, mouseup으로 터치가 가능한가?
};
