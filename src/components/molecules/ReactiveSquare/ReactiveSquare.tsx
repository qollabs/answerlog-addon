import React from 'react';
import {
    ReactiveSquareInnerContainer,
    ReactiveSquareOuterBox,
} from './ReactiveSquare.styled';

interface ReactiveSquareProp {
    width?: string;
    padding?: string;
    borderRadius?: string;
    backgroundColor?: string;
    hideOverflow?: boolean;
    children?: React.ReactNode;
}

export const ReactiveSquare = ({
    width,
    padding,
    borderRadius,
    backgroundColor,
    hideOverflow,
    children,
}: ReactiveSquareProp) => {
    return (
        <ReactiveSquareOuterBox
            width={width}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
        >
            <ReactiveSquareInnerContainer
                padding={padding}
                borderRadius={borderRadius}
                hideOverflow={hideOverflow}
            >
                {children}
            </ReactiveSquareInnerContainer>
        </ReactiveSquareOuterBox>
    );
};
