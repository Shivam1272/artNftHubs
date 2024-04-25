export const getMaxNFTCreators = (creators) => {
  if (!creators) return [];
  const sellerCount = creators.reduce((acc, item) => {
    acc[item.seller] = (acc[item.seller] || 0) + 1;
    return acc;
  }, {});

  const sortedSellersArray = Object.entries(sellerCount)
    .map(([seller, count]) => ({
      seller,
      count,
    }))
    .sort((a, b) => b.count - a.count); // For descending order; use a.count - b.count for ascending
  console.log("seller", sortedSellersArray);
  return sortedSellersArray;
};
