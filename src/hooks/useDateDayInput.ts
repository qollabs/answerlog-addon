import { useState, useEffect, ChangeEvent } from 'react';

// interface InputHandler {
//     value: string;
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     setValue: (value: string) => void;
// }

type InputHandler = [
    string,
    (e: ChangeEvent<HTMLInputElement>) => void,
    (value: string) => void,
];

export const useDateDayInput = (initialValue = ''): InputHandler => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace('..', '.');

        if (
            newValue.lastIndexOf('.') > -1 &&
            ![4, 7].includes(newValue.lastIndexOf('.'))
        ) {
            return;
        }
        if (
            isNaN(Number(newValue[newValue.length - 1])) &&
            newValue !== '' &&
            newValue[newValue.length - 1] !== '.'
        )
            return;
        if (newValue.length > 10) return;
        if (
            (value.length === 3 && newValue.length === 4) ||
            (value.length === 6 && newValue.length === 7)
        ) {
            setValue(newValue + '.');
        } else if (
            (value.length === 4 && newValue.length === 5) ||
            (value.length === 7 && newValue.length === 8)
        ) {
            setValue(
                newValue.slice(0, -1) + '.' + newValue[newValue.length - 1],
            );
        } else {
            setValue(newValue);
        }
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return [value, onChange, setValue];
};
