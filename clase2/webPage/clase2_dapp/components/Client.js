import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import bottle from "../assets/imgs/bottle_1.png";
import {
  useContractRead,
  useContractEvent,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { ethers } from "ethers";
import { vendingMachineABI } from "../utils/abis/vendingMachineABI.js";
import { vendingMachineContractAddress } from "../utils/addresses";

const Client = ({ unitPrice }) => {
  const clearInput1 = useRef();
  const clearInput2 = useRef();
  const [amountInput, setAmountInput] = useState(1);

  const { config } = usePrepareContractWrite({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    functionName: "purchase",
    args: [amountInput],
    overrides: {
      //value: ethers.utils.parseEther(unitPrice).mul(amountInput),
      value: ethers.utils.parseEther("0.01").mul(1),
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log("onSettled");
      clearInput1.current.value = null;
      setAmountInput(null);
    },
  });
  return (
    <div className="w-full">
      <p className="uppercase text-center font-extrabold my-[30px] text-[42px] text-finanflixWhite">
        comprador
      </p>

      <div className="w-8/12 m-auto rotate-[15deg] mb-5">
        <Image src={bottle} alt="bottle"></Image>
      </div>
      <input
        type="number"
        ref={clearInput1}
        onChange={(e) => {
          setAmountInput(e.target.value);
        }}
        placeholder="1"
        min={1}
        className="w-full border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite text-[36px] text-center font-semibold flex py-5"
      />
      <button
        type="button"
        className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-5"
        onClick={() => {
          console.log("a");
          write?.();
        }}
      >
        comprar
      </button>
      <div className="mt-5">
        <p className="font-semibold text-[24px] text-finanflixWhite mb-2">
          Mis gaseosas
        </p>
        <div className="flex border-[3px] uppercase font-semibold text-[36px] border-finanflixOrange py-5 text-finanflixWhite ">
          <p className="m-auto">0</p>
        </div>
      </div>
    </div>
  );
};

export default Client;
