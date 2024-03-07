import React, { forwardRef } from 'react';
import { Text } from '@Atoms/Typography';
import {
    SpeechBubbleContainer,
    SpeechBubbleTextBox,
} from './SpeechBubble.styled';
import { convertTime } from '@Functions/convertTime';
import { Gap } from '@Styles/App.styled';

interface SpeechBubbleProp extends React.ComponentProps<'div'> {
    sentAt?: Date | string;
    isMyBubble?: boolean;
    children?: React.ReactNode;
}

export const SpeechBubble = forwardRef<
    HTMLDivElement,
    Omit<SpeechBubbleProp, 'ref'>
>(({ sentAt, isMyBubble = true, children, ...rest }, ref) => {
    return (
        <SpeechBubbleContainer isMyBubble={isMyBubble} {...rest}>
            {sentAt && (
                <Text size="c1" color="gray4">
                    {convertTime(sentAt, 'dotDate').slice(5)}
                </Text>
            )}
            {sentAt && <Gap width="8px" />}
            <SpeechBubbleTextBox ref={ref}>
                <Text size="b2">{children}</Text>
            </SpeechBubbleTextBox>
        </SpeechBubbleContainer>
    );
});
