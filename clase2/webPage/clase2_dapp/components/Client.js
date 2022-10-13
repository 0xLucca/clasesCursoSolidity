import Image from 'next/image';
import React from 'react';
import bottle from '../assets/imgs/bottle_1.png';

const Client = () => {
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
        onChange={() => {}}
        placeholder="1"
        min={1}
        className="w-full border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite text-[36px] text-center font-semibold flex py-5"
      />
      <button className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-10">
        comprar
      </button>
    </div>
  );
};

export default Client;
