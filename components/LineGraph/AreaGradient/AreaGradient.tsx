import React from 'react';
import { areaPurple } from '../utils/utils';

export const AreaGradient = () => {
    return (
        <linearGradient id="area-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={areaPurple} />
            <stop offset="75%" stopColor="white" />
        </linearGradient>
    );
};
