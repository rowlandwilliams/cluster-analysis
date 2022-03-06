export const numberWithCommas = (x: number) => {
    return x
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatTooltipValue = (value: number) => {
    return numberWithCommas(Math.floor(value)).replace('.00', '');
};
