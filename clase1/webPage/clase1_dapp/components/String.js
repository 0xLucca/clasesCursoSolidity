import React, { useRef, useState } from 'react';
import { reviewsABI } from '../utils/abis/reviewsABI.js';
import { reviewContractAddress } from '../utils/addresses';
import { ethers } from 'ethers';
import {
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

const String = () => {
  const clearInput = useRef();
  const [string, setstring] = useState('');
  const [showString, setshowString] = useState(false);

  //onSettled 👇
  //clearInput.current.value = null;

  const handleInput = () => {
    setshowString(!showString);
  };

  return (
    <div>
      <p className="uppercase text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Ingrese un mensaje
      </p>
      <div className="w-10/12 m-auto mb-5 h-[60px] border-[3px] bg-finanflixPurple border-finanflixWhite text-finanflixWhite text-[18px] px-5 font-medium flex">
        {showString ? (
          <p className="m-auto">{string}</p>
        ) : (
          <p className="m-auto"></p>
        )}
      </div>

      <form className="w-10/12 m-auto">
        <input
          type="text"
          ref={clearInput}
          onChange={(e) => setstring(e.target.value)}
          placeholder="Ingrese aqui su mensaje"
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
    </div>
  );
};

export default String;
