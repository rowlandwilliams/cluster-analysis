import classNames from 'classnames';
import { TrifectorIcon } from './TrifectorIcon/TrifectorIcon';

interface Props {
    isActive?: boolean;
    selectorText: string;
}

export const GraphSelector = ({ isActive, selectorText }: Props) => {
    return (
        <div
            className={classNames('flex items-center px-2 py-0 rounded-sm cursor-pointer', {
                'bg-header-purple': isActive,
                'bg-chart-gray text-gray-500': !isActive,
            })}
        >
            <div className="mr-2">
                <TrifectorIcon isActive={isActive} />
            </div>
            <div>{selectorText}</div>
        </div>
    );
};
