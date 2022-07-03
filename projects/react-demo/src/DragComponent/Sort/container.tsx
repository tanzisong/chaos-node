import React, { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './item';

const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
];

export default memo(function Container() {
  const [cards, setCards] = useState(ITEMS);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards],
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      console.info(id, atIndex, card, index);
      // setCards(
      //   update(cards, {
      //     $splice: [
      //       [index, 1],
      //       [atIndex, 0, card],
      //     ],
      //   }),
      // )
    },
    [findCard, cards, setCards],
  );

  const [, drop] = useDrop(() => ({ accept: 'card' }));
  return (
    <div ref={drop} style={{ width: '400px' }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  );
});