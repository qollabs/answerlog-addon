import { forwardRef } from 'react';

import { BaseContainer } from './Container.styled';

interface ContainerProp extends React.ComponentProps<'div'> {
    className?: string;
    children?: React.ReactNode;
}

export const Container = forwardRef<HTMLDivElement, Omit<ContainerProp, 'ref'>>(
    ({ className, children, ...rest }, ref) => {
        return (
            <BaseContainer ref={ref} className={className} {...rest}>
                {children}
            </BaseContainer>
        );
    },
);
Container.displayName = 'Container';
