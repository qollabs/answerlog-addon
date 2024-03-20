import { OuterlinkPatch } from '@Molecules/OuterlinkPatch';
import { PatchBundleContainer } from './PatchBundle.styled';
import QollabsIconLogo from '@Images/logos/qollabs_icon_white_filled.svg';
import GoogleIconLogo from '@Images/logos/google_icon.svg';
import AppleIconLogo from '@Images/logos/apple_icon.svg';

export const PatchBundle = () => {
    return (
        <PatchBundleContainer>
            <OuterlinkPatch
                logo={<QollabsIconLogo />}
                mainText="Quality of Life Labs"
                subText="Visit Homepage of"
                link="https://qollabs.care"
            />
            <OuterlinkPatch
                logo={<GoogleIconLogo />}
                mainText="Google Play"
                mainTextStyle={{
                    fontFamily: 'Product-sans NanumSquareNeo',
                    fontSize: '20px',
                    fontWeight: 'normal',
                }}
                subText="GET IT ON"
                subTextStyle={{
                    fontFamily: 'Product-sans NanumSquareNeo',
                    fontSize: '16px',
                    fontWeight: 'normal',
                }}
                link="https://play.google.com/store/apps/details?id=com.sabuzak_m&pcampaignid=web_share"
            />
            <OuterlinkPatch
                logo={<AppleIconLogo />}
                mainText="App Store"
                mainTextStyle={{
                    fontFamily: 'SF-Pro NanumSquareNeo',
                    fontSize: '20px',
                    fontWeight: 'normal',
                }}
                subText="Download on the"
                subTextStyle={{
                    fontFamily: 'SF-Pro NanumSquareNeo',
                    fontSize: '16px',
                    fontWeight: 'normal',
                }}
                link="https://apps.apple.com/kr/app/%EC%95%A4%EC%84%9C%EB%A1%9D-%EA%B0%80%EC%A1%B1-%EC%86%8C%ED%86%B5-%EC%95%B1/id6448796716"
            />
        </PatchBundleContainer>
    );
};
