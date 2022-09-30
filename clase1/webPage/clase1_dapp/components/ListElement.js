import React from 'react';

const ListElement = ({ info }) => {
  return (
    <div className="font-bold text-[18px] my-5 p-3 border-2 border-finanflixOrange flex justify-between">
      <p>{info.string}</p>
      <p>{info.number}</p>
      <p>
        {info.address.slice(0, 4)}
        {'...'}
        {info.address.slice(-4)}
      </p>
    </div>
  );
};

export default ListElement;
