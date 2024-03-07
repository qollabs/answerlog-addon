import styled from 'styled-components';
import { ImageUploaderShapeType } from './ImageUploader';
import { ORANGE2 } from '@Styles/colors';
import { ABSOLUTE_CENTER } from '@Styles/themes';

export const ImageUploaderLabel = styled.label<{
    width?: string;
    height?: string;
    shape?: ImageUploaderShapeType;
    outline?: boolean;
}>`
    width: ${({ width }) => width || '100px'};
    height: ${({ height }) => height || '100px'};
    border-radius: ${({ shape }) => (shape === 'round' ? '50%' : '8px')};
    border: ${({ outline }) => (outline ? `2px solid ${ORANGE2}` : 0)};

    position: relative;
    overflow: hidden;
    & > svg {
        ${ABSOLUTE_CENTER}
    }
`;

export const ImageUploaderInput = styled.input`
    display: none;
`;
