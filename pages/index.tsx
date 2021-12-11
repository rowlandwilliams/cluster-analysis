import type { NextPage } from 'next';
import Head from 'next/head';
import { ClusterAnalysis } from '../components/ClusterAnalysis/ClusterAnalysis';

const Home: NextPage = () => {
    return (
        <div className="w-full h-screen bg-bg-gray font-inconsolata-regular p-2">
            <Head>
                <title>Cluster Analysis</title>
                <meta name="description" content="Cluster" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ClusterAnalysis />
        </div>
    );
};

export default Home;
