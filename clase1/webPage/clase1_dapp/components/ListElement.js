import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ListElement = ({ info }) => {
  return (
    <div className="text-finanflixWhite font-semibold text-[18px] my-5 p-3 border-2 border-finanflixOrange flex flex-col justify-between">
      <p className="truncate">{info.address}</p>
      <p>{info.string}</p>
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map((s) =>
          s <= info.number ? <AiFillStar key={s} /> : <AiOutlineStar key={s} />
        )}
      </div>
    </div>
  );
};

export default ListElement;
