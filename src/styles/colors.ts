export const BLACK = '#2B2926';
export const WHITE = '#ffffff';
export const GRAY0 = '#F6F6F6';
export const GRAY1 = '#ECECEC';
export const GRAY2 = '#D1D1D1';
export const GRAY3 = '#B2B2B2';
export const GRAY4 = '#999999';
export const GRAY5 = '#666666';
export const YELLOW0 = '#FCF9F4';
export const YELLOW1 = '#FEFAF1';
export const YELLOW2 = '#FFF1C6';
export const YELLOW3 = '#E38800';
export const ORANGE_UNSELECTED = '#F7D8CC';
export const ORANGE0 = '#FFFAF9';
export const ORANGE1 = '#FFF2ED';
export const ORANGE2 = '#FF671E';
export const ORANGE3 = '#B95938';
export const MANDARIN1 = '#FFDDBD';
export const MANDARIN2 = '#F39D4D';
export const RED1 = '#FBB7B2';
export const RED2 = '#E7564C';
export const RED3 = '#C92C21';

export type ColorType =
    | 'black'
    | 'white'
    | 'gray0'
    | 'gray1'
    | 'gray2'
    | 'gray3'
    | 'gray4'
    | 'gray5'
    | 'yellow0'
    | 'yellow1'
    | 'yellow2'
    | 'yellow3'
    | 'orange-unselected'
    | 'orange0'
    | 'orange1'
    | 'orange2'
    | 'orange3'
    | 'mandarin1'
    | 'mandarin2'
    | 'red1'
    | 'red2'
    | 'red3';

export const colorPicker = (color: ColorType | undefined) => {
    switch (color) {
        case 'gray0':
            return GRAY0;
        case 'gray1':
            return GRAY1;
        case 'gray2':
            return GRAY2;
        case 'gray3':
            return GRAY3;
        case 'gray4':
            return GRAY4;
        case 'gray5':
            return GRAY5;
        case 'yellow0':
            return YELLOW0;
        case 'yellow1':
            return YELLOW1;
        case 'yellow2':
            return YELLOW2;
        case 'yellow3':
            return YELLOW3;
        case 'orange-unselected':
            return ORANGE_UNSELECTED;
        case 'orange0':
            return ORANGE0;
        case 'orange1':
            return ORANGE1;
        case 'orange2':
            return ORANGE2;
        case 'orange3':
            return ORANGE3;
        case 'mandarin1':
            return MANDARIN1;
        case 'mandarin2':
            return MANDARIN2;
        case 'red1':
            return RED1;
        case 'red2':
            return RED2;
        case 'red3':
            return RED3;
        case 'white':
            return WHITE;
        case 'black':
        default:
            return BLACK;
    }
};
