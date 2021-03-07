import { useCallback } from 'react';
import { useAsync } from 'react-async-hook';

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
        <div>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
