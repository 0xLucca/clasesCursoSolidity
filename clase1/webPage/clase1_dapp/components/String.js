import React, { useRef, useState } from "react";
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
  const clearInput = useRef();
  const [string, setString] = useState(null);
  const [stringInput, setStringInput] = useState(null);

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
      clearInput.current.value = null;
      setStringInput(null);
    },
  });

  return (
    <div>
      <p className="uppercase text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Ingrese un mensaje
      </p>

      <form className="w-10/12 m-auto">
        <div className="w-full mb-5 h-[60px] border-[3px] bg-finanflixPurple border-finanflixWhite text-finanflixWhite text-[18px] px-5 font-medium flex">
          <p className="my-auto">{string}</p>
        </div>
        <input
          type="text"
          ref={clearInput}
          onChange={(e) => setStringInput(e.target.value)}
          placeholder="Ingrese aqui su mensaje"
          className="w-full h-[60px] border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite text-[18px] px-5 font-medium flex"
        />

        <button
          type="button"
          className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-10"
          onClick={() => {
            if (stringInput) {
              write();
            } else {
              alert("Enter a message");
            }
          }}
        >
          INGRESAR
        </button>
      </form>
    </div>
  );
};

export default String;
