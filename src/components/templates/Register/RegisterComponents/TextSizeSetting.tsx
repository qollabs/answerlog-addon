import { Button } from '@Atoms/Button';
import { CheckBox, CheckBoxValue } from '@Atoms/CheckBox/CheckBox';
import { Radio, RadioValue } from '@Atoms/Radio';
import { Text } from '@Atoms/Typography';
import { BottomButtonContainer } from '@Organisms/MainLayout';
import { AppContext } from '@Pages/_app';
import { Gap } from '@Styles/App.styled';
import { TextSizePreferenceType } from '@Styles/fonts';
import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import {
    RegisterContainer,
    RegisterHeadContainer,
    TextSizeButtonContainer,
    TextSizeExampleBox,
    TextSizeSelectContainer,
} from '../Register.styled';
import { useSessionstorage } from '@Hooks/useSessionStorage';
import { TextSizePrefBeforeLoginType } from '@Types/types';

interface TextSizeSettingProp {
    goNextStep: (nextStep?: number) => void;
}

export const TextSizeSetting = ({ goNextStep }: TextSizeSettingProp) => {
    const [
        textSizePrefBeforeLogin,
        setTextSizePrefBeforeLogin,
        removeTextSizePrefBeforeLogin,
    ] = useSessionstorage<TextSizePrefBeforeLoginType>(
        'textSizePrefBeforeLogin',
        'none',
    );

    const [textSizePrefTemp, setTextSizePrefTemp] = useState<RadioValue>('');

    useEffect(() => {
        if (textSizePrefTemp !== '') {
            setTextSizePrefBeforeLogin(
                textSizePrefTemp as TextSizePreferenceType,
            );
        }
    }, [textSizePrefTemp]);

    return (
        <RegisterContainer>
            <RegisterHeadContainer>
                <Text size="h1" forcedTextPref="v1">
                    읽기 편한 글자 크기를 선택해주세요
                </Text>
                <Gap height="12px" />
                <Text size="b1" color="gray4" forcedTextPref="v1">
                    설정 &gt; 글씨 크기 변경에서 나중에 변경 가능합니다
                </Text>
            </RegisterHeadContainer>

            <TextSizeSelectContainer>
                <TextSizeExampleBox>
                    <Text>글자 크기는 이렇게 보일 거에요. 잘 보이시나요?</Text>
                </TextSizeExampleBox>
                <Gap height="32px" />
                <TextSizeButtonContainer>
                    <Radio
                        label="크게 보고싶어요"
                        value="v0"
                        forcedTextPref="v0"
                        selectedValue={textSizePrefTemp}
                        setSelectedValue={setTextSizePrefTemp}
                    />
                    <Gap height="16px" />
                    <Radio
                        label="이 정도면 괜찮아요"
                        value="v1"
                        forcedTextPref="v1"
                        selectedValue={textSizePrefTemp}
                        setSelectedValue={setTextSizePrefTemp}
                    />
                    <Gap height="16px" />
                    <Radio
                        label="작아도 괜찮아요"
                        value="v2"
                        forcedTextPref="v2"
                        selectedValue={textSizePrefTemp}
                        setSelectedValue={setTextSizePrefTemp}
                    />
                </TextSizeButtonContainer>
            </TextSizeSelectContainer>

            <BottomButtonContainer>
                <Button
                    onClickButton={() => goNextStep()}
                    disabled={textSizePrefTemp === ''}
                >
                    다음
                </Button>
            </BottomButtonContainer>
        </RegisterContainer>
    );
};
