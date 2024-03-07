import { TouchCoordinateType } from '@Types/types';
import { useCallback, useEffect, useState } from 'react';

interface UseMobileTouchReturnProps {
    // 일반 TouchEvent 타입과 react에서 제공하는 TouchEvent 타입 두 개가 충돌하여 문제가 많이 생긴다. 그냥 any 타입을 쓰자.
    actionOnTouchEnd: (e: any, targetFunction?: (param?: any) => any) => void;
    actionOnTouchEndWithEvent: (
        e: any,
        targetFunction?: (param?: any) => any,
        additionalEvent?: () => any,
    ) => void;
}

export const useActionOnTouch = (
    dependencies: any[] = [],
): UseMobileTouchReturnProps => {
    const [touchStartCoordinate, setTouchStartCoordinate] =
        useState<TouchCoordinateType>({ x: 0, y: 0 });
    const [isTouchMoved, setIsTouchMoved] = useState(false);
    const [touchMoveCoordinate, setTouchMoveCoordinate] =
        useState<TouchCoordinateType>({ x: 0, y: 0 });

    useEffect(() => {
        document.addEventListener('touchstart', getTouchStartCoordinate);
        document.addEventListener('touchmove', getTouchMoveCoordinate);

        return () => {
            document.removeEventListener('touchstart', getTouchStartCoordinate);
            document.removeEventListener('touchmove', getTouchMoveCoordinate);
        };
    }, [touchStartCoordinate, touchMoveCoordinate]);

    const getTouchStartCoordinate = (e: TouchEvent) => {
        setIsTouchMoved(false);
        const touchStart = e.touches[0];
        setTouchStartCoordinate({
            x: touchStart.clientX,
            y: touchStart.clientY,
        });
        // console.log(touchStartCoordinate);
    };

    const getTouchMoveCoordinate = (e: TouchEvent) => {
        setIsTouchMoved(true);
        const touchMove = e.touches[0];
        setTouchMoveCoordinate({
            x: touchMove.clientX,
            y: touchMove.clientY,
        });
        // console.log(touchMoveCoordinate);
    };

    const actionOnTouchEnd = useCallback(
        (e: any, targetFunction?: () => any) => {
            // console.log('final', touchStartCoordinate, touchMoveCoordinate);
            // e.preventDefault();

            if (isTouchMoved) {
                const deltaX = Math.abs(
                    touchMoveCoordinate.x - touchStartCoordinate.x,
                );
                const deltaY = Math.abs(
                    touchMoveCoordinate.y - touchStartCoordinate.y,
                );
                // console.log(deltaX, deltaY);
                if (deltaX > 10 || deltaY > 10) return;
            }
            // if (targetFunction) targetFunction();
        },
        [...dependencies, touchStartCoordinate, touchMoveCoordinate],
    );

    const actionOnTouchEndWithEvent = useCallback(
        (e: any, targetFunction?: () => any, additionalEvent?: () => any) => {
            if (isTouchMoved) {
                const deltaX = Math.abs(
                    touchMoveCoordinate.x - touchStartCoordinate.x,
                );
                const deltaY = Math.abs(
                    touchMoveCoordinate.y - touchStartCoordinate.y,
                );
                // console.log(deltaX, deltaY);
                if (deltaX > 10 || deltaY > 10) return;
            }
            if (targetFunction) targetFunction();
            if (additionalEvent) additionalEvent();
        },
        [...dependencies, touchStartCoordinate, touchMoveCoordinate],
    );
    return {
        actionOnTouchEnd,
        actionOnTouchEndWithEvent,
    };
};
