import {
    useState,
    useEffect,
    MouseEvent,
    useContext,
    useRef,
    TouchEvent,
} from 'react';
import { TutorialHome } from './TutorialComponents/TutorialHome';
import { TutorialLanding } from './TutorialComponents/TutorialLanding';
import {
    TutorialCoverContainer,
    TutorialCoverSignoutContainer,
} from './Tutorial.styled';
import { TutorialLayout } from './TutorialComponents/TutorialLayout';
import { Text } from '@Atoms/Typography';
import { TutorialQna } from './TutorialComponents/TutorialQna';
import { interactivePages } from './TutorialComponents/TutorialContants';
import { useRouter } from 'next/router';
import SignoutIcon from '@Images/icons/signout.svg';
import { WHITE } from '@Styles/colors';
import { TutorialAnswerLog } from './TutorialComponents/TutorialAnswerLog';
import { TutorialLogDetail } from './TutorialComponents/TutorialLogDetail';
import { TutorialReport } from './TutorialComponents/TutorialReport';
import { TutorialReportDetail } from './TutorialComponents/TutorialReportDetail';
import {
    TutorialMall,
    TutorialMallNav,
} from './TutorialComponents/TutorialMall';
import { AppContext } from '@Pages/_app';
import { Gap } from '@Styles/App.styled';
import { useActionOnTouch } from '@Hooks/useActionOnTouch';

export type PageFlipType = 'page' | 'subPage';

export const Tutorial = () => {
    const router = useRouter();
    const { isInputFocused, setIsInputFocused } = useContext(AppContext);
    const { actionOnTouchEnd } = useActionOnTouch();

    const [title, setTitle] = useState('');
    const [showLogo, setShowLogo] = useState(true);
    const [hideBackButton, setHideBackButton] = useState(true);
    const [hideTopNav, setHideTopNav] = useState(false);
    const [hideBottomNav, setHideBottomNav] = useState(true);
    const [hideActionIcons, setHideActionIcons] = useState(false);

    const [page, setPage] = useState(1);
    const [subPage, setSubPage] = useState(1);
    const [isInteractive, setIsInteractive] = useState(false);

    const tutorialLayoutScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('page', page);
        console.log('subPage', subPage);
    }, [page, subPage]);

    // changes by page
    useEffect(() => {
        // touch interactive vs touch anywhere
        if (interactivePages.indexOf(page) !== -1) {
            setIsInteractive(true);
        } else {
            setIsInteractive(false);
        }
        // layout properties setting
        if (page > 0 && page < 3) {
            // home
            setTitle('');
            setShowLogo(true);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(true);
            setHideActionIcons(false);
        } else if (page < 5) {
            // landing
            setTitle('홈');
            setShowLogo(false);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 6) {
            // qna
            setTitle('문답');
            setShowLogo(false);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 19) {
            // qna ing
            setTitle('문답');
            setShowLogo(false);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 21) {
            // answer log
            setTitle('답변 모음');
            setShowLogo(false);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 24) {
            // answer log detail
            setTitle('0번째 앤서록');
            setShowLogo(false);
            setHideBackButton(false);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 25) {
            // report
            setTitle('리포트');
            setShowLogo(false);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 26) {
            // report detail
            setTitle('');
            setShowLogo(false);
            setHideBackButton(false);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 29) {
            // mall
            setTitle('앤서록 몰');
            setShowLogo(false);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(false);
            setHideActionIcons(false);
        } else if (page < 260) {
            // home
            setTitle('');
            setShowLogo(true);
            setHideBackButton(true);
            setHideTopNav(false);
            setHideBottomNav(true);
            setHideActionIcons(false);
        }
    }, [page]);

    const goToNextPage = (pageFlip: PageFlipType = 'page') => {
        if (page === 31) {
            window.location.href = '/';
        }
        if (pageFlip === 'page') {
            setPage(page + 1);
            setSubPage(1);
        } else {
            setSubPage(subPage + 1);
        }
    };
    const goToPrevPageOnClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (subPage > 1) {
            setSubPage(subPage - 1);
        } else {
            setPage(page - 1);
        }
    };
    const goToHomeOnClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        window.location.href = '/';
    };

    const goToPrevPage = () => {
        if (subPage > 1) {
            setSubPage(subPage - 1);
        } else {
            setPage(page - 1);
        }
    };
    const goToHome = () => {
        window.location.href = '/';
    };
    return (
        <TutorialLayout
            showLogo={showLogo}
            hideBackButton={hideBackButton}
            hideBottomNav={hideBottomNav || isInputFocused}
            title={title}
            hideActionIcons={hideActionIcons}
            hideTopNav={hideTopNav}
            page={page}
            setPage={setPage}
            subPage={subPage}
            setSubPage={setSubPage}
            goToNextPage={goToNextPage}
            subNav={page >= 27 && page <= 29 ? <TutorialMallNav /> : undefined}
            layoutRef={tutorialLayoutScrollRef}
        >
            <TutorialCoverContainer
                onClick={() => !isInteractive && goToNextPage()}
                onTouchEnd={(e) =>
                    actionOnTouchEnd(e, () => !isInteractive && goToNextPage())
                }
                isInteractive={isInteractive}
            >
                {page > 1 && (
                    <Text
                        color="white"
                        onClick={goToPrevPageOnClick}
                        onTouchEnd={(e) =>
                            actionOnTouchEnd(e, () => {
                                e.stopPropagation();
                                goToPrevPage();
                            })
                        }
                    >
                        뒤로가기
                    </Text>
                )}
                {page >= 8 && (
                    <TutorialCoverSignoutContainer
                        onClick={goToHomeOnClick}
                        onTouchEnd={(e) =>
                            actionOnTouchEnd(e, () => {
                                e.stopPropagation();
                                goToHome();
                            })
                        }
                    >
                        <Text underline color="white">
                            연습하기 끝내기
                        </Text>
                        <Gap width="4px" />
                        <SignoutIcon width="24px" height="24px" color={WHITE} />
                    </TutorialCoverSignoutContainer>
                )}
            </TutorialCoverContainer>
            {page > 0 && page < 3 && (
                <TutorialHome
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
            {page >= 3 && page < 5 && (
                <TutorialLanding
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
            {page >= 5 && page < 19 && (
                <TutorialQna
                    page={page}
                    setPage={setPage}
                    subPage={subPage}
                    setSubPage={setSubPage}
                    goToNextPage={goToNextPage}
                    layoutRef={tutorialLayoutScrollRef}
                />
            )}
            {page >= 19 && page < 21 && (
                <TutorialAnswerLog
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
            {page >= 21 && page < 24 && (
                <TutorialLogDetail
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
            {page >= 24 && page < 25 && (
                <TutorialReport
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
            {page >= 25 && page < 27 && (
                <TutorialReportDetail
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
            {page >= 27 && page < 29 && (
                <TutorialMall
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
            {page >= 29 && (
                <TutorialHome
                    page={page}
                    setPage={setPage}
                    goToNextPage={goToNextPage}
                />
            )}
        </TutorialLayout>
    );
};
