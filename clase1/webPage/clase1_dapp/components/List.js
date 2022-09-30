import React from 'react';
import { list } from '../data/list';
import ListElement from './ListElement';
const List = () => {
  return (
    <div>
      <p className="text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Lista
      </p>
      <div className="w-10/12 m-auto">
        {list.map((e, i) => (
          <ListElement key={i} info={e} />
        ))}
      </div>
    </div>
  );
};

export default List;
