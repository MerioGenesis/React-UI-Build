import React from "react";
import "./Table.scss"

const Table = ({ data = [] }) => {
    if (!data.length) {
        return <div>No data available</div>;
    }

    const columns = Object.keys(data[0]);

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
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, id) => (
                    <tr key={id}>
                        {columns.map((column) => {
                            const value = row[column];
                            return (
                                <td key={column}>
                                    {isImage(value) ? (
                                        <img src={value} alt={column} />
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