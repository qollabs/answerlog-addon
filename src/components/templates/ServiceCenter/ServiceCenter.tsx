import { Divider } from '@Atoms/Divider';
import { Link } from '@Atoms/Link';
import { Text } from '@Atoms/Typography';
import { MainLayout } from '@Organisms/MainLayout';
import { Gap } from '@Styles/App.styled';
import {
    ServiceCenterContainer,
    ServiceCenterWrapper,
    ServiceCenterLinkContainer,
} from './ServiceCenter.styled';
import { useFlutter } from '@Hooks/useFlutter';
import { qollabs } from '@Constants/globalConstants';

export const ServiceCenter = () => {
    const { openExternalBrowser, activatePhoneCall } = useFlutter();
    return (
        <MainLayout title="고객 센터" hideBottomNav>
            <ServiceCenterWrapper>
                <ServiceCenterContainer>
                    <Text size="h2">앤서록(Answerlog)</Text>
                    <Gap height="16px" />
                    <Divider />
                    <Gap height="16px" />
                    <Text size="b2">
                        이메일 :{' '}
                        <Text size="b2" color="gray4">
                            info@qollabs.care
                        </Text>
                    </Text>
                    <Gap height="4px" />
                    <Text size="b2">
                        카카오톡 :{' '}
                        <Text
                            size="b2"
                            color="mandarin2"
                            onClick={() =>
                                openExternalBrowser(
                                    'https://pf.kakao.com/_nxeBrxj/chat',
                                )
                            }
                        >
                            앤서록
                        </Text>
                    </Text>
                    <Gap height="4px" />
                    <Text size="b2">
                        전화문의 :{' '}
                        <Text
                            size="b2"
                            color="mandarin2"
                            onClick={() => activatePhoneCall('16883242')}
                        >
                            1688-3242
                        </Text>
                    </Text>
                    <Gap height="16px" />
                    <Divider />
                </ServiceCenterContainer>
                <Gap height="16px" />
                <ServiceCenterContainer>
                    <Text size="h2">사업자 정보</Text>
                    <Gap height="16px" />
                    <Divider />
                    <Gap height="16px" />
                    <Text size="b2">
                        상호명 :{' '}
                        <Text size="b2" color="gray4">
                            {qollabs.title}
                        </Text>
                    </Text>
                    <Gap height="4px" />
                    <Text size="b2">
                        대표자명 :{' '}
                        <Text size="b2" color="gray4">
                            {qollabs.ceo}
                        </Text>
                    </Text>
                    <Gap height="4px" />
                    <Text size="b2">
                        사업자등록번호 :{' '}
                        <Text size="b2" color="gray4">
                            {qollabs.companyRegistrationNumber}
                        </Text>
                    </Text>
                    <Gap height="4px" />
                    <Text size="b2">
                        주소 :{' '}
                        <Text size="b2" color="gray4">
                            {qollabs.address}
                        </Text>
                    </Text>
                    <Gap height="4px" />
                    <Text size="b2">
                        유선번호 :{' '}
                        <Text size="b2" color="gray4">
                            {qollabs.phoneNumber}
                        </Text>
                    </Text>
                    <Gap height="4px" />
                    <Text size="b2">
                        통신판매업 신고번호 :{' '}
                        <Text size="b2" color="gray4">
                            {qollabs.mailOrderBusinessReportNumber}
                        </Text>
                    </Text>
                    <Gap height="16px" />
                    <Divider />
                    <Gap height="16px" />
                    <ServiceCenterLinkContainer>
                        <Link href="/policy/terms">
                            <Text size="b2" color="mandarin2">
                                이용약관
                            </Text>
                        </Link>
                        <Gap width="8px" />
                        <Link href="/policy/privacy">
                            <Text size="b2" color="mandarin2">
                                개인정보 처리방침
                            </Text>
                        </Link>
                    </ServiceCenterLinkContainer>
                </ServiceCenterContainer>
            </ServiceCenterWrapper>
        </MainLayout>
    );
};
