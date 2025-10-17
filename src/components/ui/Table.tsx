import React, { CSSProperties } from "react";

interface TableProps {
  columns: string[];
  data: Record<string, any>[];
  style?: CSSProperties;
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, style = {}, className = "" }) => {
  return (
    <table style={style} className={`border-collapse border border-gray-400 w-full text-sm text-left ${className}`}>
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="border border-gray-400 px-3 py-2 font-medium text-center">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4 text-gray-500 border border-gray-400">
              데이터가 없습니다.
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="border px-3 py-2">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
