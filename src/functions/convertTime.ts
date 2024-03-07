type convertTimeOptionType =
    | 'date'
    | 'hour'
    | 'minute'
    | 'second'
    | 'dashedDate'
    | 'dotDate'
    | 'slashedDate'
    | 'yymmdd'
    | 'yymmddhhmmss'
    | 'onlyMonthDate'
    | 'fulldotDateTime';

type convertTimeIntevalType = 'minute' | 'second';

export const convertTime = (
    timeInput?: Date | string,
    option: convertTimeOptionType = 'minute',
): string => {
    if (!timeInput) return '';
    timeInput = timeInput.toString().replace('+00:00', '+09:00');
    const time = new Date(timeInput);
    const year = time.getFullYear();
    const month = `0${time.getMonth() + 1}`.slice(-2);
    const date = `0${time.getDate()}`.slice(-2);
    const hour = time.getHours();
    const minute = `0${time.getMinutes()}`.slice(-2);
    const second = `0${time.getSeconds()}`.slice(-2);

    const handleTime = (option: convertTimeOptionType) => {
        switch (option) {
            case 'date':
                return `${year}년 ${month}월 ${date}일`;
            case 'hour':
                return `${year}년 ${month}월 ${date}일 ${hour}시`;
            default:
            case 'minute':
                return `${year}년 ${month}월 ${date}일 ${`0${hour}`.slice(
                    -2,
                )}:${minute}`;
            case 'second':
                return `${year}년 ${month}월 ${date}일 ${`0${hour}`.slice(
                    -2,
                )}:${minute}:${second}`;
            case 'dashedDate':
                return `${year}-${month}-${date}`;
            case 'dotDate':
                return `${year}.${month}.${date}`;
            // ios의 경우 dashed-date를 이용해 new Date() 객체를 만들 때 NaN 이 될 수 있다.
            case 'slashedDate':
                return `${year}/${month}/${date}`;
            case 'yymmdd':
                return `${year}`.slice(-2) + `${month}${date}`;
            case 'yymmddhhmmss':
                return `${`${year}`.slice(-2)}${month}${date}${`0${hour}`.slice(
                    -2,
                )}${minute}${second}`;
            case 'onlyMonthDate':
                return `${month}월 ${date}일`;
            case 'fulldotDateTime':
                return `${year}.${month}.${date}. ${`0${hour}`.slice(
                    -2,
                )}:${minute}`;
        }
    };

    return handleTime(option);
};

type TargetYearType = 'inherit' | 'right-next';

export const dDayCounter = (timeInput: string | Date, year: TargetYearType) => {
    const now = new Date(convertTime(new Date(), 'slashedDate'));
    const inputDate = new Date(convertTime(new Date(timeInput), 'slashedDate'));
    let targetFullDate: Date;
    if (year === 'right-next') {
        // 바로 돌아오는 생일
        let targetMonth = inputDate.getMonth() + 1;
        let targetDate = inputDate.getDate();
        let targetYear: number = 0;
        if (now.getMonth() > inputDate.getMonth()) {
            // 올해 생일이 지난 경우(달도 지남)
            targetYear = now.getFullYear() + 1;
        } else if (
            // 올해 생일이 지난 경우(날짜만 지나고 달은 같음)
            now.getMonth() === inputDate.getMonth() &&
            now.getDate() > inputDate.getDate()
        ) {
            targetYear = now.getFullYear() + 1;
        } else {
            targetYear = now.getFullYear();
        }
        targetFullDate = new Date(
            convertTime(
                new Date(`${targetYear}/${targetMonth}/${targetDate}`),
                'slashedDate',
            ),
        );
    } else {
        // 내장된 년도로
        targetFullDate = inputDate;
    }
    const timeDifference = targetFullDate.getTime() - now.getTime();
    return Math.abs(timeDifference / (1000 * 24 * 60 * 60));
};

export const ageCalculator = (birth: string | Date): number => {
    if (typeof birth === 'string') {
        birth = new Date(birth);
    }
    var birthYear = birth.getFullYear();
    var birthMonth = birth.getMonth();
    var birthDay = birth.getDate();

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();

    var age = currentYear - birthYear;

    if (currentMonth < birthMonth) {
        age--;
    } else if (currentMonth === birthMonth && currentDay < birthDay) {
        age--;
    }

    return age;
};

export const twoDigitsMaker = (number: number) => {
    const numberTrimmed = Math.floor(number);
    if (numberTrimmed > 9) {
        return numberTrimmed.toString();
    } else {
        return `0${numberTrimmed}`;
    }
};

type ConvertSecondsTargetType = 'hours' | 'minutes';
export const convertSeconds = (
    seconds: number,
    target: ConvertSecondsTargetType = 'minutes',
) => {
    const secondsTrimmed = Math.floor(seconds);
    let result: string = '';
    switch (target) {
        case 'minutes':
            result = `${twoDigitsMaker(
                Math.floor(secondsTrimmed / 60),
            )} : ${twoDigitsMaker(secondsTrimmed % 60)}`;
            break;
    }
    return result;
};
