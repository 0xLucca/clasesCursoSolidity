import React, { useRef, useState } from "react";
import { reviewsABI } from "../utils/abis/reviewsABI.js";
import { reviewContractAddress } from "../utils/addresses";
import ListElement from "./ListElement";
import { ethers } from "ethers";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const List = () => {
  const clearInput1 = useRef();
  const clearInput2 = useRef();
  const { address } = useAccount();
  const [number, setNumber] = useState(null);
  const [string, setString] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleInput = () => {
    console.log(number);
    console.log(string);
    if (number !== null && string !== null && address !== undefined) {
      write();
    } else {
      console.log("Can't write an empty review");
    }
  };

  const contractRead = useContractRead({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    functionName: "getReviews",
    cacheOnBlock: true,
    onSuccess(data) {
      const reviewsCleaned = data.map((review) => {
        return {
          string: review.comment,
          address: review.flixer,
          number: review.rating,
        };
      });
      setReviews(reviewsCleaned);
    },
  });

  useContractEvent({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    eventName: "ReviewAdded",
    listener: (event) => {
      setReviews((prevState) => [
        ...prevState,
        {
          string: event[2],
          address: event[0],
          number: event[1],
        },
      ]);
    },
  });

  const { config } = usePrepareContractWrite({
    addressOrName: reviewContractAddress,
    contractInterface: reviewsABI,
    functionName: "addReview",
    args: [number, string],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSettled(data, error) {
      clearInput1.current.value = 5;
      clearInput2.current.value = null;
      setString(null);
    },
  });

  return (
    <div>
      <p className="uppercase text-finanflixWhite font-extrabold my-[30px] text-[42px]">
        Reviews
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
          ref={clearInput1}
          min="1"
          max="5"
          onChange={(e) => setNumber(e.target.value)}
        />

        <input
          type="text"
          ref={clearInput2}
          placeholder="Ingrese un comentario"
          onChange={(e) => setString(e.target.value)}
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
        {reviews.map((e, i) => (
          <ListElement key={i} info={e} />
        ))}
      </div>
    </div>
  );
};

export default List;
