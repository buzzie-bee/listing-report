export const Loading = ({ percentage = 0 }: { percentage?: number }) => {
  return <div>Loading{percentage ? ` ${percentage}%` : ''}</div>;
};
