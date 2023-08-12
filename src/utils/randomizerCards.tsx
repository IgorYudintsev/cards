import { CardType } from "features/cards/cards.api";

export const randomizerCards = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - (card.grade ?? 0)) * (6 - (card.grade ?? 0)), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - (card.grade ?? 0)) * (6 - (card.grade ?? 0));
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 }
  );
  //console.log("test: ", sum, rand, res);

  return cards[res.id + 1];
};

// card.grade?: number | undefined поэтому:
// В этой версии кода мы используем оператор объединения с нулевым значением ??
// для проверки наличия значения grade и присвоения значения по умолчанию 0 в случае его отсутствия.
// Таким образом, если grade не определено или имеет значение undefined,
// будет использоваться значение по умолчанию 0.
// БЫЛО:

// const randomizerCards = (cards: CardType[]) => {
//   const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
//   const rand = Math.random() * sum;
//   const res = cards.reduce(
//     (acc: { sum: number; id: number }, card, i) => {
//       const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
//       return { sum: newSum, id: newSum < rand ? i : acc.id };
//     },
//     { sum: 0, id: -1 }
//   );
//   console.log("test: ", sum, rand, res);
//
//   return cards[res.id + 1];
// };
