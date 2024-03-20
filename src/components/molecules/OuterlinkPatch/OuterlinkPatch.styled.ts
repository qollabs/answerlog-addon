import { RowContainer } from '@Atoms/RowContainer';
import styled, { css } from 'styled-components';
import { OuterlinkPatchSizeType } from './OuterlinkPatch';
import { BLACK_BACKGROUND } from '@Styles/themes';
import { Box } from '@Atoms/Box';
import { Container } from '@Atoms/Container';
import { WHITE } from '@Styles/colors';

export const OuterlinkPatchWrapper = styled.a`
    display: block;
`;

export const OuterlinkPatchContainer = styled(RowContainer)<{
    size: OuterlinkPatchSizeType;
}>`
    ${BLACK_BACKGROUND}
    ${({ size }) => patchSizeHandler(size).container}
`;

export const OuterlinkPatchLogoBox = styled(Box)<{
    size: OuterlinkPatchSizeType;
}>`
    ${({ size }) => patchSizeHandler(size).logo}
`;

export const OuterlinkPatchTextContainer = styled(Container)`
    height: 100%;
    justify-content: space-between;
    align-items: start;
    & span {
        color: ${WHITE};
    }
`;

export const OuterlinkPatchMainText = styled.span<{
    customStyle: boolean;
    size: OuterlinkPatchSizeType;
}>`
    ${({ customStyle, size }) =>
        !customStyle && patchSizeHandler(size).mainText}
`;

export const OuterlinkPatchSubText = styled.span<{
    customStyle?: boolean;
    size: OuterlinkPatchSizeType;
}>`
    ${({ customStyle, size }) => !customStyle && patchSizeHandler(size).subText}
`;

const patchSizeHandler = (size: OuterlinkPatchSizeType) => {
    switch (size) {
        case 'default':
        default:
            return {
                container: css`
                    width: fit-content;
                    min-width: 228px;
                    height: 60px;
                    border-radius: 8px;
                    padding: 8px;
                `,
                logo: css`
                    width: 44px;
                    min-width: 44px;
                    height: 44px;
                    margin-right: 8px;
                `,
                mainText: css`
                    font-size: 16px;
                    font-weight: 800;
                `,
                subText: css`
                    font-size: 14px;
                `,
            };
        case 'big':
            return {
                container: css`
                    width: fit-content;
                    min-width: 344px;
                    height: 104px;
                    border-radius: 20px;
                    padding: 16px;
                `,
                logo: css`
                    width: 72px;
                    min-width: 72px;
                    height: 72px;
                    margin-right: 16px;
                `,
                mainText: css`
                    font-size: 22px;
                    font-weight: 800;
                `,
                subText: css`
                    font-size: 20px;
                `,
            };
        case 'small':
            return {
                container: css`
                    width: fit-content;
                    min-width: 128px;
                    height: 34px;
                    border-radius: 4px;
                    padding: 4px;
                `,
                logo: css`
                    width: 26px;
                    min-width: 26px;
                    height: 26px;
                    margin-right: 4px;
                `,
                mainText: css`
                    font-size: 16px;
                    font-weight: 800;
                `,
                subText: css``,
            };
    }
};
