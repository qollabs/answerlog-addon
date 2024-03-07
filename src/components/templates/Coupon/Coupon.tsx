import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { Text } from '@Atoms/Typography';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import { MainLayout } from '@Organisms/MainLayout';
import { AppContext } from '@Pages/_app';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import {
    CouponContainer,
    CouponEachBlockContainer,
    CouponEachBodyContainer,
    CouponEachContainer,
    CouponEachHeadContainer,
    CouponEachImageBox,
    CouponEachInfoContainer,
} from './Coupon.styled';
import CaretRight from '@Images/icons/caret_right.svg';
import Image from 'next/image';
import { Gap } from '@Styles/App.styled';
import { convertTime } from '@Functions/convertTime';
import { ORANGE2 } from '@Styles/colors';
import AnswerlogLogoImage from '@Images/answerlog_icon_logo.png';
import { BaseModal } from '@Molecules/BaseModal';
import ExclamationImage from '@Images/exclamation_mandarin.png';
import { useInput } from '@Hooks/useInput';
import { CouponType } from '@Types/types';
import { dummyCoupon } from '@Constants/dummyObjects';
import { TextField } from '@Atoms/TextField';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { useFlutter } from '@Hooks/useFlutter';
import { Button } from '@Atoms/Button';
import QrScanner from 'qr-scanner';
import { mobileDetector } from '@Functions/browserDetector';
import { QrCodeScanner } from '@Molecules/QrCodeScanner';
import {
    couponCodeTranslator,
    qrDataTranslator,
} from '@Functions/codeTranslator';
import { useSessionstorage } from '@Hooks/useSessionStorage';

interface ResIssueCouponType {
    is_issued: boolean;
    failure_reason:
        | 'INVALID COUPON ISSUE PERIOD'
        | 'INVALID COUPON ID'
        | 'SAME COUPON EXISTS'
        | '';
}

export interface ResUseCouponType {
    is_failed: boolean;
    failure_reason:
        | 'EXPIRED COUPON'
        | 'WRONG COUPON PASSWORD'
        | 'INVALID COUPON ID'
        | '';
}

type IssueMethodType = 'qr-code' | 'text-input';

