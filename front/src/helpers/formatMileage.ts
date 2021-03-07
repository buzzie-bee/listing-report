export const formatMileage = (mileage: number): string => {
  const thousands =
    mileage / Math.pow(10, 3) > 1
      ? Math.floor(mileage / Math.pow(10, 3)) % Math.pow(10, 3)
      : 0;

  const hundreds = mileage % Math.pow(10, 3);

  const formattedMileage = `${thousands ? `${thousands}.` : ''}${
    thousands ? `${hundreds.toString().padStart(3, '0')}` : ``
  } KM`;

  return formattedMileage;
};
