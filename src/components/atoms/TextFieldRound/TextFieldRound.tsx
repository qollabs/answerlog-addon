import { ChangeEvent, useContext } from 'react';
import {
    TextFieldRoundContainer,
    TextFieldRoundInput,
    TextFieldRoundTitleContainer,
} from './TextFieldRound.styled';
import { Text } from '@Atoms/Typography';
import { AppContext } from '@Pages/_app';
import { TextSizeType } from '@Styles/fonts';
import { Gap } from '@Styles/App.styled';

interface TextFieldRoundProp {
    title?: string;
    titleWidth?: string;
    asterisk?: boolean;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    textSize?: TextSizeType;
    disabled?: boolean;
    defaultValue?: string;
}

export const TextFieldRound = ({
    title,
    value,
    titleWidth,
    asterisk,
    onChange,
    placeholder,
    textSize,
    disabled,
    defaultValue,
}: TextFieldRoundProp) => {
    const { textSizePref } = useContext(AppContext);

    return (
        <TextFieldRoundContainer>
            {title && (
                <TextFieldRoundTitleContainer width={titleWidth}>
                    <Text>{title}</Text>
                    {asterisk && (
                        <>
                            <Gap width="6px" />
                            <Text color="red2">*</Text>
                        </>
                    )}
                </TextFieldRoundTitleContainer>
            )}
            <TextFieldRoundInput
                disabled={disabled}
                size={1}
                value={value}
                onChange={onChange}
                pref={textSizePref}
                placeholder={placeholder}
                textSize={textSize || 'b1'}
                defaultValue={defaultValue}
            />
        </TextFieldRoundContainer>
    );
};
