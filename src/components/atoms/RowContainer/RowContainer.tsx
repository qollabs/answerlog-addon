import { forwardRef } from 'react';

import { BaseRowContainer } from './RowContainer.styled';

interface ContainerProp extends React.ComponentProps<'div'> {
    className?: string;
    children?: React.ReactNode;
}

export const RowContainer = forwardRef<
    HTMLDivElement,
    Omit<ContainerProp, 'ref'>
>(({ className, children, ...rest }, ref) => {
    return (
        <BaseRowContainer ref={ref} className={className} {...rest}>
            {children}
        </BaseRowContainer>
    );
});
RowContainer.displayName = 'RowContainer';
