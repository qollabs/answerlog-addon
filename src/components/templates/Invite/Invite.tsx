import { ChangeEvent, useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { useRequest } from '@Hooks/useRequest';
import CaretDownIcon from '@Images/icons/caret_down.svg';
import { Button } from '@Atoms/Button';
import { TextField } from '@Atoms/TextField/TextField';
import { Text } from '@Atoms/Typography';
import { useInput } from '@Hooks/useInput';
import { BottomButtonContainer, MainLayout } from '@Organisms/MainLayout';
import {
    InviteBackButtonContainer,
    InviteContainer,
    InviteContentContainer,
    InviteHeadContainer,
    InviteRelationImageBox,
    InviteRelationImageContainer,
    InviteRelationButtonContainer,
    InviteRelationSelectButton,
    InviteRelationSelectContainer,
    InviteRelationTitleBox,
} from './Invite.styled';
import { BottomDrawer } from '@Molecules/BottomDrawer';
import { Gap } from '@Styles/App.styled';
import { Select } from '@Molecules/Select';
import {
    countryNames,
    relationLabels,
    relationOptions,
    relationTypeOptions,
    relationValues,
} from '@Constants/globalConstants';
import { SelectValue } from '@Molecules/Select/Select';
import { AppContext } from '@Pages/_app';
import { countryCodeReverseTranslator } from '@Functions/codeTranslator';
import * as ga from '../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { GRAY3 } from '@Styles/colors';
import {
    inverseRelationArray,
    relationArrayByType,
} from '@Functions/relationTranslator';

export const Invite = () => {
    const { request } = useRequest();
    const { actionOnTouchEnd } = useActionOnTouch();

    const { myPhoneNumber } = useContext(AppContext);
    const [countryName, setCountryName] = useState<SelectValue>('대한민국');
    const [phoneNumber, onChangePhoneNumber] = useInput('');
    const [relationType, setRelationType] = useState(0);
    const [relationMe, setRelationMe] = useState('');
    const [relationYou, setRelationYou] = useState('');
    const [showRelationSelectBottomDrawer, setShowRelationSelectBottomDrawer] =
        useState<boolean>(false);
    const [relationSelectTitle, setRelationSelectTitle] = useState('');
    const [relationSelectStep, setRelationSelectStep] = useState<number>(0);
    const [overlappedUserError, setOverlappedUserError] =
        useState<boolean>(false);

    // set bottom drawer title
    useEffect(() => {
        switch (relationSelectStep) {
            case 0:
            default:
                setRelationSelectTitle('나와 상대방은 어떤 관계인가요?');
                break;
            case 1:
                setRelationSelectTitle('나는 누구인가요?');
                break;
            case 2:
                setRelationSelectTitle('상대방은 누구인가요?');
                break;
        }
    }, [relationSelectStep]);

    const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
        onChangePhoneNumber(e);
        setOverlappedUserError(false);
    };

    const sendInvitation = async () => {
        const result = await request({
            url: '/api/user/invite',
            method: 'POST',
            data: {
                country_code: countryCodeReverseTranslator(
                    countryName as string,
                ),
                phone_number: phoneNumber,
                relation: relationYou,
                inverse_relation: relationMe,
            },
        });
        if (result) {
            ga.event({
                action: 'send_invitation',
                params: {
                    linked_user_relationship: relationYou,
                    user_relationship: relationMe,
                },
            });
            Router.push('/waiting');
        } else {
            setOverlappedUserError(true);
        }
    };

    const selectRelationType = (type: number) => {
        setRelationType(type);
        setRelationSelectStep(1);
    };

    const selectMyRelation = (value: string) => {
        setRelationMe(value);
        setRelationSelectStep(2);
    };
    const selectYourRelation = (value: string) => {
        setRelationYou(value);
        setShowRelationSelectBottomDrawer(false);
    };
    const resetRelation = () => {
        if (relationSelectStep === 2) {
            setRelationYou('');
            setRelationSelectStep(1);
        } else if (relationSelectStep === 1) {
            setRelationMe('');
            setRelationYou('');
            setRelationSelectStep(0);
        }
    };

    return (
        <MainLayout
            title=""
            showLogo
            hideBottomNav
            hideActionIcons
            whiteBackground
        >
            <InviteContainer>
                <InviteHeadContainer>
                    <Text size="h1">가족을 초대해주세요</Text>
                    <Gap height="12px" />
                    <Text size="b1" color="gray4">
                        함께 앤서록해요 :)
                    </Text>
                </InviteHeadContainer>
                <InviteContentContainer>
                    <Select
                        label="국가"
                        list={countryNames}
                        selected={countryName}
                        setSelected={setCountryName}
                    />
                    <Gap height="16px" />
                    <TextField
                        value={phoneNumber}
                        onChange={handleChangePhoneNumber}
                        label="전화번호"
                        placeholder="01012345678"
                        width="100%"
                        isNumeric
                        status={
                            phoneNumber === myPhoneNumber || overlappedUserError
                                ? 'error'
                                : 'default'
                        }
                        errorMessage={
                            overlappedUserError
                                ? '이미 초대하셨어요'
                                : '나의 전화번호와 같아요'
                        }
                    />
                    <Gap height="16px" />
                    <InviteRelationSelectContainer>
                        <Text size="b2" color="gray4">
                            관계
                        </Text>
                        <Gap height="8px" />
                        <InviteRelationSelectButton
                            onClick={() =>
                                setShowRelationSelectBottomDrawer(true)
                            }
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    setShowRelationSelectBottomDrawer(true),
                                )
                            }
                        >
                            {relationMe || relationYou ? (
                                <Text color="black">
                                    {`${relationMe} (나)`} -{' '}
                                    {`${relationYou} (상대)`}
                                </Text>
                            ) : (
                                <Text color="gray2">
                                    상대와의 관계를 알려주세요
                                </Text>
                            )}
                            <CaretDownIcon color={GRAY3} />
                        </InviteRelationSelectButton>
                    </InviteRelationSelectContainer>
                </InviteContentContainer>

                <BottomButtonContainer>
                    <Button
                        onClickButton={sendInvitation}
                        disabled={
                            !(phoneNumber && relationMe && relationYou) ||
                            phoneNumber === myPhoneNumber
                        }
                    >
                        초대장 보내기
                    </Button>
                </BottomButtonContainer>
            </InviteContainer>

            <BottomDrawer
                show={showRelationSelectBottomDrawer}
                onClose={() => setShowRelationSelectBottomDrawer(false)}
                closeOnClickOutside
            >
                {relationSelectStep > 0 && (
                    <>
                        <InviteRelationImageContainer>
                            <InviteRelationImageBox
                                active={relationSelectStep === 1}
                            >
                                <Text>나</Text>
                            </InviteRelationImageBox>
                            <Gap width="16px" />
                            <InviteRelationImageBox
                                active={relationSelectStep === 2}
                            >
                                <Text>상대</Text>
                            </InviteRelationImageBox>
                        </InviteRelationImageContainer>
                        <Gap height="16px" />
                    </>
                )}
                <InviteRelationTitleBox>
                    <Text size="h2">{relationSelectTitle}</Text>
                    <Gap height="32px" />
                </InviteRelationTitleBox>
                {relationSelectStep === 0 && (
                    <InviteRelationButtonContainer>
                        {relationTypeOptions.map((option, i) => (
                            <Button
                                color="pink"
                                onClickButton={() =>
                                    selectRelationType(option.value)
                                }
                            >
                                {option.label}
                            </Button>
                        ))}
                    </InviteRelationButtonContainer>
                )}
                {relationSelectStep === 1 && (
                    <InviteRelationButtonContainer>
                        {relationArrayByType(relationType).map(
                            (relation, i) => (
                                <Button
                                    color="pink"
                                    onClickButton={() =>
                                        selectMyRelation(relation)
                                    }
                                >
                                    {relation}
                                </Button>
                            ),
                        )}
                    </InviteRelationButtonContainer>
                )}
                {relationSelectStep === 2 && (
                    <InviteRelationButtonContainer>
                        {inverseRelationArray(relationMe).map((relation, i) => (
                            <Button
                                color="pink"
                                onClickButton={() =>
                                    selectYourRelation(relation)
                                }
                            >
                                {relation}
                            </Button>
                        ))}
                    </InviteRelationButtonContainer>
                )}
                {relationSelectStep > 0 && (
                    <InviteBackButtonContainer>
                        <Button
                            onClickButton={() => resetRelation()}
                            color="gray"
                        >
                            뒤로 가기
                        </Button>
                    </InviteBackButtonContainer>
                )}
            </BottomDrawer>
        </MainLayout>
    );
};