export const Coupon = () => {
    const { isInitiated, myCoupons, linkedUsers } = useContext(AppContext);
    const { loading, request } = useRequest();
    const router = useRouter();
    // 이용하는 QR코드에는 딥링크 정보와 함께 ?path=coupon?coupon_id=123456 형식의 coupon_id가 담겨있고, 이를 QR코드로 만들면서 https://qrco.de/65b8c66617169b0592698c57 형식의 url로 감싸고 있다.
    // 카메라에서 qr코드를 읽으면 qr코드 url -> 딥링크 -> 어플리케이션 -> coupon 페이지 -> query data 추출 순으로 쿠폰이 발행된다.
    // 앤서록 어플리케이션에서 쿠폰을 인식하면 qr코드 url -> / 뒤의 id 를 인식하여 쿠폰이 발행된다
    const { coupon_id: couponIdFromQuery } = router.query;
    const { openExternalBrowser, grantCameraPermission } = useFlutter();
    const [stopReissue, setStopReissue, removeStopReissue] =
        useSessionstorage<boolean>('stopReissue');

    const [showIssueNewCouponModal, setShowIssueNewCouponModal] =
        useState(false);
    const [issueMethod, setIssueMethod] = useState<IssueMethodType>('qr-code');
    const [qrResultData, setQrResultData] = useState('');
    const [typedCouponCode, onChangeTypedCouponCode, setTypedCouponCode] =
        useInput('');
    const [showInvalidInformationModal, setShowInvalidInformationModal] =
        useState(false);
    const [showEventEndedModal, setShowEventEndedModal] = useState(false);
    const [showAlreadyIssuedModal, setShowAlreadyIssuedModal] = useState(false);
    // const [showUseCouponModal, setShowUseCouponModal] = useState(false);
    // const [targetCoupon, setTargetCoupon] = useState<CouponType>(dummyCoupon);
    // const [couponPassword, onChangeCouponPassword, setCouponPassword] =
    //     useInput('');

    // issue new coupon with query data
    useEffect(() => {
        if (!couponIdFromQuery || stopReissue) return;
        console.log(couponIdFromQuery);
        issueNewCoupon(couponIdFromQuery as string);
        setStopReissue(true);
    }, [couponIdFromQuery]);

    // after reading qr code
    useEffect(() => {
        if (!qrResultData) return;
        setShowIssueNewCouponModal(false);
        issueNewCoupon(qrDataTranslator(qrResultData));
    }, [qrResultData]);

    const issueNewCoupon = async (couponId: string) => {
        const resIssueCoupon = await request({
            url: `/api/user/issue_coupon`,
            method: 'POST',
            data: { coupon_id: couponId },
        });
        if (resIssueCoupon) {
            const resIssue: ResIssueCouponType = resIssueCoupon.data;
            if (resIssue.is_issued) {
                router.reload();
            } else {
                // 각종 오류 처리
                switch (resIssue.failure_reason) {
                    case 'INVALID COUPON ID':
                    default:
                        setShowInvalidInformationModal(true);
                        break;
                    case 'INVALID COUPON ISSUE PERIOD':
                        setShowEventEndedModal(true);
                        break;
                    case 'SAME COUPON EXISTS':
                        setShowAlreadyIssuedModal(true);
                        break;
                }
            }
        } else {
            // 기타 오류
            setShowInvalidInformationModal(true);
        }
    };

    const beforeShowIssueCouponModal = async () => {
        const isPermitted = await grantCameraPermission();
        if (isPermitted) {
            setShowIssueNewCouponModal(true);
        }
    };

    // password === "0" 쿠폰이 발행되면 유저가 그 즉시 쓸 수 있는(사은품 요청을 할 수 있는) 쿠폰(현재 이용중)
    // password !== "0" 제휴처(상인측)에서 고객(유저)가 제시한 쿠폰에 인증번호를 입력하여 쿠폰 이용을 확인하는 절차에 대한 함수(이용하지 않음. 주석처리)

    // 이걸 어떻게 구분하지?!
    const checkCouponType = () => {};

    // const beforeUseCoupon = (targetCoupon: CouponType) => {
    //     let isValidCoupon =
    //         !targetCoupon.is_used &&
    //         !targetCoupon.used_at &&
    //         new Date().getTime() -
    //             new Date(targetCoupon.expired_at).getTime() <=
    //             0;
    //     if (!isValidCoupon) return;
    //     setTargetCoupon(targetCoupon);
    //     setShowUseCouponModal(true);
    // };

    // const useCoupon = async () => {
    //     const resUseCoupon = await request({
    //         url: `/api/user/use_coupon`,
    //         method: 'PUT',
    //         data: {
    //             coupon_id: targetCoupon.coupon_id,
    //             password: couponPassword,
    //         },
    //     });
    //     if (resUseCoupon) {
    //         const resUse: ResUseCouponType = resUseCoupon.data;
    //         if (!resUse.is_failed) {
    //             router.reload();
    //         } else {
    //             switch (resUse.failure_reason) {
    //                 case 'INVALID COUPON ID':
    //                 default:
    //                     console.log('invalid information');
    //                     break;
    //                 case 'WRONG COUPON PASSWORD':
    //                     setIsWrongPassword(true);
    //                     break;
    //                 case 'EXPIRED COUPON':
    //                     // 만기되면 막아놔서 괜찮다.
    //                     console.log('invalid information');
    //                     break;
    //             }
    //         }
    //     } else {
    //         // 기타 오류
    //         console.log('invalid information');
    //     }
    // };

    // individual coupon validity
    const checkDutchTalk = (): boolean => {
        let judgement = false;
        judgement = linkedUsers.some(
            (linkedUser) => linkedUser.invite_status === 2,
        );
        return judgement;
    };

    return (
        <MainLayout
            title="쿠폰 확인"
            hideBottomNav
            goBackHandler={
                couponIdFromQuery
                    ? () => {
                          window.location.href = '/';
                      }
                    : undefined
            }
        >
            {(!isInitiated || loading) && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {!(!isInitiated || loading) && myCoupons.length === 0 && (
                <LoadingContainer>
                    <Text>아직 발급된 쿠폰이 없습니다</Text>
                    <Gap height="16px" />
                    <Button
                        width="80%"
                        onClickButton={() => beforeShowIssueCouponModal()}
                    >
                        새 쿠폰 발행하기
                    </Button>
                </LoadingContainer>
            )}
            {!(!isInitiated || loading) && myCoupons.length > 0 && (
                <CouponContainer>
                    {myCoupons.map((coupon, i) => (
                        <CouponEachContainer key={coupon.coupon_id}>
                            {coupon.is_used && coupon.used_at ? (
                                <CouponEachBlockContainer>
                                    <Text size="h2">
                                        이용 날짜 :
                                        {convertTime(
                                            coupon.used_at,
                                            'fulldotDateTime',
                                        )}
                                    </Text>
                                </CouponEachBlockContainer>
                            ) : new Date().getTime() -
                                  new Date(coupon.expired_at).getTime() >
                              0 ? (
                                <CouponEachBlockContainer>
                                    <Text size="h2">
                                        이용 기간이 만료되었어요
                                    </Text>
                                </CouponEachBlockContainer>
                            ) : (
                                // dutchtalk
                                !checkDutchTalk() && (
                                    <CouponEachBlockContainer>
                                        <Text size="h2">
                                            가족을 연결해야 이용하실 수 있어요
                                        </Text>
                                        <Gap height="4px" />
                                        <Button
                                            width="120px"
                                            height="40px"
                                            onClickButton={() =>
                                                router.push('/invite')
                                            }
                                        >
                                            가족 초대하기
                                        </Button>
                                    </CouponEachBlockContainer>
                                )
                            )}
                            <CouponEachHeadContainer
                                onClick={() => {
                                    window.location.href =
                                        '/free-gift?gift=65b9bb2317169b0592698c5a&gift=65b9ba6217169b0592698c58&coupon_id=65c43450a3fa72571ce6b317';
                                }}
                            >
                                <Text size="h2">
                                    {convertTime(coupon.deployed_at, 'dotDate')}
                                    &nbsp;&#126;&nbsp;
                                    {convertTime(coupon.expired_at, 'dotDate')}
                                </Text>
                                {/* <CaretRight
                                    width="24px"
                                    height="24px"
                                    color={ORANGE2}
                                /> */}
                                <Text color="orange2">사용하기</Text>
                            </CouponEachHeadContainer>
                            <CouponEachBodyContainer>
                                <CouponEachImageBox>
                                    <Image
                                        src={
                                            coupon.image_url ||
                                            AnswerlogLogoImage
                                        }
                                        alt="image"
                                        layout="fill"
                                    />
                                </CouponEachImageBox>
                                <Gap width="16px" />
                                <CouponEachInfoContainer>
                                    <Text>{coupon.place}</Text>
                                    <Gap height="6px" />
                                    <Text size="h2">{coupon.title}</Text>
                                    <Gap height="6px" />
                                    {coupon.options.map((option, j) => (
                                        <Text size="b2" color="gray4">
                                            {option}
                                        </Text>
                                    ))}
                                </CouponEachInfoContainer>
                            </CouponEachBodyContainer>
                        </CouponEachContainer>
                    ))}
                    <Gap height="16px" />
                    <Button onClickButton={() => beforeShowIssueCouponModal()}>
                        새 쿠폰 발행하기
                    </Button>
                </CouponContainer>
            )}
            {/* 쿠폰 발행 모달 */}
            <BaseModal
                show={showIssueNewCouponModal}
                hideImage
                buttonText={issueMethod === 'qr-code' ? '직접 입력' : 'QR코드'}
                onClickButton={() =>
                    issueMethod === 'qr-code'
                        ? setIssueMethod('text-input')
                        : setIssueMethod('qr-code')
                }
                button2Text="닫기"
                button2Color="gray"
                onClickButton2={() => setShowIssueNewCouponModal(false)}
            >
                {issueMethod === 'qr-code' ? (
                    <QrCodeScanner
                        activateFrame={showIssueNewCouponModal}
                        qrResultData={qrResultData}
                        setQrResultData={setQrResultData}
                    />
                ) : (
                    <>
                        <TextField
                            placeholder="쿠폰 코드를 입력하세요"
                            onChange={onChangeTypedCouponCode}
                        />
                        <Gap height="16px" />
                        <Button
                            color="mandarin"
                            onClickButton={() => {
                                setShowIssueNewCouponModal(false);
                                issueNewCoupon(
                                    couponCodeTranslator(typedCouponCode),
                                );
                            }}
                        >
                            쿠폰 인증하기
                        </Button>
                    </>
                )}
            </BaseModal>
            {/* 발행 오륨 모달 */}
            <BaseModal
                show={showInvalidInformationModal}
                closeOnClickOutside
                customImage={ExclamationImage}
                onClose={() => setShowInvalidInformationModal(false)}
                buttonText="문의하기"
                buttonColor="gray"
                onClickButton={() =>
                    openExternalBrowser('https://pf.kakao.com/_nxeBrxj/chat')
                }
                button2Text="닫기"
                onClickButton2={() => setShowInvalidInformationModal(false)}
            >
                <Text>발행 정보에 오류가 있어요</Text>
                <Text>쿠폰 코드를 정확히 입력하셨나요?</Text>
                <Text>문제가 지속되면 저희에게 알려주세요</Text>
            </BaseModal>
            {/* 발행기간 만료 모달 */}
            <BaseModal
                show={showEventEndedModal}
                closeOnClickOutside
                customImage={ExclamationImage}
                onClose={() => setShowEventEndedModal(false)}
                buttonText="닫기"
                onClickButton={() => setShowEventEndedModal(false)}
            >
                <Text>이벤트 기간이 종료되었어요</Text>
            </BaseModal>
            {/* 중복발행 모달 */}
            <BaseModal
                show={showAlreadyIssuedModal}
                closeOnClickOutside
                customImage={ExclamationImage}
                onClose={() => setShowAlreadyIssuedModal(false)}
                buttonText="닫기"
                onClickButton={() => setShowAlreadyIssuedModal(false)}
            >
                <Text>이미 발급된 쿠폰이에요</Text>
            </BaseModal>
            {/* 인증번호 입력 모달 */}
            {/* <BaseModal
                show={showUseCouponModal}
                closeOnClickOutside
                onClose={() => setShowUseCouponModal(false)}
                customImage={targetCoupon.image_url || undefined}
                buttonText="취소"
                buttonColor="gray"
                onClickButton={() => setShowUseCouponModal(false)}
                button2Text="사용하기"
                onClickButton2={() => useCoupon()}
                disableButton2={isWrongPassword || !couponPassword}
            >
                <Text>쿠폰을 사용하시려면</Text>
                <Text>인증번호를 입력하세요</Text>
                <Gap height="32px" />
                <TextField
                    placeholder="쿠폰 인증 번호를 입력하세요"
                    value={couponPassword}
                    onChange={rewriteCouponPassword}
                    status={isWrongPassword ? 'error' : 'default'}
                    errorMessage="잘못된 인증 번호입니다"
                />
            </BaseModal> */}
            {/* 이용 완료 모달 */}
            {/* <BaseModal
                show={showIssueSuccessModal}
                closeOnClickOutside
                onClose={() => setShowIssueSuccessModal(false)}
                customImage={targetCoupon.image_url || undefined}
                buttonText="확인"
                onClickButton={() => setShowIssueSuccessModal(false)}
            >
                <Text>{targetCoupon.place}</Text>
                <Text>{targetCoupon.title}</Text>
                <Gap height="16px" />
                <Text>쿠폰이 사용되었어요</Text>
            </BaseModal> */}
        </MainLayout>
    );
};
