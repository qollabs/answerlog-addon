/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useReducer } from 'react';

import { asyncStateReducer } from '@Functions/asyncStateReducer';

type AsyncFunction = (...args: any[]) => Promise<any>;
type UseAsyncEffectOutput = [boolean, boolean];

export const useAsyncEffect = (
    asyncFunc: AsyncFunction,
    deps: any[] = [],
): UseAsyncEffectOutput => {
    const [{ loading, error }, dispatch] = useReducer(asyncStateReducer, {
        loading: true,
        error: false,
    });

    const callbackFunc = useCallback(async () => {
        try {
            dispatch({ type: 'LOADING' });
            await asyncFunc();
            dispatch({ type: 'SUCCESS' });
        } catch (error) {
            dispatch({ type: 'ERROR', error });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        callbackFunc();
    }, [callbackFunc]);

    return [loading, error];
};
