import { useState, useEffect, ChangeEvent } from 'react';

interface InputHandler {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setValue: (value: string) => void;
}

export const useDateMonthInput = (initialValue = ''): InputHandler => {
    const [value, setValue] = useState(initialValue);

    

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (
            isNaN(Number(newValue[newValue.length - 1])) && 
            newValue !== '' &&
            newValue[newValue.length - 1] !== '.'
            ) 
            return;
        if (newValue.length > 7) return;
        if (value.length === 3 && newValue.length === 4) {
            setValue(newValue + '.')
        } else if(value.length === 4 && newValue.length === 5) {
            setValue(newValue.slice(0,-1) + '.' + newValue[newValue.length-1])
        } else {
            setValue(newValue);
        }
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return { value, onChange, setValue };
};