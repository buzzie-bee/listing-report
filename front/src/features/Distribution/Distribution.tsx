import { useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import { Table } from '../../components/Table/Table';
import { TableHeaders } from '../../components/Table/TableHeaders';
import { TableRow } from '../../components/Table/TableRow';
import { DistributionType } from './Distribution.interface';

export const Distribution = () => {
  const fetchDistribution = useCallback(async () => {
    return await (await fetch('/api/reports/distribution')).json();
  }, []);

  const { loading, error, result } = useAsync(fetchDistribution, []);

  return (
    <div>
      <div className="py-1 sm:py-8">
        <h1 className="text-2xl font-semibold">Distribution</h1>
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
          <TableHeaders headers={['Make', 'Distribution']} />
          <tbody>
            {result.distributionData.map(
              ({ make, distribution }: DistributionType) => (
                <TableRow
                  key={`tr-${make}`}
                  values={[make, distribution.toString()]}
                />
              )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
