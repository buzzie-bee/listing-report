export const TableHeaders = ({ headers }: { headers: string[] }) => {
  return (
    <thead className="">
      <tr>
        {headers.map((header) => (
          <th key={`${header}`}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};
