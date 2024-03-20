import { CSSProperties } from 'react';
import { Gap } from '@Styles/App.styled';
import {
    OuterlinkPatchContainer,
    OuterlinkPatchLogoBox,
    OuterlinkPatchMainText,
    OuterlinkPatchSubText,
    OuterlinkPatchTextContainer,
    OuterlinkPatchWrapper,
} from './OuterlinkPatch.styled';

export type OuterlinkPatchSizeType = 'default' | 'big' | 'small';

interface OuterlinkPatchProp {
    size?: OuterlinkPatchSizeType;
    logo: JSX.Element;
    mainText: string;
    mainTextStyle?: CSSProperties;
    subText?: string;
    subTextStyle?: CSSProperties;
    link?: string;
}

export const OuterlinkPatch = ({
    size = 'default',
    logo,
    mainText,
    mainTextStyle,
    subText,
    subTextStyle,
    link,
}: OuterlinkPatchProp) => {
    return (
        <OuterlinkPatchWrapper href={link} target="_blank">
            <OuterlinkPatchContainer size={size}>
                <OuterlinkPatchLogoBox size={size}>
                    {logo}
                </OuterlinkPatchLogoBox>
                <OuterlinkPatchTextContainer>
                    {subText && size !== 'small' && (
                        <OuterlinkPatchSubText
                            size={size}
                            style={subTextStyle}
                            customStyle={!!mainTextStyle}
                        >
                            {subText}
                        </OuterlinkPatchSubText>
                    )}
                    <OuterlinkPatchMainText
                        size={size}
                        style={mainTextStyle}
                        customStyle={!!subTextStyle}
                    >
                        {mainText}
                    </OuterlinkPatchMainText>
                </OuterlinkPatchTextContainer>
            </OuterlinkPatchContainer>
        </OuterlinkPatchWrapper>
    );
};
