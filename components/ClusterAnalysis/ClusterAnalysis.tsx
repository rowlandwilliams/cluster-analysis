import React from 'react';
import { GroupSelectors } from './GroupSelectors/GroupSelectors';
import { Scatterplots } from './Scatterplots/Scatterplots';

export const ClusterAnalysis = () => {
    return (
        <section className="flex-grow flex flex-col">
            <Scatterplots />
            <GroupSelectors />
        </section>
    );
};
