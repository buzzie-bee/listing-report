import { useCallback } from 'react';
import { useAsync } from 'react-async-hook';

import { Table } from '../../components/Table/Table';
import { TableHeaders } from '../../components/Table/TableHeaders';
import { TableRow } from '../../components/Table/TableRow';

import { AverageSellerPrice } from './AverageBySeller.interface';

export const AverageBySeller = () => {
  const fetchAverageBySeller = useCallback(async () => {
    return await (await fetch('/api/reports/average')).json();
  }, []);

  const { loading, error, result } = useAsync(fetchAverageBySeller, []);

  return (
    <div>
      <div className="py-1 sm:py-8">
        <h1 className="text-2xl font-semibold">Average by seller</h1>
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
          <TableHeaders headers={['Seller Type', 'Average in EUR']} />
          <tbody>
            {Object.entries(result as AverageSellerPrice).map(
              ([type, price]: [string, number]) => (
                <TableRow
                  key={`seller-${type}`}
                  values={[type, price.toString()]}
                />
              )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
