import { IconButtonContainer } from './IconButton.styled';

interface IconButtonProp {
    onClickButton?: () => void;
    width?: string;
    height?: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const IconButton = ({
    onClickButton,
    width,
    height,
    disabled,
    className,
    children,
}: IconButtonProp) => {
    return (
        <IconButtonContainer
            width={width}
            height={height}
            className={className}
            onClick={onClickButton}
            disabled={disabled}
        >
            {children}
        </IconButtonContainer>
    );
};
