import { categoryPicker } from '@Functions/categoryPicker';
import { TextTagContainer } from './TextTag.styled';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { ReactNode } from 'react';
import { TextSizeType } from '@Styles/fonts';

interface TextTagProps {
    category?: number;
    children?: ReactNode;
    size?: TextSizeType;
    backgroundColor?: string;
    borderRadius?: string;
}

export const TextTag = ({
    category,
    children,
    size,
    backgroundColor,
    borderRadius,
}: TextTagProps) => {
    return (
        <TextTagContainer
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
        >
            {category && categoryPicker(category).icon}
            {category && <Gap width="2px" />}
            <Text color="orange2" size={size || 'c1'}>
                {category ? categoryPicker(category).name : children}
            </Text>
        </TextTagContainer>
    );
};
