import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ffLogo from "../assets/imgs/ffLogo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const Nav = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  return (
    <div className="bg-libuBlack flex justify-between h-18 sticky top-0 z-50">
      <div className="flex">
        <div className="w-12 my-auto ml-4 flex cursor-pointer">
          <Link href="/">
            <a>
              <Image src={ffLogo} alt="logo" />
            </a>
          </Link>
        </div>
      </div>

      <div className="h-fit my-auto">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Nav;
