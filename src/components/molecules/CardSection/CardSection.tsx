import { MouseEventHandler } from 'react';
import {
    CardSectionContainer,
    CardSectionContentContainer,
    CardSectionSubtitleText,
    CardSectionTitleContainer,
} from './CardSection.styled';
import { Text } from '@Atoms/Typography';

interface CardSectionProps {
    width?: string;
    height?: string;
    alignItems?: string;
    overflow?: string;
    title?: string;
    subTitle?: string;
    explanation?: string;
    orangeTitle?: boolean;
    deepShadow?: boolean;
    textButton?: string;
    onClickTextButton?: () => void;
    children?: React.ReactNode;
    onClickCardSection?: (param?: any) => void;
}

export const CardSection = ({
    width,
    height,
    alignItems,
    overflow,
    title,
    subTitle,
    explanation,
    orangeTitle,
    deepShadow,
    textButton,
    onClickTextButton,
    children,
    onClickCardSection,
}: CardSectionProps) => {
    return (
        <CardSectionContainer
            deepShadow={deepShadow}
            width={width}
            height={height}
            onClick={onClickCardSection}
            overflow={overflow}
        >
            {title && (
                <CardSectionTitleContainer orangeTitle={orangeTitle}>
                    <Text size="h2">{title}</Text>
                    {subTitle && <Text>{subTitle}</Text>}
                    {textButton && (
                        <Text underline onClick={onClickTextButton}>
                            {textButton}
                        </Text>
                    )}
                </CardSectionTitleContainer>
            )}
            <CardSectionContentContainer alignItems={alignItems}>
                {explanation && (
                    <CardSectionSubtitleText size="b2">
                        {explanation}
                    </CardSectionSubtitleText>
                )}
                {children}
            </CardSectionContentContainer>
        </CardSectionContainer>
    );
};
