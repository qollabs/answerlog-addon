import { IGift, IIncartGift } from '@Types/types';
import { MallMenuType } from '../Mall';
import { MallMenuButton, MallNavContainer } from '../Mall.styled';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

interface MallNavProp {
    menu: MallMenuType;
    setMenu: (menu: MallMenuType) => void;
    interestedGifts: IGift[];
    incartGifts: IIncartGift[];
}

export const MallNav = ({
    menu,
    setMenu,
    interestedGifts,
    incartGifts,
}: MallNavProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();
    return (
        <MallNavContainer>
            <MallMenuButton
                selected={menu === 'recommended'}
                onClick={() => setMenu('recommended')}
                onTouchEnd={(e) =>
                    actionOnTouchEnd(e, () => setMenu('recommended'))
                }
            >
                오늘의 발견
            </MallMenuButton>
            <MallMenuButton
                selected={menu === 'interested'}
                onClick={() => setMenu('interested')}
                onTouchEnd={(e) =>
                    actionOnTouchEnd(e, () => setMenu('interested'))
                }
            >
                관심 선물{`(${interestedGifts.length})`}
            </MallMenuButton>
            <MallMenuButton
                selected={menu === 'cart'}
                onClick={() => setMenu('cart')}
                onTouchEnd={(e) => actionOnTouchEnd(e, () => setMenu('cart'))}
            >
                장바구니{`(${incartGifts.length})`}
            </MallMenuButton>
        </MallNavContainer>
    );
};
