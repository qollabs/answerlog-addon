import {
    useState,
    useEffect,
    useRef,
    TouchEvent,
    MouseEvent,
    useContext,
} from 'react';

import {
    ProgressBarCircle,
    ProgressBarCircleAnimation,
    ProgressBarCircleContainer,
    ProgressBarContainer,
    ProgressBarImageContainer,
    ProgressBarInnerStick,
    ProgressBarOuterStick,
} from './ProgressBar.styled';

import CheckCircle from '@Images/icons/check_circle.svg';
import { Text } from '@Atoms/Typography';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { mobileDetector } from '@Functions/browserDetector';
import { AppContext } from '@Pages/_app';

interface ProgressBarProp {
    max: number;
    value: number;
    withoutNode?: boolean;
    nodeTexts?: string[];
    forAudio?: boolean;
    isAnimationActivated?: boolean;
    setTargetTime?: (targetTime: number) => void;
}

export const ProgressBar = ({
    max,
    value,
    withoutNode,
    nodeTexts,
    forAudio,
    isAnimationActivated,
    setTargetTime,
}: ProgressBarProp) => {
    const { isMobile } = useContext(AppContext);
    const [states, setStates] = useState<string[]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const progressBarRef = useRef<HTMLDivElement>(null);

    // setState
    useEffect(() => {
        let statesTemp: string[] = [];
        for (let i = 0; i <= max; i++) {
            let toBePushed = nodeTexts ? nodeTexts[i] || '' : '';
            statesTemp.push(toBePushed);
        }
        setStates(statesTemp);
    }, [max, nodeTexts]);

    // actionOnTouchEnd 함수가 e.preventDefault()를 통해 클릭 이벤트를 막고 함수를 실행하는데 그렇기 때문에 e가 들어가는 action이 모두 막힌다.

    const changeTargetTime = (e: MouseEvent) => {
        if (!progressBarRef.current || !setTargetTime || !isMouseDown) return;
        // 정확히 progressbar가 아닌 컨테이너에 ref가 가 있기 때문에 padding 값을 제외해주어야 한다.
        const barWidth = progressBarRef.current.offsetWidth - 16;
        const relativeX =
            e.clientX - progressBarRef.current.getBoundingClientRect().left - 8;
        setTargetTime((relativeX / barWidth) * max);
    };

    const changeTargetTimeOnTouch = (e: TouchEvent) => {
        if (!progressBarRef.current || !setTargetTime || !isMouseDown) return;
        const barWidth = progressBarRef.current.offsetWidth - 16;
        const relativeX =
            e.changedTouches[0].clientX -
            progressBarRef.current.getBoundingClientRect().left -
            8;
        setTargetTime((relativeX / barWidth) * max);
    };

    return (
        <ProgressBarContainer withoutNode={withoutNode} nodeTexts={nodeTexts}>
            {/* 일반 */}
            {!forAudio && (
                <ProgressBarImageContainer withoutNode={withoutNode}>
                    <ProgressBarOuterStick>
                        <ProgressBarInnerStick value={value} max={max} />
                    </ProgressBarOuterStick>
                    {!withoutNode && (
                        <ProgressBarCircleContainer>
                            {states.length > 0 &&
                                states.map((state, index) => (
                                    <ProgressBarCircle value={value}>
                                        <CheckCircle />
                                        {value === index && (
                                            <Text>{states[index]}</Text>
                                        )}
                                    </ProgressBarCircle>
                                ))}
                        </ProgressBarCircleContainer>
                    )}
                </ProgressBarImageContainer>
            )}
            {/* AudioPlayer 내의 progressBar */}
            {forAudio && (
                <ProgressBarImageContainer
                    withoutNode={withoutNode}
                    ref={progressBarRef}
                    onMouseDown={
                        !isMobile ? () => setIsMouseDown(true) : undefined
                    }
                    onMouseUp={
                        !isMobile
                            ? (e) => {
                                  changeTargetTime(e);
                                  setIsMouseDown(false);
                              }
                            : undefined
                    }
                    onMouseLeave={
                        !isMobile ? () => setIsMouseDown(false) : undefined
                    }
                    onMouseMove={!isMobile ? changeTargetTime : undefined}
                    onTouchStart={
                        isMobile ? () => setIsMouseDown(true) : undefined
                    }
                    onTouchEnd={
                        isMobile
                            ? (e) => {
                                  changeTargetTimeOnTouch(e);
                                  setIsMouseDown(false);
                              }
                            : undefined
                    }
                    onTouchMove={isMobile ? changeTargetTimeOnTouch : undefined}
                >
                    <ProgressBarOuterStick>
                        <ProgressBarInnerStick
                            value={value}
                            max={max}
                            isAnimationActivated={isAnimationActivated}
                        />
                    </ProgressBarOuterStick>
                    {!withoutNode && (
                        <ProgressBarCircleContainer>
                            <ProgressBarCircleAnimation
                                value={value}
                                max={max}
                                isAnimationActivated={isAnimationActivated}
                            />
                        </ProgressBarCircleContainer>
                    )}
                </ProgressBarImageContainer>
            )}
        </ProgressBarContainer>
    );
};
