import { useContext, useEffect, useState } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import React from 'react';
import { useRequest } from '@Hooks/useRequest';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { AlertType } from '@Types/types';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { Button } from '@Atoms/Button';
import { useRouter } from 'next/router';
import {
    AlertContainer,
    AlertContentContainer,
    AlertContentTextContainer,
    AlertIconBox,
    AlertSubContainer,
    AlertTitleContainer,
} from './Alert.styled';
import { convertTime } from '@Functions/convertTime';
import { AppContext } from '@Pages/_app';
import { AlertTypePicker } from '@Functions/categoryPicker';
import { ORANGE3 } from '@Styles/colors';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export const Alert = () => {
    const { alerts, isInitiated, setRecentLinkedUser, linkedUsers } =
        useContext(AppContext);
    const router = useRouter();
    const { prevPage } = router.query;
    const { request } = useRequest();
    const { actionOnTouchEnd } = useActionOnTouch();

    const [newAlerts, setNewAlerts] = useState<AlertType[]>([]);
    const [oldAlerts, setOldAlerts] = useState<AlertType[]>([]);

    // distriute alerts
    useEffect(() => {
        if (!alerts) return;
        let alertsTemp = [...alerts];
        let newAlertsTemp: AlertType[] = [];
        let oldAlertsTemp: AlertType[] = [];

        alertsTemp.forEach((alert, index) => {
            let now = new Date();
            let then = new Date(alert.date);
            let timeDiff = now.getTime() - then.getTime();
            if (timeDiff < 14 * 24 * 60 * 60 * 1000) {
                newAlertsTemp.push(alert);
            } else if (timeDiff < 9 * 7 * 24 * 60 * 60 * 1000) {
                oldAlertsTemp.push(alert);
            }
        });
        newAlertsTemp.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        oldAlertsTemp.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setNewAlerts(newAlertsTemp);
        setOldAlerts(oldAlertsTemp);
    }, [alerts]);

    const goBackFromAlert = () => {
        if (prevPage) {
            router.push(prevPage as string);
        } else {
            window.location.href = '/';
        }
    };

    const goToAlertLink = async (targetId: string, targetLink: string) => {
        // link를 어떻게 할지 안정했으므로 아무것도 하지 않는다.
        // 탈퇴한 회원과 연결되는 경우는 어떻게 해야하지?
        if (!targetLink) return;
        let targetLinkedUser = [...linkedUsers].find(
            (user) => user.id === targetId,
        );
        if (targetLinkedUser) {
            const resPatchRecent = await request({
                url: '/api/user/recent_link',
                method: 'PATCH',
                data: {
                    recent_user_link_id: targetLinkedUser.user_link_id,
                },
            });
            if (resPatchRecent) {
                let { invite_status, ...rest } = targetLinkedUser;
                setRecentLinkedUser(rest);
            }
        }

        router.push(targetLink);
    };
    return (
        <MainLayout
            whiteBackground
            goBackHandler={goBackFromAlert}
            hideBottomNav
        >
            {!isInitiated && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {isInitiated && alerts && alerts.length === 0 && (
                <LoadingContainer>
                    <Text>새로운 소식이 없어요</Text>
                    <Gap height="32px" />
                    <Button width="60%" onClickButton={() => router.push('/')}>
                        홈으로 돌아가기
                    </Button>
                </LoadingContainer>
            )}
            {isInitiated && alerts && alerts.length > 0 && (
                <AlertContainer>
                    <AlertSubContainer>
                        <AlertTitleContainer>
                            <Text size="h2">새로운 알림</Text>
                            <Gap height="24px" />
                        </AlertTitleContainer>
                        {newAlerts.map((alert, i) => (
                            <AlertContentContainer
                                onClick={() =>
                                    goToAlertLink(
                                        alert.related_user_id,
                                        alert.link,
                                    )
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        goToAlertLink(
                                            alert.related_user_id,
                                            alert.link,
                                        ),
                                    )
                                }
                            >
                                <AlertIconBox>
                                    {AlertTypePicker(
                                        alert.type,
                                        '24px',
                                        ORANGE3,
                                    )}
                                </AlertIconBox>
                                <AlertContentTextContainer>
                                    <Text>{alert.content}</Text>
                                    <Text size="c1" color="gray4">
                                        {convertTime(alert.date, 'dotDate')}
                                    </Text>
                                </AlertContentTextContainer>
                            </AlertContentContainer>
                        ))}
                    </AlertSubContainer>
                    <AlertSubContainer>
                        <AlertTitleContainer>
                            <Text size="h2">지난 알림</Text>
                            <Gap height="24px" />
                        </AlertTitleContainer>
                        {oldAlerts.map((alert, i) => (
                            <AlertContentContainer
                                onClick={() =>
                                    goToAlertLink(
                                        alert.related_user_id,
                                        alert.link,
                                    )
                                }
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        goToAlertLink(
                                            alert.related_user_id,
                                            alert.link,
                                        ),
                                    )
                                }
                            >
                                <AlertIconBox>
                                    {AlertTypePicker(
                                        alert.type,
                                        '24px',
                                        ORANGE3,
                                    )}
                                </AlertIconBox>
                                <AlertContentTextContainer>
                                    <Text>{alert.content}</Text>
                                    <Text size="c1" color="gray4">
                                        {convertTime(alert.date, 'dotDate')}
                                    </Text>
                                </AlertContentTextContainer>
                            </AlertContentContainer>
                        ))}
                    </AlertSubContainer>
                </AlertContainer>
            )}
        </MainLayout>
    );
};
