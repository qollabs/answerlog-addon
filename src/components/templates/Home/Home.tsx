import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import SmileOutlined from '@Images/icons/smile_outlined.svg';
import PointoutOutlined from '@Images/icons/pointout_outlined.svg';
import UserAddFilled from '@Images/icons/user_add_filled.svg';
import PencilOutlined from '@Images/icons/pencil_outlined.svg';
import { MainLayout } from '@Organisms/MainLayout';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { Text } from '@Atoms/Typography';
import { LinkedUserType } from '@Types/types';
import {
    HomeContainer,
    HomeContentContainer,
    HomeEditContainer,
    HomeEditModeLayer,
    HomePersonContainer,
    HomePersonEditBox,
    HomePersonImageBlur,
    HomePersonImageBox,
    HomePersonTextContainer,
    HomeRelationBackButtonContainer,
    HomeRelationButtonContainer,
    HomeRelationImageBox,
    HomeRelationImageContainer,
    HomeRelationModalInnerRow,
    HomeRelationTitleBox,
    HomeTitleBox,
} from './Home.styled';
import { Gap } from '@Styles/App.styled';
import { BLACK, GRAY4 } from '@Styles/colors';
import { useRouter } from 'next/router';
import { AppContext } from '@Pages/_app';
import { useLocalstorage } from '@Hooks/useLocalStorage';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import * as ga from '../../../lib/ga/gtag';
import { BottomDrawer } from '@Molecules/BottomDrawer';
import {
    relationOptions,
    relationTypeOptions,
    testUserIds,
} from '@Constants/globalConstants';
import { Button } from '@Atoms/Button';
import CheckImage from '@Images/check_mandarin.png';
import { BaseModal } from '@Molecules/BaseModal';
import { Container } from '@Atoms/Container';
import { dummyLinkedUser } from '@Constants/dummyObjects';
import {
    inverseRelationArray,
    relationArrayByType,
} from '@Functions/relationTranslator';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface ResUsersInvitedMeType {
    id: string;
    name: string;
    country_code: string;
    phone_number: string;
    relation: string;
    inverse_relation: string;
}

