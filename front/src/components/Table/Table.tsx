import { TableHeaders } from './TableHeaders';
import { TableRow } from './TableRow';

export const Table = () => {
  return (
    <table className="">
      <TableHeaders />
      <tbody className="">
        <TableRow />
      </tbody>
    </table>
  );
};
