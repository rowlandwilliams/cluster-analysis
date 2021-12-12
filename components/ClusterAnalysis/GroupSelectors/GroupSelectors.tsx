import { GroupSelector } from './GroupSelector/GroupSelector';

const groups = [
    {
        group: 'Group 1',
        borderClass: 'border border-chart-red',
        textClass: 'text-chart-red',
        bgClass: 'bg-chart-red',
    },
    {
        group: 'Group 2',
        borderClass: 'border border-chart-yellow',
        textClass: 'text-chart-yellow',
        bgClass: 'bg-chart-yellow',
    },
    {
        group: 'Group 3',
        borderClass: 'border border-chart-purple',
        textClass: 'text-chart-purple',
        bgClass: 'bg-chart-purple',
    },
    {
        group: 'Group 4',
        borderClass: 'border border-pink-400',
        textClass: 'text-pink-400',
        bgClass: 'bg-pink-400',
    },
];

export const GroupSelectors = () => {
    return (
        <div className="flex justify-end px-2 pb-4">
            <div className="flex">
                {groups.map((group) => (
                    <GroupSelector {...group} key={group.group} />
                ))}
            </div>
        </div>
    );
};
