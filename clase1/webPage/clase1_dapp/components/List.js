import React, { useRef, useState } from 'react';
import { list } from '../data/list';
import ListElement from './ListElement';
import { useAccount } from 'wagmi';
const List = () => {
  const clearInput1 = useRef();
  const clearInput2 = useRef();
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

  //onSettled 👇
  //clearInput1.current.value = null;
  //clearInput2.current.value = null;

  return (
    <div>
      <p className="uppercase text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Lista
      </p>
      <form className="w-10/12 m-auto">
        <div className="flex text-finanflixWhite font-poppins font-semibold text-[18px] justify-between">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
        <input
          className="form-range
          appearance-none h-1.5 bg-finanflixOrange cursor-pointer mt-4 mb-5 w-full focus:outline-none focus:ring-0 focus:shadow-none"
          type="range"
          min="1"
          max="5"
          onChange={(e) => setnumber(e.target.value)}
        />
        {/*
        <input
          type="number"
          ref={clearInput1}
          onChange={(e) => setnumber(e.target.value)}
          placeholder="Ingrese una valoracion"
          className="mb-5 w-full h-[60px] border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite text-[18px] px-5 font-medium flex"
          min="1"
          max="5"
        />
         */}
        <input
          type="text"
          ref={clearInput2}
          placeholder="Ingrese un comentario"
          onChange={(e) => setstring(e.target.value)}
          className="w-full h-[60px] border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite text-[18px] px-5 font-medium flex"
        />

        <button
          type="button"
          className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-10"
          onClick={() => handleInput()}
        >
          INGRESAR
        </button>
      </form>
      <div className="w-10/12 m-auto mt-16">
        {list.map((e, i) => (
          <ListElement key={i} info={e} />
        ))}
      </div>
    </div>
  );
};

export default List;
