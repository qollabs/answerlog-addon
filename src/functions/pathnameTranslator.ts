export const pathnameTranslator = (pathname: string) => {
    const pathnameRefined = pathname.replace(/\//g, '') || 'home';

    switch (pathnameRefined) {
        case 'home':
        default:
            return '홈';
        case 'policy':
            return '운영 정책';
        case 'withdraw':
            return '회원 탈퇴';
    }
};
