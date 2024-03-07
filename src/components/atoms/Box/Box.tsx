import { forwardRef } from 'react';

import { BoxContainer } from './Box.styled';

interface BoxProp extends React.ComponentProps<'div'> {
    className?: string;
    children?: React.ReactNode;
}

export const Box = forwardRef<HTMLDivElement, Omit<BoxProp, 'ref'>>(
    ({ className, children, ...rest }, ref) => {
        return (
            <BoxContainer ref={ref} className={className} {...rest}>
                {children}
            </BoxContainer>
        );
    },
);
Box.displayName = 'Box';
