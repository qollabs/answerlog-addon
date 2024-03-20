import { MainLayout } from '@Organisms/MainLayout';
import AnswerlogIconLogo from '@Images/logos/answerlog_icon.svg';
import {
    HomeContainer,
    HomeContentContainer,
    HomeInfoContainer,
    HomeTitleContainer,
} from './Home.styled';
import { Text } from '@Atoms/Typography';
import { Gap } from '@Styles/App.styled';
import { qollabs } from '@Constants/globalConstants';
import { OuterlinkPatch } from '@Molecules/OuterlinkPatch';
import QollabsIconLogo from '@Images/logos/qollabs_icon_white_filled.svg';
import { PatchBundle } from '@Organisms/PatchBundle';

export const Home = () => {
    return (
        <MainLayout>
            <HomeContainer>
                <HomeTitleContainer>
                    <AnswerlogIconLogo width="24px" />
                    <Gap width="4px" />
                    <Text size="h2">앤서록(Answerlog) - 가족 소통 앱</Text>
                </HomeTitleContainer>
                <Gap height="16px" />
                <HomeContentContainer>
                    <Text>
                        · 본 페이지는 Google Playstore 및 Apple Appstore를 위한
                        부가 정보를 담고 있는 페이지입니다.
                    </Text>
                    <Gap height="16px" />
                    <Text>
                        · 제품에 대한 자세한 문의 사항은 직접 문의주시면 성심껏
                        답변드리겠습니다.
                    </Text>
                    <Gap height="32px" />
                    <HomeInfoContainer>
                        <Text size="h3">{qollabs.title.value}</Text>
                        <Gap height="6px" />
                        <Text>
                            {qollabs.ceo.label} : {qollabs.ceo.value}
                        </Text>
                        <Text>
                            {qollabs.companyRegistrationNumber.label} :{' '}
                            {qollabs.companyRegistrationNumber.value}
                        </Text>
                        <Text>
                            {qollabs.address.label} : {qollabs.address.value}
                        </Text>
                        <Text>
                            {qollabs.phoneNumber.label} :{' '}
                            {qollabs.phoneNumber.value}
                        </Text>
                        <Text>
                            {qollabs.email.label} : {qollabs.email.value}
                        </Text>
                        <Text>
                            {qollabs.mailOrderBusinessReportNumber.label} :{' '}
                            {qollabs.mailOrderBusinessReportNumber.value}
                        </Text>
                    </HomeInfoContainer>
                    <Gap height="48px" />
                    <PatchBundle />
                </HomeContentContainer>
            </HomeContainer>
        </MainLayout>
    );
};
