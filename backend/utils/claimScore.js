export const calculateScore = (item, claim) => {
  let score = 0;

  if (
    claim.answers?.description &&
    item.description?.toLowerCase().includes(claim.answers.description.toLowerCase())
  ) {
    score += 30;
  }

  if (
    claim.answers?.uniqueMarks &&
    item.description?.toLowerCase().includes(claim.answers.uniqueMarks.toLowerCase())
  ) {
    score += 50;
  }

  if (
    claim.answers?.insideItems &&
    item.description?.toLowerCase().includes(claim.answers.insideItems.toLowerCase())
  ) {
    score += 20;
  }

  return score;
};