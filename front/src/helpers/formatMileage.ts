export const formatMileage = (mileage: number): string => {
  if (mileage === 0) {
    return '0 KM';
  }

  const thousands =
    mileage / Math.pow(10, 3) >= 1
      ? Math.floor(mileage / Math.pow(10, 3)) % Math.pow(10, 3)
      : 0;

  const hundreds = thousands ? mileage % Math.pow(10, 3) : mileage;

  const formattedMileage = `${thousands ? `${thousands}.` : ''}${
    thousands ? `${hundreds.toString().padStart(3, '0')}` : `${hundreds}`
  } KM`;

  return formattedMileage;
};
