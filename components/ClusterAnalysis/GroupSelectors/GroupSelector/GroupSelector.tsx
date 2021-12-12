import classNames from 'classnames';
import { useState } from 'react';

interface Props {
    group: string;
    borderClass: string;
    textClass: string;
    bgClass: string;
}

export const GroupSelector = ({ group, borderClass, textClass, bgClass }: Props) => {
    const [isActive, setIsActive] = useState(true);

    return (
        <div
            key={group}
            className={classNames(
                'flex items-center ml-1 px-1 rounded-sm cursor-pointer transition-all duration-200',
                {
                    [borderClass]: isActive,
                    'border border-gray-400': !isActive,
                },
            )}
            onClick={() => setIsActive(!isActive)}
        >
            <div
                className={classNames(
                    'w-2 h-2 mr-1 rounded-full transition-all duration-200',
                    {
                        [bgClass]: isActive,
                        'bg-gray-400': !isActive,
                    },
                    `hover:${bgClass}`,
                )}
            ></div>
            <div
                className={classNames('transition-all duration-200', {
                    [textClass]: isActive,
                    'text-gray-400': !isActive,
                })}
            >
                {group}
            </div>
        </div>
    );
};
