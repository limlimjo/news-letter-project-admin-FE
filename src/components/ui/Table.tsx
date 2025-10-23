import React, { CSSProperties } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  style?: CSSProperties;
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, style = {}, className = "" }) => {
  return (
    <table style={style} className={`border border-gray-400 w-full text-sm text-left ${className}`}>
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="border border-gray-400 px-3 py-2 font-medium text-center">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4 text-gray-400 border border-gray-400">
              데이터가 없습니다.
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key} className="text-center border border-gray-400 px-3 py-2">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
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
