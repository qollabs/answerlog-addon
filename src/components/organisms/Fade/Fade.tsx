import { useScrollFadeIn, Direction } from '@Hooks/useScrollFadeIn';
import { FadeContainer } from './Fade.styled';

interface FadeProp {
    direction?: Direction;
    duration?: number;
    delay?: number;
    threshold?: number;
    className?: string;
    children?: React.ReactNode;
}
export const Fade = ({
    direction = 'up',
    duration = 1,
    delay = 0,
    threshold = 0.5,
    className,
    children,
}: FadeProp) => {
    const fadeProps = useScrollFadeIn(direction, duration, delay, threshold);

    return (
        <FadeContainer className={className} {...fadeProps}>
            {children}
        </FadeContainer>
    );
};
