import { css } from 'styled-components';

export const Heading1 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 130%;
`;

export const Heading2 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 130%;
`;

export const Heading3 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 130%;
`;

export const Heading4 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 130%;
`;

export const Heading5 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 130%;
`;

export const Heading6 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
`;

export const Heading7 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
`;

export const Body0 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 130%;
`;

export const Body1 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 130%;
`;

export const Body2 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
`;

export const Body3 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
`;

export const Body4 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 130%;
`;

export const Caption1 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 350;
    font-size: 14px;
    line-height: 130%;
`;

export const Caption2 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 350;
    font-size: 12px;
    line-height: 130%;
`;

export const Caption3 = css`
    font-family: 'NanumSquareNeo';
    font-style: normal;
    font-weight: 350;
    font-size: 11px;
    line-height: 130%;
`;

export const TextSizePreferenceArray = ['v0', 'v1', 'v2'] as const;
export type TextSizePreferenceType = (typeof TextSizePreferenceArray)[number];

export const TextSizeArray = [
    'h1',
    'h2',
    'h3',
    'b0',
    'b1',
    'b2',
    'c1',
] as const;
export type TextSizeType = (typeof TextSizeArray)[number];

export const textSizePicker = (
    pref?: TextSizePreferenceType,
    size?: TextSizeType,
) => {
    if (pref === 'v0') {
        switch (size) {
            case 'h1':
                return Heading1;
            case 'h2':
                return Heading2;
            case 'h3':
                return Heading4;
            case 'b0':
                return Body0;
            case 'b1':
                return Body1;
            case 'b2':
                return Body2;
            case 'c1':
                return Caption1;
            default:
                return Body1;
        }
    } else if (pref === 'v2') {
        switch (size) {
            case 'h1':
                return Heading3;
            case 'h2':
                return Heading5;
            case 'h3':
                return Heading7;
            case 'b0':
                return Body1;
            case 'b1':
                return Body3;
            case 'b2':
                return Body4;
            case 'c1':
                return Caption3;
            default:
                return Body3;
        }
    } else {
        switch (size) {
            case 'h1':
                return Heading2;
            case 'h2':
                return Heading4;
            case 'h3':
                return Heading6;
            case 'b0':
                return Body0;
            case 'b1':
                return Body2;
            case 'b2':
                return Body3;
            case 'c1':
                return Caption2;
            default:
                return Body2;
        }
    }
};
