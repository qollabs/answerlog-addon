import { AppContext } from '@Pages/_app';
import { Gap } from '@Styles/App.styled';
import { ColorType } from '@Styles/colors';
import { TextSizePreferenceType, TextSizeType } from '@Styles/fonts';
import { useContext, useEffect, useState, FocusEvent, useRef } from 'react';
import {
    RadioContainer,
    RadioInput,
    RadioLabelText,
    Label,
    BaseRadioBox,
    RadioEditableTextInput,
} from './Radio.styled';
import { useInput } from '@Hooks/useInput';

export type RadioValue = string | number;

interface RadioProp {
    value: RadioValue;
    selectedValue: RadioValue;
    setSelectedValue: (selectedValue: RadioValue) => void;
    className?: string;
    label?: string;
    labelSize?: TextSizeType;
    labelColor?: ColorType;
    forcedTextPref?: TextSizePreferenceType;
    width?: string;
    disabled?: boolean;
    noBackground?: boolean;
    editable?: boolean;
    actionOnFocus?: (
        e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => void;
    actionOnBlur?: (
        e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => void;
}

export const Radio = ({
    value,
    selectedValue,
    setSelectedValue,
    className,
    label,
    labelSize,
    labelColor,
    forcedTextPref,
    width,
    disabled,
    noBackground,
    editable,
    actionOnFocus,
    actionOnBlur,
}: RadioProp) => {
    const { textSizePref } = useContext(AppContext);
    const [selected, setSelected] = useState<boolean>();
    const [etcValue, onChangeEtcValue, setEtcValue] = useInput('');
    const [isEtcValueClicked, setIsEtcValueClicked] = useState(false);

    const radioTextInputRef = useRef<HTMLInputElement>(null);

    // toggle selected
    useEffect(() => {
        if (editable && isEtcValueClicked) {
            setSelected(etcValue === selectedValue);
        } else {
            setSelected(value === selectedValue);
        }
    }, [selectedValue, isEtcValueClicked]);

    // editable mode
    useEffect(() => {
        if (editable) {
            setSelectedValue(etcValue);
        }
    }, [etcValue]);

    const onClickRadio = () => {
        if (editable && radioTextInputRef?.current) {
            setIsEtcValueClicked(true);
            setSelectedValue(etcValue);
            radioTextInputRef.current.focus();
        } else {
            setSelectedValue(value);
        }
    };

    const onFocus = (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSelectedValue(etcValue);
        if (!actionOnFocus) return;
        actionOnFocus(e);
    };

    const onBlur = (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!actionOnBlur) return;
        setTimeout(() => {
            actionOnBlur(e);
        }, 100);
    };

    return (
        <RadioContainer
            selected={selected}
            width={width}
            noBackground={noBackground}
        >
            <RadioInput
                id={`radio_${value}_${className}`}
                className={className}
                checked={selected}
                disabled={disabled}
                type="radio"
                value={value}
                noBackground={noBackground}
            />
            <Label
                htmlFor={`radio_${value}_${className} ${
                    editable && 'radio-editable'
                }`}
                onClick={!disabled ? () => onClickRadio() : undefined}
                className={editable ? 'radio-editable' : undefined}
            >
                <BaseRadioBox
                    className={
                        editable ? 'radio-editable base-radio' : 'base-radio'
                    }
                    noBackground={noBackground}
                />
                {label && (
                    <RadioLabelText
                        labelSize={labelSize}
                        labelColor={labelColor}
                        textSizePref={forcedTextPref ?? textSizePref}
                        selected={selected}
                        className={editable ? 'radio-editable' : undefined}
                    >
                        {label}
                    </RadioLabelText>
                )}
                {editable && (
                    <RadioEditableTextInput
                        value={etcValue}
                        labelSize={labelSize}
                        labelColor={labelColor}
                        textSizePref={forcedTextPref ?? textSizePref}
                        selected={selected}
                        placeholder="원하는 답변을 입력하세요"
                        onChange={onChangeEtcValue}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        ref={radioTextInputRef}
                    />
                )}
            </Label>
        </RadioContainer>
    );
};
