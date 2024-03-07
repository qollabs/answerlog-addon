import { Button } from '@Atoms/Button';
import { Radio, RadioValue } from '@Atoms/Radio';
import { TextField } from '@Atoms/TextField/TextField';
import { Text } from '@Atoms/Typography';
import { OnChangeFunctionType, useInput } from '@Hooks/useInput';
import { BottomButtonContainer } from '@Organisms/MainLayout';
import { Gap } from '@Styles/App.styled';
import { ChangeEventHandler } from 'react';
import {
    OnboardingContainer,
    OnboardingContentContainer,
    OnboardingGenderContainer,
    OnboardingHeadContainer,
} from '../Onboarding.styled';
import { genderOptions } from '@Constants/globalConstants';

interface OnboardingNameProp {
    name: string;
    onChangeName: ChangeEventHandler<HTMLInputElement>;
    gender: RadioValue;
    setGender: (gender: RadioValue) => void;
    goNextStep: (nextStep?: number) => void;
}

export const OnboardingName = ({
    name,
    onChangeName,
    gender,
    setGender,
    goNextStep,
}: OnboardingNameProp) => {
    return (
        <OnboardingContainer>
            <OnboardingHeadContainer>
                <Text size="h1">이름을 알려주세요</Text>
                <Gap height="16px" />
                <Text size="b1" color="gray4">
                    10글자 이내로 적어주세요. <br />
                    알려주시는 이름으로 불러드릴게요!
                </Text>
            </OnboardingHeadContainer>

            <OnboardingContentContainer>
                <TextField
                    value={name}
                    onChange={onChangeName}
                    label="이름"
                    placeholder="홍길동"
                    width="100%"
                    maxTextLength={10}
                />
                <Gap height="32px" />
                <OnboardingGenderContainer>
                    <Text size="b2" color="gray4">
                        성별
                    </Text>
                    <Gap height="8px" />
                    {genderOptions.map((option) => (
                        <>
                            <Radio
                                label={option.label}
                                value={option.value}
                                selectedValue={gender}
                                setSelectedValue={setGender}
                            />
                            <Gap height="8px" />
                        </>
                    ))}
                </OnboardingGenderContainer>
            </OnboardingContentContainer>

            <BottomButtonContainer>
                <Button
                    onClickButton={() => goNextStep()}
                    disabled={!(name?.length > 0 && gender !== '')}
                >
                    다음
                </Button>
            </BottomButtonContainer>
        </OnboardingContainer>
    );
};
