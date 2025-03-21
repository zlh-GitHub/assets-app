export const formatDate = (timestamp: number | string) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString();
}