import { useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import { Table } from '../../components/Table/Table';
import { TableHeaders } from '../../components/Table/TableHeaders';
import { TableRow } from '../../components/Table/TableRow';
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
        <TableHeaders headers={['Make', 'Distribution']} />
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
                  price.toString(),
                  mileage.toString(),
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
    <div>
      <div className="py-1 sm:py-8">
        <h1 className="text-2xl font-semibold">Top five listings</h1>
      </div>

      {loading && <div>Loading</div>}
      {error && (
        <div>
          <p>Error - something went wrong</p>
          <p>{error.message}</p>
        </div>
      )}
      {result &&
        result.data.map((monthData: MostContactListingsMonth) => (
          <div key={`${monthData.month}`}>
            <h4>{monthData.month}</h4>
            {renderMonthTable(monthData.listings)}
          </div>
        ))}
    </div>
  );
};
