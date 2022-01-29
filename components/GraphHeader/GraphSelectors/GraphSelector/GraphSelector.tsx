import classNames from 'classnames';
import { useStore } from '../../../../store/store';
import { TrifectorIcon } from './TrifectorIcon/TrifectorIcon';

interface Props {
    selectorText: string;
}

export const GraphSelector = ({ selectorText }: Props) => {
    const { activeSelector, setActiveSelector } = useStore();
    const isActive = activeSelector === selectorText;

    return (
        <button
            className={classNames('flex items-center px-2 py-0 rounded-sm cursor-pointer', {
                'bg-header-purple': isActive,
                'bg-chart-gray text-gray-500': !isActive,
            })}
            onClick={() => setActiveSelector(selectorText)}
        >
            <div className="mr-2">
                <TrifectorIcon isActive={isActive} />
            </div>
            <div>{selectorText}</div>
        </button>
    );
};
