export const formatDate = (timestamp: number | string) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export const formatPrice = (price: number) => {
  return price.toFixed(2);
}

export const validatePrice = (price: number | string) => {
  return !isNaN(Number(price));
}
