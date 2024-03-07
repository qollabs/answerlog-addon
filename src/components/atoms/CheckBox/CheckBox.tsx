import { AppContext } from '@Pages/_app';
import { ColorType } from '@Styles/colors';
import { TextSizePreferenceType, TextSizeType } from '@Styles/fonts';
import { useEffect, useState, ChangeEvent, useContext } from 'react';
import {
    BaseCheckBox,
    CheckBoxContainer,
    CheckBoxInput,
    CheckBoxLabelText,
    Label,
} from './CheckBox.styled';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export type CheckBoxValue = string | number;

type AllCheckedWhenType = 'every' | 'some';

interface CheckBoxProp {
    value: CheckBoxValue;
    checkedSet: CheckBoxValue[];
    setCheckedSet: (checkedSet: CheckBoxValue[]) => void;
    className?: string;
    label?: string;
    labelSize?: TextSizeType;
    labelColor?: ColorType;
    width?: string;
    disabled?: boolean;
    isAll?: boolean;
    allOptions?: CheckBoxValue[];
    allCheckedWhen?: AllCheckedWhenType;
    customCheckHandler?: (checked: boolean, value?: CheckBoxValue) => void;
    noBackground?: boolean;
}

export const CheckBox = ({
    value,
    checkedSet,
    setCheckedSet,
    className,
    label,
    labelSize,
    labelColor,
    width,
    disabled,
    isAll,
    allOptions,
    allCheckedWhen = 'every',
    customCheckHandler,
    noBackground,
}: CheckBoxProp) => {
    const { textSizePref } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();
    const [check, setCheck] = useState<boolean>(false);

    useEffect(() => {
        isAll && allOptions
            ? allCheckedWhen === 'some'
                ? setCheck(checkedSet.length > 0)
                : setCheck(checkedSet.length === allOptions.length)
            : setCheck(checkedSet.includes(value));
    }, [checkedSet]);

    const checkHandler = () => {
        if (!check) {
            // Check Logic
            const newCheckedSet = checkedSet;
            newCheckedSet.push(value);
            setCheckedSet([...newCheckedSet]);
        } else if (checkedSet.some((item) => item === value)) {
            // Uncheck Logic
            const newCheckedSet = checkedSet.filter((item) => item !== value);
            setCheckedSet(newCheckedSet);
        }
    };

    const allCheckHandler = () => {
        if (!check && allOptions) {
            setCheckedSet(allOptions);
        } else {
            setCheckedSet([]);
        }
    };

    const onCheck = () => {
        if (customCheckHandler) customCheckHandler(!check, value);
        setCheck(!check);
        isAll ? allCheckHandler() : checkHandler();
    };

    return (
        <CheckBoxContainer
            checked={check}
            width={width}
            noBackground={noBackground}
        >
            <CheckBoxInput
                id={`checkbox_${value}_${className}`}
                className={className}
                checked={check}
                disabled={disabled}
                type="checkbox"
                value={value}
                noBackground={noBackground}
                readOnly
            />
            <Label htmlFor={`checkbox_${value}_${className}`} onClick={onCheck}>
                <BaseCheckBox
                    className="base-checkbox"
                    isAll={isAll}
                    noBackground={noBackground}
                />
                {label && (
                    <CheckBoxLabelText
                        labelSize={labelSize}
                        labelColor={labelColor}
                        textSizePref={textSizePref}
                        checked={check}
                    >
                        {label}
                    </CheckBoxLabelText>
                )}
            </Label>
        </CheckBoxContainer>
    );
};
