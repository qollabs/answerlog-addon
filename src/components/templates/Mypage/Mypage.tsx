import Image from 'next/image';
import { useRouter } from 'next/router';
import LifeBuoyImage from '@Images/lifebuoy.png';
import { Text } from '@Atoms/Typography';
import { MainLayout } from '@Organisms/MainLayout';
import {
    MypageContainer,
    MypageUserSettingContainer,
    MypageInfoErrorText,
    MypageLogoutContainer,
    MypageOrderInfoContainer,
    MypageOrderInfoEmptyBox,
    MypageOrderInfoImageBox,
    MypageOrderInfoTextContainer,
    MypageCashPointContainer,
    MypageCashPointIconBox,
    MypageOrderInfoTextRow,
    MypageOrderInfoSumupTextBox,
    MypageEventListContainer,
    MypageEventTextContainer,
    MypageCouponEmptyBox,
    MypageCouponContainer,
    MypageCouponTextContainer,
    MypageCouponTextRow,
    MypageCouponImageBox,
    MypageCouponSumupTextBox,
} from './Mypage.styled';
import { Button } from '@Atoms/Button';
import { useContext, useEffect, useState } from 'react';
import {
    IOrderInfo,
    IUser,
    ImageType,
    TextSizePrefType,
    UserSettingType,
} from '@Types/types';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import { Gap } from '@Styles/App.styled';
import { TextField } from '@Atoms/TextField/TextField';
import { useInput } from '@Hooks/useInput';
import { convertTime } from '@Functions/convertTime';
import { RowContainer } from '@Atoms/RowContainer';
import { AppContext } from '@Pages/_app';
import { BaseModal } from '@Molecules/BaseModal';
import * as ga from '../../../lib/ga/gtag';
import {
    cancelProcessTranslator,
    deliveryProcessTranslator,
    multipleDeliveryProcess,
} from '@Functions/deliveryProcessTranslator';
import { CardSection } from '@Molecules/CardSection';
import { ImageUploader } from '@Molecules/ImageUploader';
import { useDateDayInput } from '@Hooks/useDateDayInput';
import { isValidDate, isValidWithoutSpace } from '@Functions/validityChecks';
import { orderedGiftsArrayMaker } from '@Functions/orderedGiftsArrayMaker';
import { Container } from '@Atoms/Container';
import { DotLoader, LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { useImageCompressAndUpload } from '@Hooks/useImageCompressAndUpload';
import { totalCashPoint } from '@Functions/cashPointTranslator';
import AnswerlogLogoImage from '@Images/answerlog_icon_logo.png';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { useFlutter } from '@Hooks/useFlutter';

export const Mypage = () => {
    const router = useRouter();
    const { loading, request } = useRequest();
    const {
        myDatabaseId,
        myName,
        setMyName,
        myPhoneNumber,
        myProfileImage,
        setMyProfileImage,
        textSizePref,
        setTextSizePref,
        myBirth,
        setMyBirth,
        myKakaoId,
        myAppleId,
        myCashPoints,
        myCoupons,
        isInitiated,
    } = useContext(AppContext);
    const { compressAndUploadToS3 } = useImageCompressAndUpload();
    const { actionOnTouchEnd } = useActionOnTouch();
    const { openExternalBrowser } = useFlutter();

    const [editProfile, setEditProfile] = useState(false);
    const [myProfileImageTemp, setMyProfileImageTemp] =
        useState<ImageType | null>(null);
    const [myNameTemp, onChangeMyNameTemp, setMyNameTemp] = useInput('');
    const [myBirthTemp, onChangeMyBirthTemp, setMyBirthTemp] =
        useDateDayInput('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [isBirthValid, setIsBirthValid] = useState(true);
    const [disableProfileEditButton, setDisableProfileEditButton] =
        useState(true);
    const [modifyUserInfoInProcess, setModifyUserInfoInProcess] =
        useState(false);
    const [orderInfoLoading, setOrderInfoLoading] = useState(false);
    const [orderInfos, setOrderInfos] = useState<IOrderInfo[]>([]);
    const [modifyTextPreferenceInProcess, setModifyTextPrefInProcess] =
        useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    // get order info
    useAsyncEffect(async () => {
        if (!myDatabaseId) return;
        setOrderInfoLoading(true);
        const orderInfosRes = await request({
            url: `/api/order/history/${myDatabaseId}`,
            method: 'GET',
        });
        if (orderInfosRes) {
            let orderInfosTemp = [...orderInfosRes.data];
            // 결제 도중 뒤로가기 등으로 인해 결제 취소를 하지 않아서 order DELETE 요청이 되지 않은 경우, 이틀 후 제거되도록 되어있다. 그런 경우 paymentKey가 ''이라서 이것을 필터링해준다.
            let filteredOrderInfos = orderInfosTemp.filter(
                (info) => info.paymentKey !== '',
            );
            setOrderInfos(filteredOrderInfos.reverse());
        } else {
            console.log('failed to get order infos');
        }
        setOrderInfoLoading(false);
    }, [myDatabaseId]);

    useEffect(() => {
        // refine profile image
        if (myProfileImage) {
            let imageObject: ImageType = {
                name: '',
                file: undefined,
                previewURL: myProfileImage,
            };
            setMyProfileImageTemp(imageObject);
        }

        // temporary name for input
        setMyNameTemp(myName);

        // temporary birth for input
        setMyBirthTemp(convertTime(myBirth, 'dotDate'));
    }, [myProfileImage, myName, myBirth]);

    // disable profile edit button
    useEffect(() => {
        let isActivated = editProfile;
        let isChanged =
            myName !== myNameTemp ||
            convertTime(myBirth, 'dotDate') !== myBirthTemp ||
            myProfileImageTemp?.previewURL !== myProfileImage;
        let isValid = isNameValid && isBirthValid;
        setDisableProfileEditButton(
            !isActivated || !isChanged || !isValid || loading,
        );
    }, [
        myProfileImageTemp,
        myNameTemp,
        myBirthTemp,
        editProfile,
        isNameValid,
        isBirthValid,
        loading,
    ]);

    // toggle validity of name and birth
    useEffect(() => {
        setIsNameValid(isValidWithoutSpace(myNameTemp));
        setIsBirthValid(isValidDate(myBirthTemp));
    }, [myNameTemp, myBirthTemp]);

    const toggleEditProfile = () => {
        // 수정취소
        if (editProfile) {
            let imageObject: ImageType | null = myProfileImage
                ? {
                      name: '',
                      file: undefined,
                      previewURL: myProfileImage,
                  }
                : null;
            setMyProfileImageTemp(imageObject);
            setMyNameTemp(myName);
            setMyBirthTemp(convertTime(myBirth, 'dotDate'));
            setEditProfile(!editProfile);

            // 수정하기
        } else {
            setEditProfile(!editProfile);
        }
    };

    const modifyUserInfo = async () => {
        setModifyUserInfoInProcess(true);
        let profileImageUrl: string | null = null;
        if (myProfileImageTemp) {
            if (myProfileImageTemp.file) {
                profileImageUrl = await compressAndUploadToS3(
                    'profile-image',
                    myProfileImageTemp.file,
                    {
                        maxWidthOrHeight: 200,
                    },
                );
            } else {
                profileImageUrl =
                    (myProfileImageTemp.previewURL as string) || null;
            }
        }
        const reqUserPatch = {
            profile_image_url: profileImageUrl,
            name: myNameTemp,
            birth_date: myBirthTemp.replace(/\./g, ''),
        };
        const resUserPatch = await request({
            url: '/api/user',
            method: 'PATCH',
            data: reqUserPatch,
        });
        if (resUserPatch) {
            let userTemp: IUser = resUserPatch.data;
            setEditProfile(false);
            setMyName(userTemp.name);
            setMyBirth(userTemp.birth_date);
            setMyProfileImage(userTemp.profile_image_url);
        } else {
            console.log('error');
        }
        setModifyUserInfoInProcess(false);
    };

    const modifyTextPreference = async (preference: number) => {
        const reqTextPref: { user_setting: UserSettingType } = {
            user_setting: {
                linked_oauth: {
                    kakao: {
                        kakao_id: myKakaoId,
                    },
                    apple: {
                        apple_id: myAppleId,
                    },
                },
                font_preference: preference,
            },
        };
        const resTextPref = await request({
            url: '/api/user',
            method: 'PATCH',
            data: reqTextPref,
        });
        if (resTextPref) {
            setTextSizePref(`v${preference}` as TextSizePrefType);
        }
    };

    const logout = async () => {
        ga.event({
            action: 'logout',
            params: {},
        });
        ga.setUserId(null);
        ga.setLinkedUserRelationship(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/login?phase=logout');
    };

    const deleteUser = async () => {
        const res = await request({
            url: '/api/user/',
            method: 'DELETE',
        });
        if (res) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            ga.event({
                action: 'withdrawal',
                params: {},
            });
            ga.setUserId(null);
            ga.setLinkedUserRelationship(null);
            router.push('/login?phase=withdrawal');
        } else {
            console.log('error');
        }
    };

    return (
        <MainLayout title="마이페이지" hideBottomNav>
            {!isInitiated ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <MypageContainer>
                    <CardSection
                        title="기본 정보"
                        orangeTitle
                        textButton={editProfile ? '수정 취소' : '수정하기'}
                        onClickTextButton={() => toggleEditProfile()}
                    >
                        {modifyUserInfoInProcess ? (
                            <LoadingContainer>
                                <DotLoader />
                            </LoadingContainer>
                        ) : (
                            <Container>
                                <ImageUploader
                                    outline
                                    targetImage={myProfileImageTemp}
                                    setTargetImage={setMyProfileImageTemp}
                                    disabled={!editProfile}
                                />
                                <Gap height="16px" />
                                <TextField
                                    title="이름"
                                    value={myNameTemp}
                                    onChange={onChangeMyNameTemp}
                                    disabled={!editProfile}
                                    status={!isNameValid ? 'error' : 'default'}
                                    errorMessage="이름을 입력해주세요"
                                />
                                <Gap height="8px" />
                                <TextField
                                    title="생일"
                                    value={myBirthTemp}
                                    onChange={onChangeMyBirthTemp}
                                    disabled={!editProfile}
                                    status={!isBirthValid ? 'error' : 'default'}
                                    errorMessage="올바르지 않은 생일이에요"
                                    isNumeric
                                />
                                <Gap height="8px" />
                                <TextField
                                    title="전화번호"
                                    value={myPhoneNumber}
                                    disabled
                                />
                                <Gap height="16px" />
                                <Button
                                    onClickButton={() => modifyUserInfo()}
                                    disabled={disableProfileEditButton}
                                >
                                    저장하기
                                </Button>
                            </Container>
                        )}
                    </CardSection>
                    <Gap height="32px" />
                    <CardSection title="구매 내역" orangeTitle>
                        {!orderInfoLoading && orderInfos.length === 0 && (
                            <MypageOrderInfoEmptyBox>
                                <Text color="gray5">구매내역이 없어요</Text>
                            </MypageOrderInfoEmptyBox>
                        )}
                        {orderInfoLoading && (
                            <LoadingContainer>
                                <DotLoader />
                            </LoadingContainer>
                        )}
                        {!orderInfoLoading && orderInfos.length > 0 && (
                            <>
                                {orderInfos.map(
                                    (orderInfo, i) =>
                                        i < 2 && (
                                            <MypageOrderInfoContainer
                                                key={`orderinfo${i}`}
                                            >
                                                <MypageOrderInfoTextContainer>
                                                    <Text color="orange2">
                                                        [
                                                        {orderInfo.cancel_info
                                                            .process !== 0
                                                            ? cancelProcessTranslator(
                                                                  orderInfo
                                                                      .cancel_info
                                                                      .process,
                                                              )
                                                            : deliveryProcessTranslator(
                                                                  multipleDeliveryProcess(
                                                                      orderInfo,
                                                                  ).fastest,
                                                              )}
                                                        ]
                                                    </Text>
                                                    <MypageOrderInfoTextRow>
                                                        <Text>
                                                            {
                                                                orderedGiftsArrayMaker(
                                                                    orderInfo,
                                                                )[0].item.title
                                                            }
                                                            &nbsp;
                                                        </Text>
                                                        <Text>
                                                            {orderInfo
                                                                .deliver_info
                                                                .length > 1 &&
                                                                `외 ${
                                                                    orderedGiftsArrayMaker(
                                                                        orderInfo,
                                                                    ).length
                                                                }`}
                                                        </Text>
                                                    </MypageOrderInfoTextRow>
                                                    <MypageOrderInfoTextRow>
                                                        <Text>
                                                            {orderInfo.total_price.toLocaleString()}
                                                        </Text>
                                                        <Text size="c1">
                                                            원
                                                        </Text>
                                                    </MypageOrderInfoTextRow>
                                                </MypageOrderInfoTextContainer>
                                                <MypageOrderInfoImageBox>
                                                    <Image
                                                        src={
                                                            orderedGiftsArrayMaker(
                                                                orderInfo,
                                                            )[0].item
                                                                .thumbnail_url
                                                        }
                                                        layout="fill"
                                                    />
                                                </MypageOrderInfoImageBox>
                                            </MypageOrderInfoContainer>
                                        ),
                                )}
                                <MypageOrderInfoSumupTextBox>
                                    총 {orderInfos.length.toLocaleString()}개의
                                    구매내역이 있어요
                                </MypageOrderInfoSumupTextBox>
                                <Gap height="10px" />
                                <Button
                                    onClickButton={() =>
                                        router.push('/purchase-history')
                                    }
                                >
                                    구매내역 상세보기
                                </Button>
                            </>
                        )}
                    </CardSection>
                    <Gap height="32px" />
                    <CardSection
                        title="사용자 설정"
                        orangeTitle
                        alignItems="flex-start"
                    >
                        <Text underline>글씨 크기</Text>
                        <Gap height="10px" />
                        <MypageUserSettingContainer>
                            <Button
                                shape="full-circle"
                                width="52px"
                                height="52px"
                                forcedTextPref="v2"
                                color={
                                    textSizePref === 'v2' ? 'orange' : 'gray'
                                }
                                onClickButton={() => modifyTextPreference(2)}
                            >
                                작게
                            </Button>
                            <Gap width="24px" />
                            <Button
                                shape="full-circle"
                                width="64px"
                                height="64px"
                                color={
                                    textSizePref === 'v1' ? 'orange' : 'gray'
                                }
                                onClickButton={() => modifyTextPreference(1)}
                            >
                                보통
                            </Button>
                            <Gap width="24px" />
                            <Button
                                shape="full-circle"
                                width="78px"
                                height="78px"
                                forcedTextPref="v0"
                                color={
                                    textSizePref === 'v0' ? 'orange' : 'gray'
                                }
                                onClickButton={() => modifyTextPreference(0)}
                            >
                                크게
                            </Button>
                        </MypageUserSettingContainer>
                        <Gap height="32px" />
                        <Text underline>앤서록 포인트</Text>
                        <Gap height="10px" />
                        <MypageUserSettingContainer>
                            <MypageCashPointContainer>
                                <Text>보유 포인트&nbsp;&#58;&nbsp;</Text>
                                <Text>
                                    {totalCashPoint(
                                        myCashPoints,
                                    ).toLocaleString()}
                                </Text>
                            </MypageCashPointContainer>
                        </MypageUserSettingContainer>
                        <Gap height="10px" />
                        <Button
                            onClickButton={() => console.log('포인트 충전')}
                            disabled
                        >
                            포인트 충전하기
                        </Button>
                        <Gap height="10px" />
                        <MypageCashPointContainer>
                            <MypageCashPointIconBox>
                                <Text color="white" size="c1">
                                    !
                                </Text>
                            </MypageCashPointIconBox>
                            <Gap width="8px" />
                            <Text size="c1">
                                포인트는 현재 이용하실 수 없어요
                            </Text>
                        </MypageCashPointContainer>
                    </CardSection>
                    <Gap height="32px" />
                    <CardSection
                        title="이벤트 정보"
                        orangeTitle
                        alignItems="flex-start"
                    >
                        <Text underline>진행중인 이벤트</Text>
                        <Gap height="10px" />
                        <MypageEventListContainer>
                            <MypageEventTextContainer>
                                <Text>
                                    &middot; &#40;종료&#41; 앤서록 다이닝
                                    응모하기
                                </Text>
                            </MypageEventTextContainer>
                        </MypageEventListContainer>
                        <Gap height="32px" />
                        <Text underline>보유 쿠폰</Text>
                        <Gap height="10px" />
                        {myCoupons.length === 0 ? (
                            <MypageCouponEmptyBox>
                                <Text>보유하신 쿠폰이 없어요</Text>
                            </MypageCouponEmptyBox>
                        ) : (
                            <>
                                {myCoupons.map(
                                    (coupon, i) =>
                                        i < 2 && (
                                            <MypageCouponContainer
                                                key={`orderinfo${i}`}
                                            >
                                                <MypageCouponTextContainer>
                                                    <Text color="orange2">
                                                        [
                                                        {coupon.is_used
                                                            ? '이용 완료'
                                                            : '이용 가능'}
                                                        ]
                                                    </Text>
                                                    <MypageCouponTextRow>
                                                        <Text>
                                                            {coupon.title}
                                                        </Text>
                                                    </MypageCouponTextRow>
                                                    <MypageCouponTextRow>
                                                        <Text size="b2">
                                                            {coupon.place}
                                                        </Text>
                                                    </MypageCouponTextRow>
                                                </MypageCouponTextContainer>
                                                <MypageCouponImageBox>
                                                    <Image
                                                        src={
                                                            coupon.image_url ||
                                                            AnswerlogLogoImage
                                                        }
                                                        layout="fill"
                                                    />
                                                </MypageCouponImageBox>
                                            </MypageCouponContainer>
                                        ),
                                )}
                                <MypageCouponSumupTextBox>
                                    총 {myCoupons.length.toLocaleString()}개의
                                    쿠폰이 있어요
                                </MypageCouponSumupTextBox>
                            </>
                        )}
                        <Gap height="10px" />
                        <Button onClickButton={() => router.push('/coupon')}>
                            쿠폰 확인하기
                        </Button>
                    </CardSection>
                    <Gap height="32px" />
                    <CardSection
                        title="고객센터"
                        explanation="궁금한 점은 저희에게 물어보세요 :)"
                    >
                        <Gap height="10px" />
                        <Button
                            color="gray"
                            onClickButton={() => router.push('/service-center')}
                        >
                            문의하기
                        </Button>
                    </CardSection>
                    <Gap height="32px" />
                    <MypageLogoutContainer>
                        <Button
                            color="gray"
                            onClickButton={() => setShowLogoutModal(true)}
                        >
                            로그아웃
                        </Button>
                        <Gap height="10px" />
                        <Text
                            color="gray5"
                            size="b1"
                            underline
                            onClick={() => setShowDeleteUserModal(true)}
                            onTouchEnd={(e) =>
                                actionOnTouchEnd(e, () =>
                                    setShowDeleteUserModal(true),
                                )
                            }
                        >
                            앤서록 탈퇴하기
                        </Text>
                    </MypageLogoutContainer>

                    <BaseModal
                        title="로그아웃"
                        show={showLogoutModal}
                        customImage={LifeBuoyImage}
                        closeOnClickOutside
                        onClose={() => setShowLogoutModal(false)}
                    >
                        <Text>정말로 로그아웃 하시겠어요?</Text>
                        <Gap height="8px" />
                        <Text size="b2" textAlign="center">
                            {myName}님의 가족 분들이 <br />
                            기다리고 있어요.
                        </Text>
                        <Gap height="32px" />
                        <RowContainer>
                            <Button
                                height="48px"
                                onClickButton={() => setShowLogoutModal(false)}
                            >
                                취소
                            </Button>
                            <Gap width="16px" />
                            <Button
                                color="gray"
                                height="48px"
                                onClickButton={logout}
                            >
                                로그아웃
                            </Button>
                        </RowContainer>
                    </BaseModal>
                    <BaseModal
                        title="앤서록 탈퇴"
                        show={showDeleteUserModal}
                        customImage={LifeBuoyImage}
                        closeOnClickOutside
                        onClose={() => setShowDeleteUserModal(false)}
                    >
                        <Text>정말로 탈퇴 하시겠어요?</Text>
                        <Gap height="8px" />
                        <Text size="b2" textAlign="center">
                            계정을 삭제하면 다시 되돌릴 수 없어요.
                        </Text>
                        <Gap height="32px" />
                        <RowContainer>
                            <Button
                                height="48px"
                                onClickButton={() =>
                                    setShowDeleteUserModal(false)
                                }
                            >
                                취소
                            </Button>
                            <Gap width="16px" />
                            <Button
                                color="gray"
                                height="48px"
                                onClickButton={deleteUser}
                            >
                                탈퇴하기
                            </Button>
                        </RowContainer>
                    </BaseModal>
                </MypageContainer>
            )}
        </MainLayout>
    );
};
