export const getTopCreators = (creators) => {
  if (!creators) return [];
  const finalCreators = [];
  const finalResutls = creators?.reduce((idx, currentValue) => {
    (idx[currentValue.seller] = idx[currentValue.seller] || []).push(
      currentValue
    );
    return idx;
  }, {});
  console.log("finalResutls", finalResutls);
  Object.entries(finalResutls).forEach((item) => {
    const seller = item[0];
    const total = item[1]
      .map((newItem) => Number(newItem.price))
      .reduce((prev, currval) => prev + currval, 0);
    finalCreators.push({ seller, total });
  });

  finalCreators.sort((a, b) => b.total - a.total);
  console.log("final", finalCreators);
  return finalCreators;
};
