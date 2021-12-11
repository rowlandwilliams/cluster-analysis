interface Props {
    isActive?: boolean;
}

export const TrifectorIcon = ({ isActive = false }: Props) => {
    return (
        <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            className={isActive ? '' : 'fill-current text-gray-500'}
            xmlns="http://www.w3.org/2000/svg"
        >
            <ellipse
                cx="6.01624"
                cy="3.0896"
                rx="2.15686"
                ry="2.155"
                fill={isActive ? '#FF6868' : ''}
            />
            <ellipse
                cx="2.68909"
                cy="8.2298"
                rx="2.15686"
                ry="2.155"
                fill={isActive ? '#FFFA7A' : ''}
            />
            <ellipse
                cx="9.46741"
                cy="8.2298"
                rx="2.15686"
                ry="2.155"
                fill={isActive ? '#C479FF' : ''}
            />
        </svg>
    );
};
