import Image from 'next/image';
import AppIcon from '../../assets/app-icon.svg';
import { GraphSelectors } from './GraphSelectors/GraphSelectors';

export const GraphHeader = () => {
    return (
        <div className="flex items-center justify-between bg-header-gray p-2 rounded-t-md">
            <div className="flex items-center">
                <div className="mr-1 pt-1 w-8 h-8">
                    <Image src={AppIcon} alt="app-icon" width={40} height={40} />
                </div>
                <div>Cluster Analysis</div>
            </div>
            <GraphSelectors />
        </div>
    );
};
