import { css } from 'styled-components';

import {
    BLACK,
    WHITE,
    GRAY0,
    GRAY1,
    GRAY2,
    GRAY3,
    GRAY4,
    GRAY5,
    YELLOW0,
    YELLOW1,
    YELLOW2,
    YELLOW3,
    ORANGE0,
    ORANGE1,
    ORANGE2,
    ORANGE3,
    MANDARIN1,
    MANDARIN2,
    ORANGE_UNSELECTED,
    RED1,
    RED2,
    RED3,
} from './colors';

// < BACKGROUND > //
export const BLACK_BACKGROUND = css`
    background-color: ${BLACK};
`;
export const WHITE_BACKGROUND = css`
    background-color: ${WHITE};
`;
export const GRAY0_BACKGROUND = css`
    background-color: ${GRAY0};
`;
export const GRAY1_BACKGROUND = css`
    background-color: ${GRAY1};
`;
export const GRAY2_BACKGROUND = css`
    background-color: ${GRAY2};
`;
export const GRAY3_BACKGROUND = css`
    background-color: ${GRAY3};
`;
export const GRAY4_BACKGROUND = css`
    background-color: ${GRAY4};
`;
export const GRAY5_BACKGROUND = css`
    background-color: ${GRAY5};
`;
export const YELLOW0_BACKGROUND = css`
    background-color: ${YELLOW0};
`;
export const YELLOW1_BACKGROUND = css`
    background-color: ${YELLOW1};
`;
export const YELLOW2_BACKGROUND = css`
    background-color: ${YELLOW2};
`;
export const YELLOW3_BACKGROUND = css`
    background-color: ${YELLOW3};
`;
export const ORANGE_UNSELECTED_BACKGROUND = css`
    background-color: ${ORANGE_UNSELECTED};
`;
export const ORANGE0_BACKGROUND = css`
    background-color: ${ORANGE0};
`;
export const ORANGE1_BACKGROUND = css`
    background-color: ${ORANGE1};
`;
export const ORANGE2_BACKGROUND = css`
    background-color: ${ORANGE2};
`;
export const ORANGE3_BACKGROUND = css`
    background-color: ${ORANGE3};
`;
export const MANDARIN1_BACKGROUND = css`
    background-color: ${MANDARIN1};
`;
export const MANDARIN2_BACKGROUND = css`
    background-color: ${MANDARIN2};
`;
export const RED1_BACKGROUND = css`
    background-color: ${RED1};
`;
export const RED2_BACKGROUND = css`
    background-color: ${RED2};
`;
export const RED3_BACKGROUND = css`
    background-color: ${RED3};
`;

export const TEXT_ELLIPSIS = css`
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const TEXT_HIDDEN = css`
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: hidden;
`;
// line clamp에 변수를 넣을 수 있다면!
export const TEXT_ELLIPSIS_LINE_CLAMP_3 = css`
    word-wrap: break-word;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

export const ABSOLUTE_CENTER = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const ABSOLUTE_COVER = css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;
