import { Input, Info } from '@web3uikit/core';
import { useRef, useState } from 'react';
import { reviewsABI } from '../utils/abis/reviewsABI.js';
import { reviewContractAddress } from '../utils/addresses';
import { ethers } from 'ethers';
import {
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

const Number = () => {
  const [number, setNumber] = useState(null);
  const [numberInput, setNumberInput] = useState(null);
  const clearInput = useRef();

  const contractRead = useContractRead({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    functionName: 'readNumber',
    cacheOnBlock: true,
    onSuccess(data) {
      setNumber(ethers.utils.formatUnits(data, 0));
      console.log('contractRead');
    },
  });

  useContractEvent({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    eventName: 'NumberUpdated',
    listener: (event) => {
      setNumber(ethers.utils.formatUnits(event[0], 0));
    },
  });

  const { config } = usePrepareContractWrite({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    functionName: 'writeNumber',
    args: [numberInput],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('onSettled');
      clearInput.current.value = null;
    },
  });

  return (
    <div>
      <p className="uppercase text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Ingrese un numero
      </p>
      <form className="w-10/12 m-auto">
        <div className="flex justify-between gap-5">
          <div className="w-full h-[120px] border-[3px] border-finanflixWhite text-finanflixWhite text-[58px] font-bold flex">
            <p className="m-auto">{number}</p>
          </div>
          <input
            type="number"
            ref={clearInput}
            onChange={(e) => setNumberInput(e.target.value)}
            className="w-full h-[120px] border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite text-[58px] text-center font-bold flex"
          />
        </div>
        <button
          type="button"
          className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack mt-10"
          onClick={() => write()}
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
};

export default Number;
