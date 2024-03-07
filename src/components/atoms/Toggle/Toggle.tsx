import { FC } from 'react';

import { Text } from '@Atoms/Typography';
import { BaseRadioButton, RadioButtonContainer, Label } from './Toggle.styled';

interface ToggleProp {
    checked: boolean;
    setChecked: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
    miniSize?: boolean;
}

export const Toggle: FC<ToggleProp> = ({
    checked,
    setChecked,
    label,
    disabled,
    className,
    miniSize,
}) => {
    return (
        <RadioButtonContainer>
            <Text size={miniSize ? 'c1' : 'b2'}>{label}</Text>
            <BaseRadioButton
                id={label ?? 'toggle'}
                onChange={() => setChecked(!checked)}
                className={className}
                checked={checked}
                disabled={disabled}
                type="checkbox"
                miniSize={miniSize}
            />
            <Label htmlFor={label ?? 'toggle'} miniSize={miniSize} />
        </RadioButtonContainer>
    );
};
