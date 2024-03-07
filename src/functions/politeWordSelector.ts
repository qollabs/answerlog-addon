import { postpositionSelectorOnly } from './postpositionSelector';

type PoliteWordType = '께서' | '생신' | 'ㅇㅇ시';

export const politeWordSelector = (
    targetWord: string,
    politeWord: PoliteWordType = 'ㅇㅇ시',
): string => {
    switch (politeWord) {
        case '께서':
            return targetWord === '아빠' || targetWord === '엄마'
                ? '께서'
                : postpositionSelectorOnly(targetWord, '이가');
        case '생신':
            return targetWord === '아빠' || targetWord === '엄마'
                ? '생신'
                : '생일';
        case 'ㅇㅇ시':
        default:
            return targetWord === '아빠' || targetWord === '엄마' ? '시' : '';
    }
};
