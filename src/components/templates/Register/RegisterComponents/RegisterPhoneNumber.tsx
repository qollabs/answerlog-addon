import axios from 'axios';
import Router, { useRouter } from 'next/router';

import { Button } from '@Atoms/Button';
import { TextField } from '@Atoms/TextField/TextField';
import { Text } from '@Atoms/Typography';
import { useInput } from '@Hooks/useInput';
import { useRequest } from '@Hooks/useRequest';
import { useSessionstorage } from '@Hooks/useSessionStorage';
import { BottomButtonContainer } from '@Organisms/MainLayout';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
    RegisterContainer,
    RegisterContentContainer,
    RegisterHeadContainer,
} from '../Register.styled';
import { AppContext } from '@Pages/_app';
import { Gap } from '@Styles/App.styled';
import { useLocalstorage } from '@Hooks/useLocalStorage';
import { Link } from '@Atoms/Link';
import { CountryCodeType, IUser } from '@Types/types';
import { Select, SelectValue } from '@Molecules/Select/Select';
import {
    countryCodeReverseTranslator,
    countryCodeTranslator,
} from '@Functions/codeTranslator';
import { countryNames } from 'constants/globalConstants';
import { useFlutter } from '@Hooks/useFlutter';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface RegisterPhoneNumberProp {
    goNextStep: (nextStep?: number) => void;
}

export const RegisterPhoneNumber = ({
    goNextStep,
}: RegisterPhoneNumberProp) => {
    const router = useRouter();
    const { getFcmToken } = useFlutter();

    const [accessToken, setAccessToken] =
        useLocalstorage<string>('accessToken');
    const [refreshToken, setRefreshToken] =
        useLocalstorage<string>('refreshToken');
    const [appleIdBeforeLogin, setAppleIdBeforeLogin] =
        useSessionstorage<string>('appleIdBeforeLogin');

    // TODO: 숫자먄 입력
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] =
        useState<SelectValue>('대한민국 (82)');
    const [selectedCountryCode, setSelectedCountryCode] =
        useState<CountryCodeType>('82');
    const [phoneNumber, onChangePhoneNumber, setPhoneNumber] = useInput('');
    const [showAuthInput, setShowAuthInput] = useState<boolean>(false);
    const [authNumber, onChangeAuthNumber, setAuthNumber] = useInput('');

    const [errMessage, setErrMessage] = useState<string>('');

    // make countries from countryNames
    useEffect(() => {
        let countriesTemp: string[] = [];
        countryNames.forEach((each, i) => {
            let newCountryToBePushed = `${each} (${countryCodeReverseTranslator(
                each,
            )})`;
            countriesTemp.push(newCountryToBePushed);
        });
        setCountries(countriesTemp);
    }, []);

    // extract selected country code out of selectedCountry
    useEffect(() => {
        if (!selectedCountry) return;
        let selectedCountryCodeTemp = selectedCountry.slice(
            selectedCountry.indexOf('(') + 1,
            selectedCountry.indexOf(')'),
        );
        setSelectedCountryCode(selectedCountryCodeTemp as CountryCodeType);
    }, [selectedCountry]);

    const getAuthNumber = async () => {
        setErrMessage('');
        setAuthNumber('');
        if (
            phoneNumber === process.env.NEXT_PUBLIC_TEST_ID_ONE ||
            phoneNumber === process.env.NEXT_PUBLIC_TEST_ID_TWO
        ) {
            await testUserDirectLogin();
            return;
        }
        const resGetAuth = await axios.get('/api/auth/verify', {
            params: {
                phone_number: phoneNumber,
                country_code: selectedCountryCode,
            },
        });
        if (resGetAuth) {
            setShowAuthInput(true);
        }
    };

    const testUserDirectLogin = async () => {
        const resAdmin = await axios.post('/api/auth/verify_admin', {
            phone_number: phoneNumber,
        });
        setAccessToken(resAdmin.data.access_token);
        setRefreshToken(resAdmin.data.refresh_token);
        window.location.href = '/';
    };

    const checkAuthNumber = async () => {
        const verifyInfo = {
            phone_number: phoneNumber,
            country_code: selectedCountryCode,
            code: authNumber,
            apple_id: appleIdBeforeLogin,
        };
        try {
            const resPostAuth = await axios.post(
                '/api/auth/verify',
                verifyInfo,
            );
            setAccessToken(resPostAuth.data.access_token);
            setRefreshToken(resPostAuth.data.refresh_token);

            // flutter
            getFcmToken(resPostAuth.data.access_token);
            window.location.href = '/';
        } catch (e) {
            console.log(e);
            setErrMessage('잘못된 인증번호 입니다. 다시 확인해주세요.');
        }
    };

    const handleChangeAuthNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setErrMessage('');
        onChangeAuthNumber(e);
    };

    return (
        <RegisterContainer>
            <RegisterHeadContainer>
                <Text size="h1">전화번호를 알려주세요</Text>
                <Gap height="16px" />
                <Text size="c1" color="gray4">
                    전화번호는 앤서록 로그인 아이디로 사용되며,
                </Text>
                <Text size="c1" color="gray4">
                    회원가입시 앤서록의{' '}
                    <Link href="/policy/terms">
                        <Text size="c1" color="orange2">
                            이용약관,{' '}
                        </Text>
                    </Link>
                    <Link href="/policy/privacy">
                        <Text size="c1" color="orange2">
                            개인정보 처리방침
                        </Text>
                    </Link>
                    에 동의하게 됩니다.
                </Text>
            </RegisterHeadContainer>

            <RegisterContentContainer>
                <Select
                    label="국가"
                    list={countries}
                    selected={selectedCountry}
                    setSelected={setSelectedCountry}
                />
                <Gap height="16px" />
                <TextField
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                    label="전화번호"
                    placeholder="01012345678"
                    width="100%"
                    isNumeric
                />
                <Gap height="16px" />
                {showAuthInput && (
                    <TextField
                        value={authNumber}
                        onChange={handleChangeAuthNumber}
                        label="인증 번호"
                        helpMessage="문자로 안내 받은 숫자 6개를 입력해주세요"
                        width="100%"
                        supportButton={
                            <div onClick={getAuthNumber}>
                                <Text color="mandarin2" size="c1">
                                    다시 받기
                                </Text>
                            </div>
                        }
                        isNumeric
                    />
                )}
                {!showAuthInput && (
                    <Button
                        onClickButton={getAuthNumber}
                        color="mandarin"
                        shape="square"
                        disabled={phoneNumber?.length === 0}
                    >
                        인증 번호 받기
                    </Button>
                )}
                <Text color="orange3">{errMessage}</Text>
            </RegisterContentContainer>

            <BottomButtonContainer>
                <Button
                    onClickButton={checkAuthNumber}
                    disabled={authNumber.length !== 6}
                >
                    다음
                </Button>
            </BottomButtonContainer>
        </RegisterContainer>
    );
};
