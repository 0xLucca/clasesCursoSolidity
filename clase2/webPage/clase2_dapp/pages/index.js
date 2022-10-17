import Head from "next/head";
import Nav from "../components/Nav";
import VendingMachineData from "../components/VendingMachineData";
import Line from "../components/Line";
import LineV from "../components/LineV";
import Client from "../components/Client";
import Repository from "../components/Repository";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractEvent } from "wagmi";
import { vendingMachineABI } from "../utils/abis/vendingMachineABI.js";
import { vendingMachineContractAddress } from "../utils/addresses";
import { ethers } from "ethers";

export default function Home() {
  const [unitPrice, setUnitPrice] = useState(0);
  const { address, isConnected } = useAccount();

  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState(undefined);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    setWallet(address);
  }, [address]);

  const contractRead = useContractRead({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    functionName: "getPrice",
    cacheOnBlock: true,
    onSuccess(data) {
      setUnitPrice(ethers.utils.formatEther(data));
    },
  });

  useContractEvent({
    addressOrName: vendingMachineContractAddress,
    contractInterface: vendingMachineABI,
    eventName: "PriceUpdated",
    listener: (event) => {
      setUnitPrice(ethers.utils.formatEther(event[0]));
    },
  });

  return (
    <div className="bg-finanflixPurple min-h-screen pb-32 font-poppins selection:bg-finanflixOrange">
      <Head>
        <title>Clase 2 Vending Machine Dapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="w-11/12 md:w-8/12 lg:w-6/12 m-auto">
        {connected === false && wallet === undefined ? (
          <p className="text-center text-finanflixWhite font-extrabold my-[30px] text-[42px]">
            Por favor, conecte su wallet
          </p>
        ) : (
          <>
            <VendingMachineData unitPrice={unitPrice} />
            <Line />
            <div className="flex">
              <Client unitPrice={unitPrice} address={wallet} />
              <LineV />
              <Repository />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
