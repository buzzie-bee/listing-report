import { useCallback } from 'react';
// Had to do this to get mock to work in jest - need to find better way
import * as reactAsyncHook from 'react-async-hook';
import { Loading } from '../../components/Loading/Loading';
import { Table } from '../../components/Table/Table';
import { TableHeaders } from '../../components/Table/TableHeaders';
import { TableRow } from '../../components/Table/TableRow';

import { formatPrice } from '../../helpers/formatPrice';

import { AverageSellerPrice } from './AverageBySeller.interface';

export const AverageBySeller = () => {
  const fetchAverageBySeller = useCallback(async () => {
    return await (await fetch('/api/reports/average')).json();
  }, []);

  const { loading, error, result } = reactAsyncHook.useAsync(
    fetchAverageBySeller,
    []
  );

  return (
    <div className="max-w-lg">
      <div className="py-1 sm:py-8">
        <h1 className="text-2xl font-semibold">
          Average Listing Selling Price per Seller Type
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
          <TableHeaders headers={['Seller Type', 'Average in EUR']} />
          <tbody>
            {Object.entries(result as AverageSellerPrice).map(
              ([type, price]: [string, number]) => (
                <TableRow
                  key={`seller-${type}`}
                  values={[type, formatPrice(price)]}
                />
              )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
