export const formatPrice = (price: number): string => {
  if (price === 0) {
    return '€0,-';
  }

  const thousands =
    price / Math.pow(10, 3) >= 1
      ? Math.floor(price / Math.pow(10, 3)) % Math.pow(10, 3)
      : 0;

  const hundreds = price % Math.pow(10, 3);

  const formattedPrice = `€${thousands ? `${thousands}.` : ''}${
    thousands ? `${hundreds.toString().padStart(3, '0')}` : `${hundreds}`
  },-`;

  return formattedPrice;
};
