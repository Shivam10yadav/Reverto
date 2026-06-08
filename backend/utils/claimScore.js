export const calculateScore = (item, claim) => {
  let score = 0;

  const answers = claim.answers || claim;

  const normalize = (text) =>
    text?.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

  const itemText = normalize(item.description || "");

  const match = (answer, weight) => {
    if (!answer) return 0;

    const ans = normalize(answer);
    const words = ans.split(" ");

    const matchedWords = words.filter((w) => itemText.includes(w));

    const ratio = words.length ? matchedWords.length / words.length : 0;

    return ratio * weight;
  };

  score += match(answers?.description, 30);
  score += match(answers?.uniqueMarks, 40);
  score += match(answers?.insideItems, 20);

  if (answers?.extraProof?.length > 10) {
    score += 10;
  }

  return Math.min(Math.round(score), 100);
};