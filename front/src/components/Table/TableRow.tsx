export const TableRow = ({ values }: { values: string[] }) => {
  return (
    <tr>
      {values.map((value, idx) => (
        <td key={`tr-${idx}-${value}`} className="px-2 sm:px-6 py-4">
          <div className="text-sm font-medium text-gray-900">{value}</div>
        </td>
      ))}
    </tr>
  );
};
