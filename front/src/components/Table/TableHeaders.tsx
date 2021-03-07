export const TableHeaders = ({ headers }: { headers: string[] }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header) => (
          <th
            key={`${header}`}
            scope="col"
            className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
