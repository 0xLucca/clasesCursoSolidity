import React, { useState } from 'react';
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
  const [string, setstring] = useState('');
  const [showString, setshowString] = useState(false);

  const handleInput = () => {
    setshowString(!showString);
  };

  return (
    <div>
      <p className="text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Ingrese un mensaje
      </p>
      <div className="w-10/12 m-auto mb-5 h-[70px] border-[4px] bg-finanflixBlack border-finanflixWhite text-finanflixWhite text-[20px] px-5 font-bold flex">
        {showString ? (
          <p className="m-auto">{string}</p>
        ) : (
          <p className="m-auto"></p>
        )}
      </div>

      <form className="w-10/12 m-auto">
        <input
          type="text"
          onChange={(e) => setStringInput(e.target.value)}
          placeholder="Ingrese aqui su mensaje"
          className="w-full h-[70px] border-[4px] bg-finanflixBlack border-finanflixOrange text-finanflixWhite text-[20px] px-5 font-bold flex"
        />

        <button
          type="button"
          className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack mt-10"
          onClick={() => handleInput()}
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
};

export default String;
