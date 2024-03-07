import {
    AudioPlayerButton,
    AudioPlayerContainer,
    AudioPlayerControllerContainer,
    AudioPlayerOriginalAudio,
    AudioPlayerSubContainer,
    AudioPlayerTimeContainer,
} from '@Molecules/AudioPlayer/AudioPlayer.styled';
import { ProgressBar } from '@Molecules/ProgressBar';
import { Gap } from '@Styles/App.styled';
import { useState, useEffect, useRef, RefObject } from 'react';
import ButtonPlayImage from '@Images/button_play.png';
import ButtonPauseImage from '@Images/button_pause.png';
import ButtonPlayActivatedImage from '@Images/button_play_activated.png';
import ButtonPauseActivatedImage from '@Images/button_pause_activated.png';
import Image from 'next/image';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';
import { Text } from '@Atoms/Typography';
import { convertSeconds } from '@Functions/convertTime';
import { AudioType } from '@Types/types';

type ActivatedButtonType = 'play' | 'pause' | null;

interface AudioPlayerProp {
    file?: string;
    forcedDuration?: number;
    forcedCurrentTime?: number;
    isOnRecording?: boolean;
}

export const AudioPlayer = ({
    file,
    forcedDuration,
    forcedCurrentTime,
    isOnRecording,
}: AudioPlayerProp) => {
    const { actionOnTouchEnd } = useActionOnTouch();

    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [activatedButton, setActivatedButton] =
        useState<ActivatedButtonType>(null);
    const [targetTime, setTargetTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    // add eventlisteners on play/pause
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.onplay = () => {
            setActivatedButton('play');
        };
        audioRef.current.onpause = () => {
            setActivatedButton('pause');
        };
        audioRef.current.onended = () => {
            setActivatedButton(null);
        };
        return () => {
            if (!audioRef.current) return;
            audioRef.current.onplay = null;
            audioRef.current.onpause = null;
            audioRef.current.onended = null;
        };
    }, []);

    // set forced duration
    useEffect(() => {
        if (forcedDuration) setDuration(0);
    }, [forcedDuration, forcedCurrentTime]);

    // goToTargetTime
    useEffect(() => {
        if (!audioRef?.current || targetTime === -1) return;
        audioRef.current.currentTime = targetTime;
        setTargetTime(-1);
    }, [targetTime]);

    // get currentTime and duration
    useEffect(() => {
        if (!audioRef?.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.onloadedmetadata = updateTime;
        // infinity 처리를 위해 ontimeupdate를 이용하였다. 그래서 여기서는 addEventlistener를 이용함
        audioRef.current.addEventListener('timeupdate', updateTime);
        return () => {
            if (!audioRef?.current) return;
            audioRef.current.onloadedmetadata = null;
            audioRef.current.removeEventListener('timeupdate', updateTime);
        };
    }, [file]);

    const updateTime = () => {
        if (!audioRef?.current) return;
        const { duration, currentTime, seeking, paused, ended } =
            audioRef.current;

        if (Number.isFinite(duration)) {
            setDuration(duration);
            setCurrentTime(currentTime);
        } else {
            setDuration(0);
            // currentTime을 임의의 시간으로 바꾸어 duration 값이 infinity가 아닌 정상적인 값이 나올 때까지 updateTime을 실행하면서,마지막 ontimeupdate를 통해 다시 currentTime을 0으로 만든다.
            audioRef.current.currentTime = 1e101;
            audioRef.current.ontimeupdate = () => {
                if (!audioRef?.current) return;
                audioRef.current.ontimeupdate = null;
                audioRef.current.currentTime = 0;
            };
        }
        if (ended) {
            setActivatedButton(null);
        }
    };

    const play = () => {
        if (!audioRef?.current) return;
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach((audio, index) => {
            audio.pause();
        });
        audioRef.current.play();
        // setActivatedButton('play');
    };
    const pause = () => {
        if (!audioRef?.current) return;
        audioRef.current.pause();
        // setActivatedButton('pause');
    };
    return (
        <AudioPlayerContainer>
            <AudioPlayerOriginalAudio
                src={file}
                ref={audioRef}
                className="audio-player"
                preload="metadata"
            />
            {/* <source src={file} type="audio/mp3" />
            </AudioPlayerOriginalAudio> */}
            <ProgressBar
                forAudio
                max={forcedDuration || duration}
                value={forcedCurrentTime || currentTime}
                setTargetTime={setTargetTime}
            />
            <Gap height="16px" />
            <AudioPlayerSubContainer isOnRecording={isOnRecording}>
                {!isOnRecording && (
                    <AudioPlayerControllerContainer>
                        <AudioPlayerButton
                            onClick={() => play()}
                            onTouchEnd={(e) => actionOnTouchEnd(e, play)}
                        >
                            <Image
                                src={
                                    activatedButton === 'play'
                                        ? ButtonPlayActivatedImage
                                        : ButtonPlayImage
                                }
                                layout="fill"
                            />
                        </AudioPlayerButton>
                        <Gap width="8px" />
                        <AudioPlayerButton
                            onClick={() => pause()}
                            onTouchEnd={(e) => actionOnTouchEnd(e, pause)}
                        >
                            <Image
                                src={
                                    activatedButton === 'pause'
                                        ? ButtonPauseActivatedImage
                                        : ButtonPauseImage
                                }
                                layout="fill"
                            />
                        </AudioPlayerButton>
                    </AudioPlayerControllerContainer>
                )}
                <AudioPlayerTimeContainer>
                    <Text size="b2">
                        {convertSeconds(forcedCurrentTime || currentTime)}
                    </Text>
                    <Gap width="4px" />
                    <Text size="b2">&#47;</Text>
                    <Gap width="4px" />
                    <Text size="b2">
                        {convertSeconds(forcedDuration || duration)}
                    </Text>
                </AudioPlayerTimeContainer>
            </AudioPlayerSubContainer>
        </AudioPlayerContainer>
    );
};
