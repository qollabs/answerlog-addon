import {
    DragEvent,
    FC,
    MouseEvent,
    ReactNode,
    TouchEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Backdrop } from '@Atoms/Backdrop';
import {
    DragBarContainer,
    DrawerBar,
    DrawerChildrenContainer,
    DrawerContainer,
} from './BottomDrawer.styled';
import { useBodyScrollLock } from '@Hooks/useBodyScrollLock';
import { useOnClickOutside } from '@Hooks/useOnClickOutside';
import { Gap } from '@Styles/App.styled';
import { Container } from '@Atoms/Container';
import { Text } from '@Atoms/Typography';

interface BottomDrawerProp {
    show: boolean;
    title?: string | ReactNode;
    height?: string;
    onClose?: () => void;
    closeOnClickOutside?: boolean;
    className?: string;
}

export const BottomDrawer: FC<BottomDrawerProp> = ({
    show,
    title,
    height,
    onClose,
    closeOnClickOutside,
    className,
    children,
}) => {
    useBodyScrollLock(true);
    const drawerRef = useOnClickOutside<HTMLDivElement>(onClose);

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [isDragStarted, setIsDragStarted] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    // const [changedHeight, setChangedHeight] = useState(0);

    // change show state
    useEffect(() => {
        if (show) {
            // setChangedHeight(0);
            setShowBackdrop(true);
            setShowDrawer(true);
        } else {
            setShowDrawer(false);
            setTimeout(() => {
                setShowBackdrop(false);
            }, 150);
        }
    }, [show]);

    // const getDragStartCoordinate = (e: DragEvent<HTMLDivElement>) => {
    //     if (!drawerRef?.current) return;
    //     setIsDragStarted(true);
    //     let drawer = drawerRef.current;
    //     setDragStartY(e.clientY);
    //     setOriginalHeight(drawer.offsetHeight);
    // };

    // const getDragMoveCoordinate = (e: DragEvent<HTMLDivElement>) => {
    //     if (!drawerRef?.current) return;
    //     let dragMoveY = e.clientY;
    //     if (dragMoveY === 0) return;
    //     let changedY = dragMoveY - dragStartY;
    //     setChangedHeight(originalHeight - changedY);
    // };

    // const onDragEndDrawer = () => {
    //     if (changedHeight > 100) {
    //         setChangedHeight(0);
    //         setDragStartY(0);
    //     } else {
    //         onClose && onClose();
    //         setIsDragStarted(false);
    //     }
    // };

    // const getMouseStartCoordinate = (e: MouseEvent<HTMLDivElement>) => {
    //     if (!drawerRef?.current) return;
    //     let drawer = drawerRef.current;
    //     setDragStartY(e.clientY);
    //     setOriginalHeight(drawer.offsetHeight);
    // };

    // const getMouseMoveCoordinate = (e: MouseEvent<HTMLDivElement>) => {
    //     if (!drawerRef?.current) return;
    //     let dragMoveY = e.clientY;
    //     if (dragMoveY === 0) return;
    //     let changedY = dragMoveY - dragStartY;
    //     setChangedHeight(originalHeight - changedY);
    // };

    // const onMouseEndDrawer = () => {
    //     if (changedHeight > 100) {
    //         setChangedHeight(0);
    //         setDragStartY(0);
    //     } else {
    //         onClose && onClose();
    //     }
    // };

    // const getTouchStartCoordinate = (e: TouchEvent<HTMLDivElement>) => {
    //     if (!drawerRef?.current) return;
    //     let drawer = drawerRef.current;
    //     setTouchStartY(e.touches[0].clientY);
    //     setOriginalHeight(drawer.offsetHeight);
    // };

    // const getTouchMoveCoordinate = (e: TouchEvent<HTMLDivElement>) => {
    //     if (!drawerRef?.current) return;
    //     let dragMoveY = e.touches[0].clientY;
    //     if (dragMoveY === 0) return;
    //     let changedY = dragMoveY - dragStartY;
    //     setChangedHeight(originalHeight - changedY);
    // };

    // const onTouchEndDrawer = () => {
    //     if (changedHeight > 100) {
    //         setChangedHeight(0);
    //         setDragStartY(0);
    //     } else {
    //         onClose && onClose();
    //     }
    // };

    return (
        <Backdrop show={showBackdrop}>
            <DrawerContainer
                className={className}
                height={height}
                // changedHeight={
                //     changedHeight > 0 ? `${changedHeight}px` : undefined
                // }
                ref={closeOnClickOutside ? drawerRef : undefined}
                show={showDrawer}
            >
                <DragBarContainer
                // draggable
                // onDragStart={getDragStartCoordinate}
                // onDrag={getDragMoveCoordinate}
                // onDragEnd={onDragEndDrawer}
                // onTouchStart={getTouchStartCoordinate}
                // onTouchMove={getTouchMoveCoordinate}
                // onTouchEnd={onTouchEndDrawer}
                // onMouseDown={getMouseStartCoordinate}
                // onMouseMove={getMouseMoveCoordinate}
                // onMouseUp={onMouseEndDrawer}
                >
                    <Gap height="16px" />
                    <DrawerBar />
                    <Gap height="32px" />
                </DragBarContainer>
                {title && (
                    <Container>
                        <Text size="h2">{title}</Text>
                        <Gap height="32px" />
                    </Container>
                )}
                <DrawerChildrenContainer>{children}</DrawerChildrenContainer>
            </DrawerContainer>
        </Backdrop>
    );
};
