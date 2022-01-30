import { GroupSelector } from './GroupSelector/GroupSelector';
import { pointGroups } from './utils/utils';

export const GroupSelectors = () => {
    return (
        <div className="flex justify-end px-2 pb-4">
            <div className="flex">
                {pointGroups.map((group, i) => (
                    <GroupSelector {...group} key={group.group} groupIndex={i} />
                ))}
            </div>
        </div>
    );
};
