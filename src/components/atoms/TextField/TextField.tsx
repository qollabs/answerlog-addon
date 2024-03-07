import {
    ChangeEvent,
    FocusEvent,
    ReactNode,
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';
import EyeIcon from '@Images/icons/eye.svg';
import EyeOffIcon from '@Images/icons/eye_off.svg';
import {
    BaseTextField,
    TextFieldWrapper,
    BaseTextArea,
    SupportTextBox,
    SupportIconButton,
    HelpTextBox,
    TextFieldContainer,
    TextFieldStatusType,
    LabelBox,
    SupportBox,
    TextFieldSubContainer,
    TagsBox,
    TextFieldTitleBox,
} from './TextField.styled';
import { AppContext } from '@Pages/_app';
import { Gap } from '@Styles/App.styled';
import { CSSProperties } from 'styled-components';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { Text } from '@Atoms/Typography';
import { mobileDetector } from '@Functions/browserDetector';

interface TextFieldProp {
    title?: string;
    label?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    isTextarea?: boolean;
    onChangeTextArea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    helpMessage?: string;
    errorMessage?: string;
    maxTextLength?: number;
    alignRight?: boolean;
    disabled?: boolean;
    type?: string;
    width?: string;
    areaHeight?: string;
    status?: TextFieldStatusType;
    className?: string;
    supportButton?: ReactNode;
    isNumeric?: boolean;
    style?: CSSProperties;
    actionOnFocus?: (
        e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => void;
    actionOnBlur?: (
        e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => void;
}

export const TextField = ({
    title,
    label,
    value,
    onChange,
    isTextarea,
    onChangeTextArea,
    placeholder,
    helpMessage,
    errorMessage,
    maxTextLength,
    alignRight,
    disabled,
    type,
    width,
    areaHeight = '120px',
    status = 'default',
    className,
    supportButton,
    isNumeric,
    style,
    actionOnFocus,
    actionOnBlur,
}: TextFieldProp) => {
    const { textSizePref } = useContext(AppContext);
    const { actionOnTouchEnd, actionOnTouchEndWithEvent } = useActionOnTouch();

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const textContainerRef = useRef<HTMLDivElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onFocus = (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setIsFocused(true);
        if (!actionOnFocus) return;
        actionOnFocus(e);
    };

    const onBlur = (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setIsFocused(false);
        if (!actionOnBlur) return;
        setTimeout(() => {
            actionOnBlur(e);
        }, 100);
    };

    return (
        <TextFieldWrapper width={width}>
            {label && (
                <>
                    <LabelBox status={status} textSizePref={textSizePref}>
                        {label}
                    </LabelBox>
                    <Gap height="6px" />
                </>
            )}
            <TextFieldContainer
                status={status}
                isFocused={isFocused}
                isTextarea={isTextarea}
                disabled={disabled}
                textSizePref={textSizePref}
                ref={textContainerRef}
            >
                {title && (
                    <TextFieldTitleBox textSizePref={textSizePref}>
                        {title}
                    </TextFieldTitleBox>
                )}
                <TagsBox>
                    {isTextarea ? (
                        <BaseTextArea
                            className={className}
                            placeholder={placeholder}
                            onChange={onChangeTextArea}
                            value={value}
                            disabled={disabled}
                            status={status}
                            height={areaHeight}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            textSizePref={textSizePref}
                            style={style}
                            maxLength={maxTextLength}
                            ref={textAreaRef}
                        />
                    ) : (
                        <BaseTextField
                            className={className}
                            type={
                                type
                                    ? type === 'password' && showPassword
                                        ? 'text'
                                        : type
                                    : 'text'
                            }
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            disabled={disabled}
                            alignRight={alignRight}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            textSizePref={textSizePref}
                            pattern={isNumeric ? '[0-9]*' : undefined}
                            inputMode={isNumeric ? 'numeric' : undefined}
                            style={style}
                            ref={textInputRef}
                        />
                    )}
                </TagsBox>
                {!isTextarea && (
                    <SupportBox>
                        {maxTextLength && (
                            <SupportTextBox
                                status={status}
                                textSizePref={textSizePref}
                            >
                                {value?.length ?? 0}/{maxTextLength}
                            </SupportTextBox>
                        )}
                        {type === 'password' && (
                            <SupportIconButton
                                onClick={() => setShowPassword(!showPassword)}
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        setShowPassword(!showPassword),
                                    )
                                }
                            >
                                {showPassword ? (
                                    <EyeOffIcon width={20} height={20} />
                                ) : (
                                    <EyeIcon width={20} height={20} />
                                )}
                            </SupportIconButton>
                        )}
                        {supportButton}
                    </SupportBox>
                )}
            </TextFieldContainer>
            {status === 'error' && errorMessage && (
                <Text size="b2" color="orange3">
                    {errorMessage}
                </Text>
            )}
            {(helpMessage || (isTextarea && maxTextLength)) && (
                <TextFieldSubContainer>
                    {helpMessage && (
                        <HelpTextBox
                            status={status}
                            textSizePref={textSizePref}
                        >
                            {helpMessage}
                        </HelpTextBox>
                    )}
                    {isTextarea && maxTextLength && (
                        <SupportTextBox status={status}>
                            {value?.length ?? 0}/{maxTextLength}
                        </SupportTextBox>
                    )}
                </TextFieldSubContainer>
            )}
        </TextFieldWrapper>
    );
};
