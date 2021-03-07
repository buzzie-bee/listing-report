import { useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import { Loading } from '../../components/Loading/Loading';
import { Table } from '../../components/Table/Table';
import { TableHeaders } from '../../components/Table/TableHeaders';
import { TableRow } from '../../components/Table/TableRow';
import { formatMileage } from '../../helpers/formatMileage';
import { formatPrice } from '../../helpers/formatPrice';
import {
  MostContactedListing,
  MostContactListingsMonth,
} from './TopFiveByMonth.interface';

export const TopFiveByMonth = () => {
  const fetchTopFive = useCallback(async () => {
    return await (await fetch('/api/reports/mostContactedListings')).json();
  }, []);

  const { loading, error, result } = useAsync(fetchTopFive, []);

  const renderMonthTable = (listings: MostContactedListing[]) => {
    return (
      <Table>
        <TableHeaders
          headers={[
            'Ranking',
            'Listing Id',
            'Make',
            'Selling Price',
            'Mileage',
            '# of Contacts',
          ]}
        />
        <tbody>
          {listings.map(
            ({
              ranking,
              id,
              make,
              price,
              mileage,
              contacts,
            }: MostContactedListing) => (
              <TableRow
                key={`tr-months-${id}`}
                values={[
                  ranking.toString(),
                  id,
                  make,
                  formatPrice(price),
                  formatMileage(mileage),
                  contacts.toString(),
                ]}
              />
            )
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <div className="max-w-4xl">
      <div className="py-1 sm:py-8">
        <h1 className="text-2xl font-semibold">
          The Top 5 most contacted listings per Month
        </h1>
      </div>

      {loading && <Loading />}
      {error && (
        <div>
          <p>Error - something went wrong</p>
          <p>{error.message}</p>
        </div>
      )}
      {result &&
        result.data.map((monthData: MostContactListingsMonth) => (
          <div key={`${monthData.month}`} className="mt-8">
            <h4 className="text-lg font-semibold mb-2 ml-8 ">
              {monthData.month}
            </h4>
            {renderMonthTable(monthData.listings)}
          </div>
        ))}
    </div>
  );
};
