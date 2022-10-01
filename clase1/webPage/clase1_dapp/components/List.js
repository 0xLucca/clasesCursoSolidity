import React, { useState } from 'react';
import { list } from '../data/list';
import ListElement from './ListElement';
import { useAccount } from 'wagmi';
const List = () => {
  const { address } = useAccount();
  const [showData, setshowData] = useState(false);
  const [number, setnumber] = useState(null);
  const [string, setstring] = useState(null);

  const handleInput = () => {
    setshowData(!showData);
    number !== null &&
      string !== null &&
      address !== undefined &&
      console.log({
        address: address,
        number: number,
        string: string,
      });
    setnumber(null);
    setstring(null);
  };
  return (
    <div>
      <p className="text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Lista
      </p>
      <form className="w-10/12 m-auto">
        <input
          type="number"
          onChange={(e) => setnumber(e.target.value)}
          placeholder="Ingrese un numero"
          className="mb-5 w-full h-[70px] border-[4px] bg-finanflixBlack border-finanflixOrange text-finanflixWhite text-[20px] px-5 font-bold flex"
        />
        <input
          type="text"
          onChange={(e) => setstring(e.target.value)}
          placeholder="Ingrese su valoracion"
          className="w-full h-[70px] border-[4px] bg-finanflixBlack border-finanflixOrange text-finanflixWhite text-[20px] px-5 font-bold flex"
        />

        <button
          type="button"
          className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack mt-10 mb-10"
          onClick={() => handleInput()}
        >
          INGRESAR
        </button>
      </form>
      <div className="w-10/12 m-auto">
        {list.map((e, i) => (
          <ListElement key={i} info={e} />
        ))}
      </div>
    </div>
  );
};

export default List;
