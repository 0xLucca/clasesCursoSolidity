import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import bottle from "../assets/imgs/bottle_1.png";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { vendingMachineABI } from "../utils/abis/vendingMachineABI.js";
import { vendingMachineContractAddress } from "../utils/addresses";

const Repository = () => {
  const clearInput1 = useRef();
  const clearInput2 = useRef();
  const [amount, setAmount] = useState(1);
  const [newPrice, setNewPrice] = useState(0);

  const restockPrepare = usePrepareContractWrite({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    functionName: "restock",
    args: [amount],
  });

  const restockWrite = useContractWrite({
    ...restockPrepare.config,
    onSettled(data, error) {
      console.log("onSettled");
      clearInput2.current.value = 1;
      setAmount(1);
    },
  });

  const setPricePrepare = usePrepareContractWrite({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    functionName: "setPrice",
    args: [ethers.utils.parseEther(newPrice.toString())],
  });

  const setPriceWrite = useContractWrite({
    ...setPricePrepare.config,
    onSettled(data, error) {
      console.log("onSettled");
      clearInput1.current.value = 0;
      setNewPrice(0);
    },
  });

  return (
    <div className="w-full">
      <p className="uppercase text-center font-extrabold my-[30px] text-[42px] text-finanflixWhite">
        repositor
      </p>
      <div className="xl:flex gap-5">
        <div>
          <label
            id="price"
            className="text-center font-semibold text-[24px] text-finanflixWhite"
          >
            Cambiar precio
          </label>
          <input
            id="price"
            type="number"
            ref={clearInput1}
            onChange={(e) => {
              if (e.target.value !== "") {
                setNewPrice(e.target.value);
              }
            }}
            placeholder="1 ETH"
            min={0}
            className="w-full border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite mt-2 text-[36px] text-center font-semibold flex py-5"
          />
          <button
            type="button"
            className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-5"
            onClick={() => {
              setPriceWrite.write?.();
            }}
          >
            cambiar
          </button>
        </div>
        <div className="mt-5 lg:mt-0">
          <label
            id="stock"
            className="text-center font-semibold text-[24px] text-finanflixWhite"
          >
            Agregar stock
          </label>
          <input
            id="stock"
            type="number"
            ref={clearInput2}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="1"
            min={1}
            className="w-full border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite mt-2 text-[36px] text-center font-semibold flex py-5"
          />
          <button
            type="button"
            className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-5"
            onClick={() => {
              restockWrite.write?.();
            }}
          >
            agregar
          </button>
        </div>
      </div>
      <button className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-10">
        retirar dinero
      </button>
    </div>
  );
};

export default Repository;
