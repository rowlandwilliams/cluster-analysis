import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Navbar } from '../Navbar/Navbar';

interface Props {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    const router = useRouter();
    const { pathname } = router;

    const isCluster = pathname === '/';
    return (
        <div
            className={classNames('flex w-full h-screen font-inconsolata-regular', {
                'bg-dark-gray': isCluster,
                'bg-gray-300': !isCluster,
            })}
        >
            <Head>
                <title>Cluster Analysis</title>
                <meta name="description" content="Cluster" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="flex flex-col flex-grow">
                <article
                    className={classNames(
                        'flex flex-col flex-grow  text-white rounded-md overflow-hidden  shadow-xl m-4',
                        {
                            'bg-chart-gray': isCluster,
                            'bg-white': !isCluster,
                        },
                    )}
                >
                    {children}
                </article>
            </main>
        </div>
    );
};
