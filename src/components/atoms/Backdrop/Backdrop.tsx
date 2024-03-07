import { BaseBackdrop } from './Backdrop.styled';

interface BackdropProp {
    show: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const Backdrop = ({ show, className, children }: BackdropProp) => {
    return (
        <BaseBackdrop className={className} show={show}>
            {children}
        </BaseBackdrop>
    );
};
