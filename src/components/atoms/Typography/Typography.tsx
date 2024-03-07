import { AppContext } from '@Pages/_app';
import { ColorType } from '@Styles/colors';
import { TextSizePreferenceType, TextSizeType } from '@Styles/fonts';
import { useContext } from 'react';
import { BaseText } from './Typography.styled';
import { forwardRef } from 'react';

interface TextProp extends React.ComponentProps<'span'> {
    size?: TextSizeType;
    color?: ColorType;
    textAlign?: string;
    textDecoration?: string;
    underline?: boolean;
    bold?: boolean;
    forcedTextPref?: TextSizePreferenceType;
    children?: React.ReactNode;
}

export const Text = forwardRef<HTMLSpanElement, Omit<TextProp, 'ref'>>(
    (
        {
            size,
            color,
            textAlign,
            textDecoration,
            underline,
            bold,
            forcedTextPref,
            children,
            ...rest
        },
        ref,
    ) => {
        const { textSizePref } = useContext(AppContext);
        return (
            <BaseText
                textDecoration={textDecoration}
                ref={ref}
                size={size}
                color={color}
                textAlign={textAlign}
                bold={bold}
                underline={underline}
                pref={
                    forcedTextPref ?? (textSizePref as TextSizePreferenceType)
                }
                {...rest}
            >
                {children}
            </BaseText>
        );
    },
);

// interface TextProp {
//     size?: TextSizeType;
//     color?: ColorType;
//     textAlign?: string;
//     forcedTextPref?: TextSizePreferenceType;
//     children?: React.ReactNode;
// }

// export const Text = ({
//     size,
//     color,
//     textAlign,
//     forcedTextPref,
//     children,
// }: TextProp) => {
//     const { textSizePref } = useContext(AppContext);
//     return (
//         <BaseText
//             size={size}
//             color={color}
//             textAlign={textAlign}
//             pref={forcedTextPref ?? (textSizePref as TextSizePreferenceType)}
//         >
//             {children}
//         </BaseText>
//     );
// };