export const Home = () => {
    const router = useRouter();
    const { test } = router.query;
    const { loading, request } = useRequest();
    const [accessToken] = useLocalstorage('accessToken');
    const [firstAccess, setFirstAccess] = useLocalstorage('firstAccess');
    const {
        myName,
        myProfileImage,
        linkedUsers,
        setLinkedUsers,
        setRecentLinkedUser,
        myPhoneNumber,
        myCountryCode,
        isInitiated,
        myDatabaseId,
    } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();

    const [usersInvitedMe, setUsersInvitedMe] = useState<LinkedUserType[]>([]);
    const [usersInvitationDone, setUsersInvitationDone] = useState<
        LinkedUserType[]
    >([]);
    const [usersIInvited, setUsersIInvited] = useState<LinkedUserType[]>([]);
    const [usersDisconnected, setUsersDisconnected] = useState<
        LinkedUserType[]
    >([]);
    const [activateEdit, setActivateEdit] = useState(false);
    const [relationChangeTargetUser, setRelationChangeTargetUser] =
        useState<LinkedUserType>(dummyLinkedUser);
    const [showRelationChangeDrawer, setShowRelationChangeDrawer] =
        useState(false);
    const [relationChangeTitle, setRelationChangeTitle] = useState('');
    const [relationChangeStep, setRelationChangeStep] = useState(0);
    const [changedRelationType, setChangedRelationType] = useState(0);
    const [changedRelationMe, setChangedRelationMe] = useState<string>('');
    const [changedRelationYou, setChangedRelationYou] = useState<string>('');
    const [showRelationChangeModal, setShowRelationChangeModal] =
        useState(false);
    const [showGoToTutorialModal, setShowGoToTutorialModal] = useState(false);

    // sort linked users
    useAsyncEffect(async () => {
        if (!myCountryCode || !myPhoneNumber || !linkedUsers) return;
        const resUsersInvitedMe = await request({
            url: '/api/user/invites',
            method: 'GET',
            params: {
                phone_number: myPhoneNumber,
                country_code: myCountryCode,
            },
        });
        if (resUsersInvitedMe) {
            let linkedUsersTemp = [...linkedUsers];
            let usersInvitedMeTemp = linkedUsersTemp.filter((linkedUser) =>
                resUsersInvitedMe.data.some(
                    (user: ResUsersInvitedMeType) => user.id === linkedUser.id,
                ),
            );
            let usersInvitationDoneTemp = linkedUsersTemp.filter(
                (linkedUser) => linkedUser.invite_status === 2,
            );
            let usersIInvitedTemp = linkedUsersTemp.filter(
                (linkedUser) =>
                    linkedUser.invite_status === 0 &&
                    resUsersInvitedMe.data.every(
                        (user: ResUsersInvitedMeType) =>
                            user.id !== linkedUser.id,
                    ),
            );
            let usersDisconnectedTemp = linkedUsersTemp.filter(
                (linkedUser) => linkedUser.invite_status === 3,
            );
            setUsersInvitedMe(usersInvitedMeTemp);
            setUsersInvitationDone(usersInvitationDoneTemp);
            setUsersIInvited(usersIInvitedTemp);
            setUsersDisconnected(usersDisconnectedTemp);
        }
    }, [myPhoneNumber, myCountryCode, linkedUsers]);

    // set bottom drawer title
    useEffect(() => {
        switch (relationChangeStep) {
            case 0:
            default:
                setRelationChangeTitle('나와 상대방은 어떤 관계인가요?');
                break;
            case 1:
                setRelationChangeTitle('나는 누구인가요?');
                break;
            case 2:
                setRelationChangeTitle('상대방은 누구인가요?');
                break;
        }
    }, [relationChangeStep]);

    // show tutorial modal
    useEffect(() => {
        if (firstAccess === undefined) return;
        if (!firstAccess) {
            setShowGoToTutorialModal(true);
        }
    }, [firstAccess]);

    const goToLanding = async (targetUserLinkId: string) => {
        const resPatchRecent = await request({
            url: '/api/user/recent_link',
            method: 'PATCH',
            data: {
                recent_user_link_id: targetUserLinkId,
            },
        });
        if (resPatchRecent) {
            let targetLinkedUser = linkedUsers.find(
                (user) => user.user_link_id === targetUserLinkId,
            );
            if (targetLinkedUser) {
                ga.event({
                    action: 'change_linked_user',
                    params: {
                        linked_user_id: targetLinkedUser.id,
                        linked_user_relationship: targetLinkedUser.relation,
                        linked_user_phone_number: targetLinkedUser.phone_number,
                    },
                });
                ga.setLinkedUserPhoneNumber(targetLinkedUser.phone_number);
                ga.setLinkedUserRelationship(targetLinkedUser.relation);
                let { invite_status, ...rest } = targetLinkedUser;
                setRecentLinkedUser(rest);
            }
            router.push('/landing');
        }
    };

    const goToCheckInvitation = (targetId: string) => {
        router.push(`/check-invitation/${targetId}`);
    };

    const openRelationChangeDrawer = (targetLinkedUser: LinkedUserType) => {
        setChangedRelationMe('');
        setChangedRelationYou('');
        setRelationChangeStep(0);
        setRelationChangeTargetUser(targetLinkedUser);
        setShowRelationChangeDrawer(true);
    };

    const closeRelationChangeDrawer = () => {
        setShowRelationChangeDrawer(false);
    };
    const selectRelationType = (type: number) => {
        setChangedRelationType(type);
        setRelationChangeStep(1);
    };
    const selectMyRelation = (value: string) => {
        setChangedRelationMe(value);
        setRelationChangeStep(2);
    };
    const selectYourRelation = (value: string) => {
        setChangedRelationYou(value);
        setShowRelationChangeDrawer(false);
        setShowRelationChangeModal(true);
    };
    const resetRelation = () => {
        if (relationChangeStep === 2) {
            setChangedRelationYou('');
            setRelationChangeStep(1);
        } else if (relationChangeStep === 1) {
            setChangedRelationMe('');
            setChangedRelationYou('');
            setRelationChangeStep(0);
        }
    };

    const backToRelationSelect = () => {
        setChangedRelationMe('');
        setChangedRelationYou('');
        setRelationChangeStep(0);
        setShowRelationChangeModal(false);
        setShowRelationChangeDrawer(true);
    };

    const confirmRelationChange = async () => {
        const resPatchRelation = await request({
            url: '/api/user/modify_relation',
            method: 'PATCH',
            data: {
                user_link_id: relationChangeTargetUser.user_link_id,
                relation: changedRelationMe,
                inverse_relation: changedRelationYou,
            },
        });
        if (resPatchRelation) {
            let linkedUsersTemp = [...linkedUsers];
            linkedUsersTemp.forEach((linkedUser, index) => {
                if (linkedUser.id === relationChangeTargetUser.id) {
                    linkedUser.relation = changedRelationYou;
                }
            });
            setLinkedUsers(linkedUsersTemp);
            setActivateEdit(false);
            setShowRelationChangeModal(false);
            setChangedRelationMe('');
            setChangedRelationYou('');
            setRelationChangeStep(0);
        }
    };

    const goToTutorial = () => {
        setFirstAccess('firstAccess');
        router.push('/tutorial');
    };

    const noFirstTutorial = () => {
        setFirstAccess('firstAccess');
        setShowGoToTutorialModal(false);
    };

    return (
        <MainLayout showLogo hideBottomNav hideBackButton>
            {loading || !isInitiated ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <HomeContainer>
                    {test && <Text>{test}</Text>}
                    {activateEdit && <HomeEditModeLayer />}
                    <HomeEditContainer>
                        {activateEdit ? (
                            <Text
                                color="white"
                                underline
                                onClick={() => setActivateEdit(false)}
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        setActivateEdit(false),
                                    )
                                }
                            >
                                편집 완료
                            </Text>
                        ) : (
                            <Text
                                color="gray4"
                                underline
                                onClick={() => setActivateEdit(true)}
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        setActivateEdit(true),
                                    )
                                }
                            >
                                가족 관계 편집하기
                            </Text>
                        )}
                    </HomeEditContainer>
                    <HomeTitleBox>
                        <Text size="h2">
                            앤서록을 함께 할 가족을 선택해 주세요
                        </Text>
                    </HomeTitleBox>
                    <HomeContentContainer>
                        {/* my page */}
                        {/* <HomePersonContainer
                            onClick={() =>
                                activateEdit ? null : router.push('/mypage')
                            }
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    activateEdit
                                        ? null
                                        : router.push('/mypage'),
                                )
                            }
                        >
                            <HomePersonImageBox>
                                {myProfileImage ? (
                                    <Image
                                        src={myProfileImage}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                ) : (
                                    <SmileOutlined
                                        width="100%"
                                        height="100%"
                                        color={BLACK}
                                    />
                                )}
                            </HomePersonImageBox>
                            <Gap height="8px" />
                            <HomePersonTextContainer>
                                <Text textAlign="center">나</Text>
                                <Text color="gray4" textAlign="center">
                                    {myName}
                                </Text>
                            </HomePersonTextContainer>
                            <Gap height="50px" />
                        </HomePersonContainer> */}
                        {/* users invited me */}
                        {usersInvitedMe.map((linkedUser, i) => (
                            <HomePersonContainer
                                key={`${linkedUser.phone_number}-${linkedUser.id}`}
                                onClick={() =>
                                    activateEdit
                                        ? null
                                        : goToCheckInvitation(
                                              linkedUser.id as string,
                                          )
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        activateEdit
                                            ? null
                                            : goToCheckInvitation(
                                                  linkedUser.id as string,
                                              ),
                                    )
                                }
                            >
                                <HomePersonImageBox>
                                    <HomePersonImageBlur>
                                        <Text color="white" size="b2">
                                            나를
                                            <br />
                                            초대했어요
                                        </Text>
                                    </HomePersonImageBlur>
                                    {linkedUser.profile_image_url ? (
                                        <Image
                                            src={linkedUser.profile_image_url}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    ) : (
                                        <SmileOutlined
                                            width="100%"
                                            height="100%"
                                            color={BLACK}
                                        />
                                    )}
                                </HomePersonImageBox>
                                <Gap height="8px" />
                                <HomePersonTextContainer>
                                    <Text textAlign="center">
                                        {linkedUser.relation}
                                    </Text>
                                    <Text color="gray4" textAlign="center">
                                        {linkedUser.name}
                                    </Text>
                                </HomePersonTextContainer>
                                <Gap height="50px" />
                            </HomePersonContainer>
                        ))}
                        {/* users invitation done */}
                        {usersInvitationDone.map((linkedUser, i) => (
                            <HomePersonContainer
                                key={`${linkedUser.phone_number}-${linkedUser.id}`}
                                onClick={() =>
                                    activateEdit
                                        ? openRelationChangeDrawer(linkedUser)
                                        : goToLanding(linkedUser.user_link_id)
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        activateEdit
                                            ? openRelationChangeDrawer(
                                                  linkedUser,
                                              )
                                            : goToLanding(
                                                  linkedUser.user_link_id,
                                              ),
                                    )
                                }
                            >
                                <HomePersonImageBox>
                                    {activateEdit && (
                                        <HomePersonEditBox>
                                            <PencilOutlined />
                                        </HomePersonEditBox>
                                    )}
                                    {linkedUser.profile_image_url ? (
                                        <Image
                                            src={linkedUser.profile_image_url}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    ) : (
                                        <SmileOutlined
                                            width="100%"
                                            height="100%"
                                            color={BLACK}
                                        />
                                    )}
                                </HomePersonImageBox>
                                <Gap height="8px" />
                                <HomePersonTextContainer>
                                    <Text textAlign="center">
                                        {linkedUser.relation}
                                    </Text>
                                    <Text color="gray4" textAlign="center">
                                        {linkedUser.name}
                                    </Text>
                                </HomePersonTextContainer>
                                <Gap height="50px" />
                            </HomePersonContainer>
                        ))}
                        {/* users I invited */}
                        {usersIInvited.map((linkedUser, i) => (
                            <HomePersonContainer
                                key={`${linkedUser.phone_number}-${linkedUser.id}`}
                                onClick={() =>
                                    activateEdit
                                        ? openRelationChangeDrawer(linkedUser)
                                        : goToLanding(linkedUser.user_link_id)
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        activateEdit
                                            ? openRelationChangeDrawer(
                                                  linkedUser,
                                              )
                                            : goToLanding(
                                                  linkedUser.user_link_id,
                                              ),
                                    )
                                }
                            >
                                <HomePersonImageBox>
                                    {activateEdit && (
                                        <HomePersonEditBox>
                                            <PencilOutlined />
                                        </HomePersonEditBox>
                                    )}
                                    <HomePersonImageBlur>
                                        <Text color="white" size="b2">
                                            응답을
                                            <br />
                                            기다리는 중
                                        </Text>
                                    </HomePersonImageBlur>
                                    {linkedUser.profile_image_url ? (
                                        <Image
                                            src={linkedUser.profile_image_url}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    ) : (
                                        <SmileOutlined
                                            width="100%"
                                            height="100%"
                                            color={BLACK}
                                        />
                                    )}
                                </HomePersonImageBox>
                                <Gap height="8px" />
                                <HomePersonTextContainer>
                                    <Text>{linkedUser.relation}</Text>
                                    <Text color="gray4">
                                        {linkedUser.name ||
                                            linkedUser.phone_number}
                                    </Text>
                                </HomePersonTextContainer>
                                <Gap height="50px" />
                            </HomePersonContainer>
                        ))}
                        {/* disconnected users */}
                        {usersDisconnected.map((linkedUser, i) => (
                            <HomePersonContainer
                                key={`${linkedUser.phone_number}-${linkedUser.id}`}
                                onClick={() =>
                                    activateEdit
                                        ? null
                                        : goToLanding(linkedUser.user_link_id)
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        activateEdit
                                            ? null
                                            : goToLanding(
                                                  linkedUser.user_link_id,
                                              ),
                                    )
                                }
                            >
                                <HomePersonImageBox>
                                    <HomePersonImageBlur>
                                        <Text color="white" size="b2">
                                            탈퇴한
                                            <br />
                                            회원이에요
                                        </Text>
                                    </HomePersonImageBlur>
                                    {linkedUser.profile_image_url ? (
                                        <Image
                                            src={linkedUser.profile_image_url}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    ) : (
                                        <SmileOutlined
                                            width="100%"
                                            height="100%"
                                            color={BLACK}
                                        />
                                    )}
                                </HomePersonImageBox>
                                <Gap height="8px" />
                                <HomePersonTextContainer>
                                    <Text>{linkedUser.relation}</Text>
                                    <Text color="gray4">
                                        {linkedUser.name ||
                                            linkedUser.phone_number}
                                    </Text>
                                </HomePersonTextContainer>
                                <Gap height="50px" />
                            </HomePersonContainer>
                        ))}
                        {/* tutorial */}
                        <HomePersonContainer
                            onClick={() => router.push('/tutorial')}
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    router.push('/tutorial'),
                                )
                            }
                        >
                            <HomePersonImageBox background={GRAY4}>
                                <PointoutOutlined
                                    color={BLACK}
                                    width="50px"
                                    height="52px"
                                />
                            </HomePersonImageBox>
                            <Gap height="8px" />
                            <HomePersonTextContainer>
                                <Text>연습해보기</Text>
                                <Text color="gray4">앤서록 봇</Text>
                            </HomePersonTextContainer>
                            <Gap height="50px" />
                        </HomePersonContainer>
                        {/* connect more */}
                        <HomePersonContainer
                            onClick={() => router.push('/invite')}
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    router.push('/invite'),
                                )
                            }
                        >
                            <HomePersonImageBox transparent>
                                <UserAddFilled color={BLACK} />
                            </HomePersonImageBox>
                            <Gap height="8px" />
                            <HomePersonTextContainer>
                                <Text>가족 추가 연결</Text>
                                <Gap height="21px" />
                            </HomePersonTextContainer>
                            <Gap height="50px" />
                        </HomePersonContainer>

                        {testUserIds.includes(myDatabaseId) && (
                            <HomePersonContainer
                                onClick={() => router.push('/test')}
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        router.push('/test'),
                                    )
                                }
                            >
                                <HomePersonImageBox />
                                <Gap height="8px" />
                                <HomePersonTextContainer>
                                    <Text>테스트용</Text>
                                    <Gap height="21px" />
                                </HomePersonTextContainer>
                                <Gap height="50px" />
                            </HomePersonContainer>
                        )}
                    </HomeContentContainer>
                </HomeContainer>
            )}
            <BottomDrawer
                show={showRelationChangeDrawer}
                onClose={() => setShowRelationChangeDrawer(false)}
                closeOnClickOutside
            >
                {relationChangeStep > 0 && (
                    <>
                        <HomeRelationImageContainer>
                            <HomeRelationImageBox
                                active={relationChangeStep === 1}
                            >
                                <Text>나</Text>
                            </HomeRelationImageBox>
                            <Gap width="16px" />
                            <HomeRelationImageBox
                                active={relationChangeStep === 2}
                            >
                                <Text>상대</Text>
                            </HomeRelationImageBox>
                        </HomeRelationImageContainer>
                        <Gap height="16px" />
                    </>
                )}
                <HomeRelationTitleBox>
                    <Text size="h2">{relationChangeTitle}</Text>
                    <Gap height="32px" />
                </HomeRelationTitleBox>
                {relationChangeStep === 0 && (
                    <HomeRelationButtonContainer>
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
                    </HomeRelationButtonContainer>
                )}
                {relationChangeStep === 1 && (
                    <HomeRelationButtonContainer>
                        {relationArrayByType(changedRelationType).map(
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
                    </HomeRelationButtonContainer>
                )}
                {relationChangeStep === 2 && (
                    <HomeRelationButtonContainer>
                        {inverseRelationArray(changedRelationMe).map(
                            (relation, i) => (
                                <Button
                                    color="pink"
                                    onClickButton={() =>
                                        selectYourRelation(relation)
                                    }
                                >
                                    {relation}
                                </Button>
                            ),
                        )}
                    </HomeRelationButtonContainer>
                )}
                {relationChangeStep > 0 && (
                    <HomeRelationBackButtonContainer>
                        <Button
                            onClickButton={() => resetRelation()}
                            color="gray"
                        >
                            뒤로 가기
                        </Button>
                    </HomeRelationBackButtonContainer>
                )}
            </BottomDrawer>
            <BaseModal
                show={showRelationChangeModal}
                customImage={CheckImage}
                buttonText="아니에요"
                buttonColor="gray"
                onClickButton={backToRelationSelect}
                button2Text="맞아요"
                onClickButton2={confirmRelationChange}
            >
                <Container>
                    <HomeRelationModalInnerRow>
                        <Text>나 - </Text>
                        <Text color="orange2">{changedRelationMe}</Text>
                    </HomeRelationModalInnerRow>
                    <HomeRelationModalInnerRow>
                        <Text>상대방 - </Text>
                        <Text color="orange2">{changedRelationYou}</Text>
                    </HomeRelationModalInnerRow>
                </Container>
            </BaseModal>
            <BaseModal
                show={showGoToTutorialModal}
                buttonText="괜찮아요"
                buttonColor="gray"
                onClickButton={noFirstTutorial}
                button2Text="연습해보기"
                onClickButton2={goToTutorial}
            >
                <Text>앤서록이 처음이신가요?</Text>
                <Text>저희가 도와드릴 수 있어요</Text>
                <Gap height="8px" />
                <Text size="b2">
                    &#39;연습해보기&#39;를 눌러 언제든 다시 연습할 수 있어요
                </Text>
            </BaseModal>
        </MainLayout>
    );
};
