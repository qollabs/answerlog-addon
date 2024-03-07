/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer, useCallback } from 'react';

type StorageHandler<S> = [S, (newValue: S) => void, () => void];

const reducer = <S>(state: S, action: any) => {
    switch (action.type) {
        case 'set':
            return action.payload;
        default:
            return state;
    }
};

const getValue = (key: string) => {
    if (typeof sessionStorage === 'undefined') {
        return null;
    }
    const storedValue = sessionStorage.getItem(key) || 'null';
    try {
        return JSON.parse(storedValue);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return storedValue;
};

const setValue = <S>(key: string, valueToSet: S | null) => {
    if (typeof sessionStorage === 'undefined') {
        return null;
    }

    return sessionStorage.setItem(key, JSON.stringify(valueToSet));
};

export const useSessionstorage = <S>(
    key: string,
    defaultValue: S | null = null,
): StorageHandler<S> => {
    const [value, dispatch] = useReducer(reducer, getValue(key));

    const dispatchValue = <S>(payload: S | null) => {
        dispatch({ payload, type: 'set' });
    };

    const set = useCallback(
        <S>(newValue: S | null) => {
            setValue(key, newValue);
            dispatchValue(newValue);
        },
        [key],
    );

    const init = useCallback(() => {
        const initialValue = getValue(key);

        if (initialValue === null || initialValue === 'null') {
            set(defaultValue);
        }
    }, [defaultValue, key, set]);

    // eslint-disable-next-line consistent-return
    const remove = () => {
        if (typeof sessionStorage === 'undefined') {
            return null;
        }
        sessionStorage.removeItem(key);
        dispatchValue(null);
    };

    useEffect(() => {
        init();
    }, [init]);

    const listen = useCallback(
        (event: StorageEvent) => {
            if (event.storageArea === sessionStorage && event.key === key) {
                set(event.newValue);
            }
        },
        [key, set],
    );

    useEffect(() => {
        window.addEventListener('storage', listen);

        return () => {
            window.removeEventListener('storage', listen);
        };
    }, [listen]);

    return [value, set, remove];
};