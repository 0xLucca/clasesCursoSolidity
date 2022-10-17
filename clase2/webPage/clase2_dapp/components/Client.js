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

const Client = ({ unitPrice, address }) => {
  const clearInput1 = useRef();
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [userAmount, setUserAmount] = useState(0);

  useEffect(() => {
    setPrice(unitPrice);
  }, [unitPrice]);

  const contractRead = useContractRead({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    functionName: "getUserAmount",
    args: [address],
    cacheOnBlock: true,
    onSuccess(data) {
      console.log(ethers.utils.formatUnits(data, 0));
      setUserAmount(ethers.utils.formatUnits(data, 0));
    },
  });

  useContractEvent({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    eventName: "ProductPurchased",
    listener: (event) => {
      setUserAmount(
        Number(userAmount) + Number(ethers.utils.formatUnits(event[1], 0))
      );
    },
  });

  const { config } = usePrepareContractWrite({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    functionName: "purchase",
    args: [amount],
    overrides: {
      value: ethers.utils.parseEther((amount * price).toString()),
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log("onSettled");
      clearInput1.current.value = null;
      setAmount(1);
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
          setAmount(e.target.value);
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
          <p className="m-auto">{userAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Client;
