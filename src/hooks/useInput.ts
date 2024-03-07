import { useState, useEffect, ChangeEvent } from 'react';

export type OnChangeFunctionType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;
export type SetValueFunctionType = (value: string) => void;

type InputHandler = [string, OnChangeFunctionType, SetValueFunctionType];

export const useInput = (initialValue = ''): InputHandler => {
    const [value, setValue] = useState(initialValue);

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return [value, onChange, setValue];
};
