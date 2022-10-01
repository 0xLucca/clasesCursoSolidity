import { Input, Info } from '@web3uikit/core';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Number = () => {
  const [number, setnumber] = useState(0);
  const [showNumber, setshowNumber] = useState(false);

  const handleInput = () => {
    setshowNumber(!showNumber);
  };
  return (
    <div className="">
      <p className="uppercase text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Ingrese un numero
      </p>
      <form className="w-10/12 m-auto">
        <div className="flex flex-col gap-5 md:flex-row justify-between">
          <div className="w-full h-[120px] border-[4px] border-finanflixWhite text-finanflixWhite text-[58px] font-bold flex">
            {showNumber ? (
              <p className="m-auto">{number}</p>
            ) : (
              <p className="m-auto">0</p>
            )}
          </div>
          <input
            type="number"
            onChange={(e) => setnumber(e.target.value)}
            className="w-full h-[120px] border-[4px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite text-[58px] text-center font-bold flex"
          />
        </div>
        <button
          type="button"
          className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-10"
          onClick={() => handleInput()}
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
};

export default Number;
