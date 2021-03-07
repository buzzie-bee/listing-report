export const TableRow = ({ values }: { values: string[] }) => {
  return (
    <tr>
      {values.map((value, idx) => (
        <td key={`tr-${idx}-${value}`}>
          <div>{value}</div>
        </td>
      ))}
    </tr>
  );
};
