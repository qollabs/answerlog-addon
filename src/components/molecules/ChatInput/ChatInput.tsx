import React, {
    ChangeEventHandler,
    useContext,
    FocusEvent,
    ChangeEvent,
    useRef,
    useState,
    useEffect,
} from 'react';

import { AppContext } from '@Pages/_app';
import {
    BaseChatInput,
    ChatInputContainer,
    ChatInputSubmitButton,
} from './ChatInput.styled';
import ArrowUpCircle from '@Images/icons/arrow_up_circle.svg';
import { GRAY3, ORANGE2 } from '@Styles/colors';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { mobileDetector } from '@Functions/browserDetector';

interface ChatInputProp {
    value: string;
    onChangeInput: ChangeEventHandler<HTMLTextAreaElement>;
    showButton?: boolean;
    onClickButton?: () => void;
    placeholder?: string;
    onFocusInput?: (e: FocusEvent<HTMLTextAreaElement>) => void;
    onBlurInput?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

export const ChatInput = ({
    value,
    onChangeInput,
    showButton,
    onClickButton,
    placeholder,
    onFocusInput,
    onBlurInput,
}: ChatInputProp) => {
    const { textSizePref } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();

    const [isFocused, setIsFocused] = useState(false);

    const chatInputRef = useRef<HTMLTextAreaElement>(null);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChangeInput(e);
        if (chatInputRef.current) {
            chatInputRef.current.style.height = 'auto';
            chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
        }
    };

    // focus 이벤트가 클릭 이벤트보다 빨라서 focus로 input의 위치가 변경된 후 클릭이벤트가 실행되어 생기는 문제를 방지한다.
    const onFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        if (!onFocusInput) return;
        setTimeout(() => {
            setIsFocused(true);
            onFocusInput(e);
        }, 100);
    };

    const onBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
        if (!onBlurInput) return;
        setTimeout(() => {
            setIsFocused(false);
            onBlurInput(e);
        }, 100);
    };

    return (
        <ChatInputContainer isFocused={isFocused} className="chat-input">
            <BaseChatInput
                value={value}
                spellCheck={false}
                pref={textSizePref}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                ref={chatInputRef}
                rows={1}
            />
            {showButton && (
                <ChatInputSubmitButton
                    onClick={value ? onClickButton : undefined}
                    onTouchEnd={
                        value
                            ? (e) => actionOnTouchEnd(e, onClickButton)
                            : undefined
                    }
                    disabled={!value}
                >
                    <ArrowUpCircle
                        width="24px"
                        height="24px"
                        color={value ? ORANGE2 : GRAY3}
                    />
                </ChatInputSubmitButton>
            )}
        </ChatInputContainer>
    );
};
