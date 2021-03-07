import { useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import { Table } from '../../components/Table/Table';
import { TableHeaders } from '../../components/Table/TableHeaders';
import { TableRow } from '../../components/Table/TableRow';

export const AveragePricePopular = () => {
  const fetchAveragePricePopular = useCallback(async () => {
    return await (await fetch('/api/reports/averagePopularPrice')).json();
  }, []);

  const { loading, error, result } = useAsync(fetchAveragePricePopular, []);

  return (
    <div>
      <div className="py-1 sm:py-8">
        <h1 className="text-2xl font-semibold">Popular listings</h1>
      </div>

      {loading && <div>Loading</div>}
      {error && (
        <div>
          <p>Error - something went wrong</p>
          <p>{error.message}</p>
        </div>
      )}
      {result && (
        <Table>
          <TableHeaders headers={['Average Price']} />
          <tbody>
            {result && <TableRow values={[result.averagePrice.toString()]} />}
          </tbody>
        </Table>
      )}
    </div>
  );
};
