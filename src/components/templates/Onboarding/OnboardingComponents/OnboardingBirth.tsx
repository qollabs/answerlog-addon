import { Button } from '@Atoms/Button';
import { TextField } from '@Atoms/TextField/TextField';
import { Text } from '@Atoms/Typography';
import { isValidDate } from '@Functions/validityChecks';
import { useDateDayInput } from '@Hooks/useDateDayInput';
import { BottomButtonContainer } from '@Organisms/MainLayout';
import { Gap } from '@Styles/App.styled';
import { ChangeEvent, MouseEventHandler, useState, useEffect } from 'react';
import {
    OnboardingBirthDateContainer,
    OnboardingBirthInputContainer,
    OnboardingBirthMonthContainer,
    OnboardingBirthYearContainer,
    OnboardingContainer,
    OnboardingContentContainer,
    OnboardingHeadContainer,
} from '../Onboarding.styled';
import {
    formatFullDate,
    onChangeInputDate,
    onChangeInputMonth,
    onChangeInputYear,
} from '@Functions/onChangeInput';

interface OnboardingBirthProp {
    birth: string;
    setBirth: (birth: string) => void;
    goNextStep: (nextStep?: number) => void;
}

export const OnboardingBirth = ({
    birth,
    setBirth,
    goNextStep,
}: OnboardingBirthProp) => {
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const [validLength, setValidLength] = useState(true);
    const [validBirth, setValidBirth] = useState(true);

    useEffect(() => {
        if (!birthYear && !birthMonth && !birthDate) {
            let year = birth.slice(0, 4);
            let month = birth.slice(4, 6);
            let date = birth.slice(6, 8);
            setBirthYear(year);
            setBirthMonth(month);
            setBirthDate(date);
        }
    }, [birth]);
    // birth inputs control
    useEffect(() => {
        if (birthYear && birthMonth && birthDate) {
            setIsEmpty(false);
            let birthTemp = `${birthYear}${birthMonth}${birthDate}`;
            setValidBirth(isValidDate(formatFullDate(birthTemp)));
            setValidLength(birthTemp.length === 8);
            setBirth(birthTemp);
        } else {
            setIsEmpty(true);
        }
    }, [birthYear, birthMonth, birthDate]);
    return (
        <OnboardingContainer>
            <OnboardingHeadContainer>
                <Text size="h1">생일을 알려주세요</Text>
                <Gap height="16px" />
                <Text size="b1" color="gray4">
                    생일을 누구보다 열심히 축하해 드릴게요!
                </Text>
            </OnboardingHeadContainer>

            <OnboardingContentContainer>
                <OnboardingBirthInputContainer>
                    <OnboardingBirthYearContainer>
                        <TextField
                            value={birthYear}
                            onChange={(e) => onChangeInputYear(e, setBirthYear)}
                            placeholder="1991"
                            style={{ textAlign: 'center' }}
                            isNumeric
                        />
                        <Gap width="4px" />
                        <Text>년</Text>
                        <Gap width="4px" />
                    </OnboardingBirthYearContainer>
                    <OnboardingBirthMonthContainer>
                        <TextField
                            value={birthMonth}
                            onChange={(e) =>
                                onChangeInputMonth(e, setBirthMonth)
                            }
                            placeholder="12"
                            style={{ textAlign: 'center' }}
                            isNumeric
                        />
                        <Gap width="4px" />
                        <Text>월</Text>
                        <Gap width="4px" />
                    </OnboardingBirthMonthContainer>
                    <OnboardingBirthDateContainer>
                        <TextField
                            value={birthDate}
                            onChange={(e) => onChangeInputDate(e, setBirthDate)}
                            placeholder="20"
                            style={{ textAlign: 'center' }}
                            isNumeric
                        />
                        <Gap width="4px" />
                        <Text>일</Text>
                        <Gap width="4px" />
                    </OnboardingBirthDateContainer>
                </OnboardingBirthInputContainer>
                <Gap height="32px" />
                {(!validLength || !validBirth) && !isEmpty && (
                    <Text color="orange3">유효하지 않은 날짜에요</Text>
                )}
                {birthYear && birthYear.length < 4 && (
                    <Text color="orange3">
                        연도는 네 자리 모두 입력해 주세요(예: 1991)
                    </Text>
                )}
            </OnboardingContentContainer>

            <BottomButtonContainer>
                <Button
                    onClickButton={() => goNextStep()}
                    disabled={!validLength || !validBirth || isEmpty}
                >
                    다음
                </Button>
            </BottomButtonContainer>
        </OnboardingContainer>
    );
};
