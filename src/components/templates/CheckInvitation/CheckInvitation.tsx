import { useContext, useState } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import { useRouter } from 'next/router';
import { AppContext } from '@Pages/_app';
import { useRequest } from '@Hooks/useRequest';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import {
    CheckInvButtonContainer,
    CheckInvContainer,
    CheckInvEmptyContainer,
    CheckInvImageBox,
    CheckInvModalButtonContainer,
    CheckInvShakingBox,
} from './CheckInvitation.styled';
import { Text } from '@Atoms/Typography';
import { Fade } from '@Organisms/Fade';
import Image from 'next/image';
import LetterImage from '@Images/Letter_substitute.png';
import CheckImage from '@Images/Check.png';
import FailImage from '@Images/x_red.png';
import { IconButton } from '@Atoms/IconButton';
import { Gap } from '@Styles/App.styled';
import { Button } from '@Atoms/Button';
import { BaseModal } from '@Molecules/BaseModal';
import { useSessionstorage } from '@Hooks/useSessionStorage';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { RowContainer } from '@Atoms/RowContainer';

interface ReqUsersInvitedMeType {
    country_code: string;
    phone_number: string;
}

interface ResUsersInvitedMeType {
    id: string;
    name: string;
    country_code: string;
    phone_number: string;
    inverse_relation: string;
    relation: string;
}

interface ReqAcceptType {
    invited_user_id: string;
    accept: boolean;
}

export const CheckInvitation = () => {
    const { loading, request } = useRequest();
    const router = useRouter();
    const { id: targetId } = router.query;

    const { linkedUsers, myCountryCode, myPhoneNumber } =
        useContext(AppContext);

    const [usersInvitedMe, setUsersInvitedMe] = useState<
        ResUsersInvitedMeType[]
    >([]);
    const [step, setStep] = useState(0);
    const [isAccepted, setIsAccepted] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);

    // get and sort users invited me
    useAsyncEffect(async () => {
        if (!myCountryCode || !myPhoneNumber) return;
        const reqUsersInvitedMe: ReqUsersInvitedMeType = {
            country_code: myCountryCode,
            phone_number: myPhoneNumber,
        };
        const resUsersInvitedMe = await request({
            url: '/api/user/invites',
            method: 'GET',
            params: reqUsersInvitedMe,
        });
        if (resUsersInvitedMe) {
            if (targetId) {
                let resTemp: ResUsersInvitedMeType[] = resUsersInvitedMe.data;
                let usersInvitedMeTemp: ResUsersInvitedMeType[] = [];
                resTemp.forEach((each, i) => {
                    if (each.id === targetId) {
                        usersInvitedMeTemp.unshift(each);
                    } else {
                        usersInvitedMeTemp.push(each);
                    }
                });
                setUsersInvitedMe(usersInvitedMeTemp);
            } else {
                setUsersInvitedMe(resUsersInvitedMe.data);
            }
        }
    }, [myCountryCode, myPhoneNumber]);

    const confirmInvitation = async (willAccept: boolean) => {
        const reqAccept: ReqAcceptType = {
            invited_user_id: usersInvitedMe[step].id,
            accept: willAccept,
        };
        const resAccept = await request({
            url: '/api/user/accept',
            method: 'POST',
            data: reqAccept,
        });
        if (resAccept) {
            setIsAccepted(willAccept);
            setShowResultModal(true);
        }
    };

    const checkNextInvitation = () => {
        setStep(step + 1);
        setShowResultModal(false);
        setIsAccepted(false);
    };

    return (
        <MainLayout title="초대장 확인" hideBottomNav>
            {loading && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {!loading && usersInvitedMe.length === 0 && (
                <CheckInvEmptyContainer>
                    <Text>현재 보관중인 초대장이 없어요</Text>
                    <Gap height="16px" />
                    <RowContainer>
                        <Button
                            color="gray"
                            onClickButton={() => {
                                window.location.href = '/';
                            }}
                        >
                            홈으로 돌아가기
                        </Button>
                        <Gap width="8px" />
                        <Button onClickButton={() => router.push('/invite')}>
                            초대장 보내기
                        </Button>
                    </RowContainer>
                </CheckInvEmptyContainer>
            )}
            {!loading && usersInvitedMe.length > 0 && (
                <CheckInvContainer>
                    <Text color="gray4">
                        전화번호 뒤 4자리가{' '}
                        {usersInvitedMe[step]?.phone_number.slice(-4)}인 &#39;
                        {usersInvitedMe[step]?.name}(
                        {usersInvitedMe[step]?.inverse_relation}
                        )&#39;님께서 초대하였습니다!
                    </Text>
                    <Fade direction="">
                        <CheckInvShakingBox>
                            <CheckInvImageBox>
                                <Image
                                    src={LetterImage}
                                    alt=""
                                    width={160}
                                    height={160}
                                />
                            </CheckInvImageBox>
                        </CheckInvShakingBox>
                    </Fade>
                    <CheckInvButtonContainer>
                        <IconButton
                            onClickButton={() => confirmInvitation(false)}
                        >
                            <Text size="b2">제가 아니에요</Text>
                        </IconButton>
                        <Gap height="16px" />
                        <Button onClickButton={() => confirmInvitation(true)}>
                            제가 맞아요
                        </Button>
                    </CheckInvButtonContainer>
                </CheckInvContainer>
            )}

            <BaseModal
                show={showResultModal}
                customImage={isAccepted ? CheckImage : FailImage}
            >
                <Text>
                    {usersInvitedMe[step]?.name}(
                    {usersInvitedMe[step]?.inverse_relation})님
                    {isAccepted
                        ? '과 연결되었습니다!'
                        : '의 초대를 거절하셨어요.'}
                </Text>
                <Gap height="16px" />
                <CheckInvModalButtonContainer>
                    <Button
                        height="48px"
                        onClickButton={() => {
                            window.location.href = '/';
                        }}
                    >
                        돌아가기
                    </Button>
                    {step < usersInvitedMe.length - 1 && (
                        <>
                            <Gap width="8px" />
                            <Button
                                height="48px"
                                onClickButton={() => checkNextInvitation()}
                            >
                                다음 초대 보기
                            </Button>
                        </>
                    )}
                </CheckInvModalButtonContainer>
            </BaseModal>
        </MainLayout>
    );
};
