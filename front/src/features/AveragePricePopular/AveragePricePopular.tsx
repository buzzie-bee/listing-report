import { useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import { Loading } from '../../components/Loading/Loading';
import { Table } from '../../components/Table/Table';
import { TableHeaders } from '../../components/Table/TableHeaders';
import { TableRow } from '../../components/Table/TableRow';
import { formatPrice } from '../../helpers/formatPrice';

export const AveragePricePopular = () => {
  const fetchAveragePricePopular = useCallback(async () => {
    return await (await fetch('/api/reports/averagePopularPrice')).json();
  }, []);

  const { loading, error, result } = useAsync(fetchAveragePricePopular, []);

  return (
    <div className="max-w-lg">
      <div className="py-1 sm:py-8">
        <h1 className="text-2xl font-semibold">
          Average price of the 30% most contacted listings
        </h1>
      </div>

      {loading && <Loading />}
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
            {result && <TableRow values={[formatPrice(result.averagePrice)]} />}
          </tbody>
        </Table>
      )}
    </div>
  );
};
