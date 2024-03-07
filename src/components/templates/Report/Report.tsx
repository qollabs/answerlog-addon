import { useState, useEffect } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import {
    ReportCardBlockContainer,
    ReportCardContainer,
    ReportCardTextContainer,
    ReportContainer,
} from './Report.styled';
import { CardSection } from '@Molecules/CardSection';
import { Text } from '@Atoms/Typography';
import { ImageBox } from '@Atoms/ImageBox';
import { categoryPicker } from '@Functions/categoryPicker';
import { Gap } from '@Styles/App.styled';
import { IQnA, IReport } from '@Types/types';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { useRequest } from '@Hooks/useRequest';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { useRouter } from 'next/router';
import { Button } from '@Atoms/Button';
import * as ga from '../../../lib/ga/gtag';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export const Report = () => {
    const router = useRouter();
    const { loading, request } = useRequest();
    const { actionOnTouchEnd } = useActionOnTouch();

    const [reports, setReports] = useState<IReport[]>([]);

    // get reports
    useAsyncEffect(async () => {
        const resReports = await request({
            url: '/api/report',
            method: 'GET',
        });
        if (resReports) {
            console.log(resReports.data);
            setReports(resReports.data.reverse());
        }
    }, []);

    const goToReportDetail = (report: IReport) => {
        if (report.answered_at) {
            ga.event({
                action: 'select_content',
                params: {
                    content_type: 'report',
                    content_id: report.question_id,
                },
            });
            router.push(`/report/${report.question_id}`);
        }
    };

    return (
        <MainLayout hideBackButton title="리포트">
            {loading && (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            )}
            {!loading && reports.length === 0 && (
                <LoadingContainer>
                    <Text>아직 볼 수 있는 리포트가 없어요</Text>
                    <Gap height="8px" />
                    <Text>
                        질문에 답을 하실수록 더 많은 리포트를 볼 수 있어요
                    </Text>
                    <Gap height="32px" />
                    <Button
                        width="60%"
                        onClickButton={() => router.push('/qna')}
                    >
                        문답 확인하기
                    </Button>
                </LoadingContainer>
            )}
            {!loading && reports.length > 0 && (
                <ReportContainer>
                    {reports.map((report, i) => (
                        <CardSection key={report.question_id} deepShadow>
                            <ReportCardContainer
                                onClick={() => goToReportDetail(report)}
                                onTouchEnd={(e) =>
                                    actionOnTouchEnd(e, () =>
                                        goToReportDetail(report),
                                    )
                                }
                            >
                                {!report.answered_at && (
                                    <ReportCardBlockContainer>
                                        <Text>
                                            질문에 답변하신 이후 확인할 수
                                            있어요!
                                        </Text>
                                    </ReportCardBlockContainer>
                                )}
                                <ImageBox
                                    width="64px"
                                    height="64px"
                                    image={
                                        categoryPicker(report.question_category)
                                            .image
                                    }
                                />
                                <Gap width="8px" />
                                <ReportCardTextContainer>
                                    <Text>{report.question_title}</Text>
                                    <Text size="c1">
                                        우리들의 {report.question_set_num}번째
                                        이야기
                                    </Text>
                                </ReportCardTextContainer>
                            </ReportCardContainer>
                        </CardSection>
                    ))}
                </ReportContainer>
            )}
        </MainLayout>
    );
};
