import React from "react";
const Table = ({ data = []}) =>{
    if (!data.length){
        return <div>No data available</div>;
    }

    const columns = Object.keys(data[0]);
    return(
        <table>
            <thead>
                <tr>
                    {columns.map((column) =>
                    <th key={column}>{column}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row, id) => (
                    <tr key = {idx}>
                        {columns.map((column) => (
                            <td key={column}>{String(row[column] ?? "")}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )



}

export default Table;