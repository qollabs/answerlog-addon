import { ChangeEvent } from 'react';

export const formatPhoneNumber = (value: string) => {
    return value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, '');
};
export const onChangeInputPhoneNumber = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void,
) => {
    const { value } = e.target;
    if (value.length <= 13) {
        const newValue = formatPhoneNumber(value);
        setValue(newValue);
    }
};

export const formatFullDate = (value: string) => {
    return value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1.$2.$3')
        .replace(/(\.{1,2})$/g, '');
};
export const onChangeInputFullDate = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void,
) => {
    const { value } = e.target;
    if (value.length <= 10) {
        const newValue = formatFullDate(value);
        setValue(newValue);
    }
};

export const formatYear = (value: string) => {
    return value.replace(/[^0-9]/g, '');
};

export const onChangeInputYear = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void,
) => {
    const { value } = e.target;
    if (value.length <= 4) {
        const newValue = formatYear(value);
        setValue(newValue);
    }
};

export const formatMonth = (value: string) => {
    return value.replace(/[^0-9]/g, '');
};

export const onChangeInputMonth = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void,
) => {
    const { value } = e.target;
    if (value.length <= 3) {
        let editedValue = formatMonth(value);
        // if (editedValue.length === 1 && editedValue === '0') {
        //     editedValue = '';
        // }
        if (editedValue.length === 1 && editedValue !== '0') {
            editedValue = `0${editedValue}`;
        }
        if (editedValue.length === 3 && editedValue[0] === '0') {
            editedValue = editedValue.substring(1);
        }
        const newValue = editedValue.substring(0, 2);
        setValue(newValue);
    }
};

export const formatDate = (value: string) => {
    return value.replace(/[^0-9]/g, '');
};

export const onChangeInputDate = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void,
) => {
    const { value } = e.target;
    if (value.length <= 3) {
        let editedValue = formatDate(value);
        // if (editedValue.length === 1 && editedValue === '0') {
        //     editedValue = '';
        // }
        if (editedValue.length === 1 && editedValue !== '0') {
            editedValue = `0${editedValue}`;
        }
        if (editedValue.length === 3 && editedValue[0] === '0') {
            editedValue = editedValue.substring(1);
        }
        const newValue = editedValue.substring(0, 2);
        setValue(newValue);
    }
};
