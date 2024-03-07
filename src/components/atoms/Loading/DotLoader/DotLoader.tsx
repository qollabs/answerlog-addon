import {
    DotLoaderContainer,
    DotLoaderSizeType,
    LoadingDot,
    LoadingDotBox,
} from './DotLoader.styled';

interface DotLoaderProp {
    size?: DotLoaderSizeType;
}

export const DotLoader = ({ size = 'large' }: DotLoaderProp) => {
    return (
        <DotLoaderContainer size={size}>
            <LoadingDotBox>
                <LoadingDot delay={0} />
            </LoadingDotBox>
            <LoadingDotBox>
                <LoadingDot delay={0.1} />
            </LoadingDotBox>
            <LoadingDotBox>
                <LoadingDot delay={0.2} />
            </LoadingDotBox>
        </DotLoaderContainer>
    );
};
