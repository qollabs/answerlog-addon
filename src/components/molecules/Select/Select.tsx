import { FC, ChangeEvent, useState } from 'react';
import { Text } from '@Atoms/Typography';
import { SelectBox, SelectListBox, SelectWrapper } from './Select.styled';
import CaretDownIcon from '@Images/icons/caret_down.svg';
import { GRAY3 } from '@Styles/colors';
import { Gap } from '@Styles/App.styled';
import { BottomDrawer } from '@Molecules/BottomDrawer';
import { TextSizeType } from '@Styles/fonts';

export type SelectValue = string | null;

interface SelectProp {
    list: string[];
    selected: SelectValue;
    setSelected: (selected: SelectValue) => void;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    textSize?: TextSizeType;
    width?: string;
    padding?: string;
}

export const Select = ({
    list,
    selected,
    setSelected,
    label,
    disabled,
    placeholder,
    textSize,
    width,
    padding,
}: SelectProp) => {
    const [showSelectDrawer, setShowSelectDrawer] = useState(false);
    const onSelect = (newSelected: string) => {
        setSelected(newSelected);
        setShowSelectDrawer(false);
    };
    const onClickSelect = () => {
        if (!disabled) {
            setShowSelectDrawer(true);
        }
    };
    return (
        <SelectWrapper width={width}>
            {label && (
                <>
                    <Text size="b2" color="gray4">
                        {label}
                    </Text>
                    <Gap height="4px" />
                </>
            )}

            <SelectBox
                onClick={onClickSelect}
                disabled={disabled}
                padding={padding}
            >
                {placeholder && !selected ? (
                    <Text size={textSize || 'b1'} color="gray2">
                        {placeholder}
                    </Text>
                ) : (
                    <Text size={textSize || 'b1'}>{selected}</Text>
                )}
                <CaretDownIcon width="24px" height="24px" color={GRAY3} />
            </SelectBox>
            <BottomDrawer
                title={label}
                show={showSelectDrawer}
                onClose={() => setShowSelectDrawer(false)}
                closeOnClickOutside
            >
                {list.map((each, i) => (
                    <SelectListBox
                        key={each}
                        isSelected={selected === each}
                        onClick={() => onSelect(each)}
                    >
                        <Text>{each}</Text>
                    </SelectListBox>
                ))}
            </BottomDrawer>
        </SelectWrapper>
    );
};
