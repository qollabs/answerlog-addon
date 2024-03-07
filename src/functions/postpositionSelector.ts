type PostpositionType =
    | '은는'
    | '이가'
    | '과와'
    | '을를'
    | '으로'
    | '이라고'
    | '이에요';

export const endWithConsonant = (word: string): boolean => {
    if (!word) return false;
    // 마지막 문자 선택
    const lastSyllableUnicode = word.charCodeAt(word.length - 1);
    // 한국어인지 체크
    if (lastSyllableUnicode < 44032 || lastSyllableUnicode > 55203) {
        // throw new Error('한국어가 아닙니다');
        return true;
    } else {
        // 받침 유무 체크
        return (lastSyllableUnicode - 44032) % 28 !== 0;
    }
};

export const postpositionSelector = (
    word: string,
    postposition: PostpositionType = '은는',
): string => {
    let selected: string = '';
    switch (postposition) {
        case '은는':
        default:
            selected = endWithConsonant(word) ? '은' : '는';
            break;
        case '이가':
            selected = endWithConsonant(word) ? '이' : '가';
            break;
        case '과와':
            selected = endWithConsonant(word) ? '과' : '와';
            break;
        case '을를':
            selected = endWithConsonant(word) ? '을' : '를';
            break;
        case '으로':
            selected = endWithConsonant(word) ? '으로' : '로';
            break;
        case '이라고':
            selected = endWithConsonant(word) ? '이라고' : '라고';
            break;
        case '이에요':
            selected = endWithConsonant(word) ? '이에요' : '에요';
            break;
    }

    return word + selected;
};

export const postpositionSelectorOnly = (
    word: string,
    postposition: PostpositionType = '은는',
): string => {
    let selected: string = '';
    switch (postposition) {
        case '은는':
        default:
            selected = endWithConsonant(word) ? '은' : '는';
            break;
        case '이가':
            selected = endWithConsonant(word) ? '이' : '가';
            break;
        case '과와':
            selected = endWithConsonant(word) ? '과' : '와';
            break;
        case '을를':
            selected = endWithConsonant(word) ? '을' : '를';
            break;
        case '으로':
            selected = endWithConsonant(word) ? '으로' : '로';
            break;
        case '이라고':
            selected = endWithConsonant(word) ? '이라고' : '라고';
            break;
        case '이에요':
            selected = endWithConsonant(word) ? '이에요' : '에요';
            break;
    }

    return selected;
};

// (끝단어 유니코드 - 한글시작점(가) 유니코드)/28 = 나누어 떨어지면 받침 없음/ 안떨어지면 받침 있음
