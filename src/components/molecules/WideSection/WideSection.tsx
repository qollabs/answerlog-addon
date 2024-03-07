import { Text } from '@Atoms/Typography';
import {
    WideSectionContainer,
    WideSectionContentContainer,
    WideSectionTitleBox,
} from './WideSection.styled';

interface WideSectionProps {
    title?: string;
    height?: string;
    children?: React.ReactNode;
}

export const WideSection = ({ title, height, children }: WideSectionProps) => {
    return (
        <WideSectionContainer height={height}>
            {title && (
                <WideSectionTitleBox>
                    <Text size="h2">{title}</Text>
                </WideSectionTitleBox>
            )}
            <WideSectionContentContainer>
                {children}
            </WideSectionContentContainer>
        </WideSectionContainer>
    );
};
