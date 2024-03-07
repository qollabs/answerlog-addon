import { Home } from '@Templates/Home';
import Head from 'next/dist/shared/lib/head';

const Page = () => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Home />
        </>
    );
};

export default Page;
