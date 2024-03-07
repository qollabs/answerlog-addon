import {
    LoadingSpin,
    SpinLoaderConatiner,
    SpinLoaderSizeType,
} from './SpinLoader.styled';

interface SpinLoaderProp {
    size?: SpinLoaderSizeType;
}

export const SpinLoader = ({ size = 'large' }: SpinLoaderProp) => {
    return (
        <SpinLoaderConatiner size={size}>
            <LoadingSpin delay={0} />
            <LoadingSpin delay={-0.45} />
            <LoadingSpin delay={-0.3} />
            <LoadingSpin delay={-0.15} />
        </SpinLoaderConatiner>
    );
};
