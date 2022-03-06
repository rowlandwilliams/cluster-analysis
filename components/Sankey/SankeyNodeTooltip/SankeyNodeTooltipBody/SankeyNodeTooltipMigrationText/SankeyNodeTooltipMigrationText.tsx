interface Props {
    direction: string;
    provinceName: string;
}

export const SankeyNodeTooltipMigrationText = ({ direction, provinceName }: Props) => {
    return (
        <div className="text-gray-300">
            <div>
                MIGRATED {direction}{' '}
                <span className="text-gray-50">{provinceName && provinceName.toUpperCase()}</span>
            </div>
            <div>BETWEEN 2005 AND 2010</div>
        </div>
    );
};
