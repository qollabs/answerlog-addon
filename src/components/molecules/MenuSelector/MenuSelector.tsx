import { useEffect, useState } from 'react';
import {
    MenuSelectorContainer,
    MenuSelectorMenuBox,
} from './MenuSelector.styled';
import { Text } from '@Atoms/Typography';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { Gap } from '@Styles/App.styled';

interface MenuSelectorProp {
    menus: string[];
    selectedMenu: string;
    setSelectedMenu: (selectedMenu: any) => void;
    menuIcons?: any[];
}

export const MenuSelector = ({
    menus,
    selectedMenu,
    setSelectedMenu,
    menuIcons,
}: MenuSelectorProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();
    return (
        <MenuSelectorContainer>
            {menus.map((menu, i) => (
                <MenuSelectorMenuBox
                    key={menu}
                    selected={menu === selectedMenu}
                    onClick={() => setSelectedMenu(menu)}
                    onTouchEnd={(e) =>
                        actionOnTouchEnd(e, () => setSelectedMenu(menu))
                    }
                    numberOfMenus={menus.length}
                >
                    <Text color={menu === selectedMenu ? 'white' : 'gray5'}>
                        {menu}
                    </Text>
                    <Gap width="4px" />
                    {menuIcons && menuIcons.length > 0 && menuIcons[i]}
                </MenuSelectorMenuBox>
            ))}
        </MenuSelectorContainer>
    );
};
