import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead, useContractEvent } from "wagmi";
import { vendingMachineABI } from "../utils/abis/vendingMachineABI.js";
import { vendingMachineContractAddress } from "../utils/addresses";

const VendingMachineData = ({ unitPrice }) => {
  const [price, setPrice] = useState(unitPrice);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    setPrice(unitPrice);
  }, [unitPrice]);

  const contractRead = useContractRead({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    abi: vendingMachineABI,
    functionName: "getAmountLeft",
    cacheOnBlock: true,
    onSuccess(data) {
      console.log(data);
      setAmount(Number(ethers.utils.formatUnits(data, 0)));
    },
  });

  useContractEvent({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    eventName: "MachineRestocked",
    listener: (event) => {
      setAmount(Number(amount) + Number(ethers.utils.formatUnits(event[0], 0)));
    },
  });

  useContractEvent({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    eventName: "ProductPurchased",
    listener: (event) => {
      setAmount(Number(amount) - Number(ethers.utils.formatUnits(event[1], 0)));
    },
  });

  return (
    <div className="flex gap-5 text-finanflixWhite text-center">
      <div className="w-full">
        <p className="uppercase font-extrabold my-[30px] text-[42px]">Precio</p>
        <div className="border-[3px] border-finanflixOrange py-5">
          <p className="uppercase font-semibold text-[36px]">{price} ETH</p>
        </div>
      </div>
      <div className="w-full">
        <p className="uppercase font-extrabold my-[30px] text-[42px]">
          Cantidad
        </p>
        <div className="border-[3px] border-finanflixOrange py-5">
          {amount === null ? (
            <p className="uppercase font-semibold text-[36px] text-finanflixPurple">
              0
            </p>
          ) : (
            <p className="uppercase font-semibold text-[36px]">{amount}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendingMachineData;
