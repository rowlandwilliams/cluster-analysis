import type { NextPage } from 'next';
import Head from 'next/head';
import { VisualisationContainer } from '../components/VisualisationContainer/VisualisationContainer';

const Home: NextPage = () => {
    return (
        <div className="w-full h-screen bg-bg-gray font-inconsolata-regular p-2">
            <Head>
                <title>Cluster Analysis</title>
                <meta name="description" content="Cluster" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <VisualisationContainer />
        </div>
    );
};

export default Home;
