import React, { useState } from "react";
import { reviewsABI } from "../utils/abis/reviewsABI.js";
import { reviewContractAddress } from "../utils/addresses";
import { ethers } from "ethers";
import {
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const String = () => {
  const [string, setString] = useState("");
  const [stringInput, setStringInput] = useState("");

  const contractRead = useContractRead({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    functionName: "readMessage",
    cacheOnBlock: true,
    onSuccess(data) {
      setString(data);
      console.log("contractRead");
    },
  });

  useContractEvent({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    eventName: "MessageUpdated",
    listener: (event) => {
      console.log(event);
      setString(event[0]);
      console.log(string);
    },
  });

  const { config } = usePrepareContractWrite({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    functionName: "writeMessage",
    args: [stringInput],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log("onSettled");
    },
  });

  return (
    <div>
      <p className="text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Ingrese un mensaje
      </p>
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
          onClick={() => console.log(string)}
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
};

export default String;
