import React from 'react';

const VendingMachineData = () => {
  return (
    <div className="flex gap-5 text-finanflixWhite text-center">
      <div className="w-full">
        <p className="uppercase font-extrabold my-[30px] text-[42px]">Precio</p>
        <div className="border-[3px] border-finanflixOrange py-5">
          <p className="uppercase font-semibold text-[36px]">0</p>
        </div>
      </div>
      <div className="w-full">
        <p className="uppercase font-extrabold my-[30px] text-[42px]">
          Cantidad
        </p>
        <div className="border-[3px] border-finanflixOrange py-5">
          <p className="uppercase font-semibold text-[36px]">0</p>
        </div>
      </div>
    </div>
  );
};

export default VendingMachineData;
