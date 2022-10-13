import Image from 'next/image';
import React from 'react';
import bottle from '../assets/imgs/bottle_1.png';

const Repository = () => {
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
            onChange={() => {}}
            placeholder="1"
            min={1}
            className="w-full border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite mt-2 text-[36px] text-center font-semibold flex py-5"
          />
          <button className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-5">
            comprar
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
            onChange={() => {}}
            placeholder="1"
            min={1}
            className="w-full border-[3px] bg-finanflixPurple border-finanflixOrange text-finanflixWhite mt-2 text-[36px] text-center font-semibold flex py-5"
          />
          <button className="bg-finanflixOrange w-full py-4 font-bold text-[18px] text-finanflixBlack hover:bg-finanflixBlack hover:text-finanflixOrange hover:shadow transition duration-150 mt-5">
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
