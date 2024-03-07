import { BaseDivider } from './Divider.styled';

export type BorderType =
    | 'none'
    | 'hidden'
    | 'solid'
    | 'dotted'
    | 'dashed'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';

interface DividerProp {
    margin?: string;
    lineStyle?: BorderType;
}

export const Divider = ({ margin, lineStyle }: DividerProp) => {
    return <BaseDivider margin={margin} lineStyle={lineStyle} />;
};
