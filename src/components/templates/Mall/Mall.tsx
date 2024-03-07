import { useState, useEffect } from 'react';
import { MainLayout } from '@Organisms/MainLayout';
import { MallContainer } from './Mall.styled';
import { useRequest } from '@Hooks/useRequest';
import { useRouter } from 'next/router';
import { useAsyncEffect } from '@Hooks/useAsyncEffect';
import { IGift, IIncartGift, IRecommendedGift } from '@Types/types';
import { MallNav } from './MallComponents/MallNav';
import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
import { MallRecommended } from './MallComponents/MallRecommended';
import { MallInterested } from './MallComponents/MallInterested';
import { MallCart } from './MallComponents/MallCart';

export type MallMenuType = 'recommended' | 'interested' | 'cart';

export const Mall = () => {
    const router = useRouter();
    const { show } = router.query;
    const { request, loading } = useRequest();
    const [recommendedGifts, setRecommendedGifts] = useState<
        IRecommendedGift[]
    >([]);
    const [interestedGifts, setInterestedGifts] = useState<IGift[]>([]);
    const [incartGifts, setIncartGifts] = useState<IIncartGift[]>([]);

    const [menu, setMenu] = useState<MallMenuType>('recommended');

    // choose which tab to show first
    useEffect(() => {
        if (show) {
            setMenu(show as MallMenuType);
        }
    }, [show]);

    // recommended gift
    useAsyncEffect(async () => {
        const resRecommendedGifts = await request({
            url: '/api/user/recommended-gifts',
            method: 'GET',
        });
        if (resRecommendedGifts) {
            setRecommendedGifts(resRecommendedGifts.data);
        }
    });

    // interested gift
    useAsyncEffect(async () => {
        const resInterestedGifts = await request({
            url: '/api/user/interested-gifts',
            method: 'GET',
        });
        if (resInterestedGifts) {
            setInterestedGifts(resInterestedGifts.data);
        }
    }, []);
    // incart gift
    useAsyncEffect(async () => {
        const resIncartGifts = await request({
            url: `/api/user/incart_gifts`,
            method: 'GET',
        });
        if (resIncartGifts) {
            setIncartGifts(resIncartGifts.data);
        }
    }, []);
    return (
        <MainLayout
            hideBackButton
            title="앤서록 몰"
            subNav={MallNav({
                menu,
                setMenu,
                interestedGifts,
                incartGifts,
            })}
        >
            {loading ? (
                <LoadingContainer>
                    <SpinLoader />
                </LoadingContainer>
            ) : (
                <MallContainer>
                    {menu === 'recommended' && (
                        <MallRecommended
                            recommendedGifts={recommendedGifts}
                            setRecommendedGifts={setRecommendedGifts}
                            setMenu={setMenu}
                            interestedGifts={interestedGifts}
                            setInterestedGifst={setInterestedGifts}
                        />
                    )}
                    {menu === 'interested' && (
                        <MallInterested
                            interestedGifts={interestedGifts}
                            setInterestedGifst={setInterestedGifts}
                            setMenu={setMenu}
                        />
                    )}
                    {menu === 'cart' && (
                        <MallCart
                            setMenu={setMenu}
                            incartGifts={incartGifts}
                            setIncartGifts={setIncartGifts}
                        />
                    )}
                </MallContainer>
            )}
        </MainLayout>
    );
};
