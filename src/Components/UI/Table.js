import "./Table.scss";

const Table = ({ data = [], columns }) => {
    if (!data.length) {
        return <div>No data available</div>;
    }

    const autoColumns = Object.keys(data[0]).map((key) => ({
        key,
        label: key
    }));

    const finalColumns = columns?.length ? columns : autoColumns;

    const isImage = (value) => {
        if (typeof value !== "string") return false;
        return (
            value.startsWith("data:image") ||
            value.match(/\.(jpeg|jpg|png|gif|webp|svg)$/i)
        );
    };

    return (
        <table>
            <thead>
                <tr>
                    {finalColumns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, id) => (
                    <tr key={id}>
                        {finalColumns.map((col) => {
                            const value = row[col.key];
                            return (
                                <td key={col.key}>
                                    {isImage(value) ? (
                                        <img src={value} alt={col.label} />
                                    ) : (
                                        String(value ?? "")
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
