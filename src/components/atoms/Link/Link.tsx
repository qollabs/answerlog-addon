import { forwardRef, ReactNode } from 'react';
import NextLink from 'next/link';

import { PlainLink } from './Link.styled';

interface LinkProp {
    href: string;
    className?: string;
    children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProp>(
    ({ href, className, children }, ref) => {
        return (
            <NextLink href={href} passHref>
                <PlainLink className={className} ref={ref}>
                    {children}
                </PlainLink>
            </NextLink>
        );
    },
);
