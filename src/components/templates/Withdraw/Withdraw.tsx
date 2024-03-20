import { MainLayout } from '@Organisms/MainLayout';
import {
    WithdrawContainer,
    WithdrawContentContainer,
    WithdrawTitleContainer,
} from './Withdraw.styled';
import { Gap } from '@Styles/App.styled';
import { Text } from '@Atoms/Typography';
import AnswerlogIconLogo from '@Images/logos/answerlog_icon.svg';
import { PatchBundle } from '@Organisms/PatchBundle';
import { TextField } from '@Atoms/TextField';
import { Select } from '@Molecules/Select';
import { countryNames } from '@Constants/globalConstants';
import { useState } from 'react';
import { useInput } from '@Hooks/useInput';
import { Button } from '@Atoms/Button';
import axios from 'axios';
import { countryCodeReverseTranslator } from '@Functions/codeTranslator';
import { CountryCodeType } from '@Types/types';
import { BaseModal } from '@Molecules/BaseModal';

interface ResPostAuth {
    access_token: string | null;
    refresh_token: string | null;
    done_onboarding: boolean;
}

export const Withdraw = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(
        '대한민국',
    );
    const [phoneNumber, onChangePhoneNumber, setPhoneNumber] = useInput('');
    const [showAuthInput, setShowAuthInput] = useState(false);
    const [authNumber, onChangeAuthNumber, setAuthNumber] = useInput('');
    const [withdrawRequestError, setWithdrawRequestError] = useState(false);
    const [hasNoAccount, setHasNoAccount] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [doneWithdrawal, setDoneWithdrawal] = useState(false);

    const getAuthNumber = async () => {
        setHasNoAccount(false);
        setWithdrawRequestError(false);
        setAuthNumber('');

        const resGetAuth = await axios.get('/api/auth/verify', {
            params: {
                phone_number: phoneNumber,
                country_code: countryCodeReverseTranslator(
                    selectedCountry || '',
                ),
            },
        });
        if (resGetAuth) {
            setShowAuthInput(true);
        } else {
            setShowAuthInput(false);
        }
    };

    const checkAccountAndWithdraw = async () => {
        setLoadingRequest(true);
        try {
            const resPostAuth = await axios.post('/api/auth/verify', {
                phone_number: phoneNumber,
                country_code: countryCodeReverseTranslator(
                    selectedCountry || '',
                ),
                code: authNumber,
                apple_id: null,
            });

            const resPostAuthData: ResPostAuth = resPostAuth.data;
            const accessToken = resPostAuthData.access_token;
            const doneOnboarding = resPostAuthData.done_onboarding;

            const resWithdraw = await axios.delete('api/user', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!doneOnboarding) {
                setHasNoAccount(true);
                setShowAuthInput(false);
            } else {
                setDoneWithdrawal(true);
            }
        } catch (e) {
            console.log(e);
            setWithdrawRequestError(true);
            setDoneWithdrawal(false);
        }
        setLoadingRequest(false);
    };

    return (
        <MainLayout>
            <WithdrawContainer>
                <WithdrawTitleContainer>
                    <AnswerlogIconLogo width="24px" />
                    <Gap width="4px" />
                    <Text size="h2">앤서록 회원 탈퇴</Text>
                </WithdrawTitleContainer>
                <Gap height="16px" />
                {doneWithdrawal ? (
                    <WithdrawContentContainer>
                        <Text size="h3">탈퇴가 완료되었습니다</Text>
                        <Gap height="4px" />
                        <Text color="gray4">
                            지금까지 앤서록을 이용해주셔서 대산히 감사합니다.
                        </Text>
                        <Gap height="24px" />
                        <Button
                            onClickButton={() => {
                                window.location.href = '/';
                            }}
                        >
                            홈으로 가기
                        </Button>
                    </WithdrawContentContainer>
                ) : (
                    <WithdrawContentContainer>
                        <Text size="h3">전화번호를 알려주세요</Text>
                        <Gap height="4px" />
                        <Text color="gray4">
                            앤서록에 가입하면서 이용하신 전화번호가 있어야
                            원활한 탈퇴가 가능합니다.
                        </Text>
                        <Gap height="24px" />
                        <Select
                            list={countryNames}
                            selected={selectedCountry}
                            setSelected={setSelectedCountry}
                            label="국가"
                        />
                        <Gap height="16px" />
                        <TextField
                            value={phoneNumber}
                            onChange={(e) => {
                                setHasNoAccount(false);
                                onChangePhoneNumber(e);
                            }}
                            label="전화번호"
                            placeholder="01012345678"
                            status={hasNoAccount ? 'error' : 'default'}
                            errorMessage="앤서록 회원이 아닙니다"
                        />
                        <Gap height="24px" />
                        <Button
                            color="mandarin"
                            shape="square"
                            onClickButton={() => getAuthNumber()}
                        >
                            {showAuthInput
                                ? '인증 번호 다시 받기'
                                : '인증 번호 받기'}
                        </Button>
                        {showAuthInput && (
                            <>
                                <Gap height="24px" />
                                <TextField
                                    value={authNumber}
                                    onChange={(e) => {
                                        setWithdrawRequestError(false);
                                        onChangeAuthNumber(e);
                                    }}
                                    label="인증번호"
                                    placeholder="000000"
                                    helpMessage="문자로 안내 받은 숫자 6개를 입력해주세요"
                                    status={
                                        withdrawRequestError
                                            ? 'error'
                                            : 'default'
                                    }
                                    errorMessage="잘못된 인증번호입니다"
                                />
                                <Gap height="24px" />
                                <Button
                                    onClickButton={() =>
                                        checkAccountAndWithdraw()
                                    }
                                >
                                    탈퇴하기
                                </Button>
                            </>
                        )}
                    </WithdrawContentContainer>
                )}

                <Gap height="48px" />
                <PatchBundle />
            </WithdrawContainer>
            <BaseModal show={loadingRequest}>
                <Text>탈퇴 처리가 진행중입니다...</Text>
            </BaseModal>
        </MainLayout>
    );
};
