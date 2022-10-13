import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ffIsologo from '../assets/imgs/ffIsologo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

const Nav = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  return (
    <div className="border-b-2 border-finanflixWhite h-[60px] flex justify-between">
      <div className="h-[28px] my-auto ml-5 cursor-pointer">
        <Link href="https://finanflix.com/" target="_blank">
          <Image src={ffIsologo} alt="finanflix" />
        </Link>
      </div>
      <div className=" my-auto mr-5">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                className="flex"
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="bg-finanflixOrange px-4 py-1.5 text-finanflixBlack font-bold text-[18px] my-auto"
                      >
                        Conectar Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="bg-finanflixOrange px-4 py-1.5 text-finanflixBlack font-bold text-[18px] my-auto animate-pulse"
                      >
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div className="flex">
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="text-finanflixWhite font-bold text-[18px] my-auto mx-2"
                      >
                        {account.balanceSymbol && account.balanceSymbol}
                      </button>
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className="text-finanflixWhite font-bold text-[18px] my-auto mx-2"
                      >
                        {account.displayName && account.displayName}
                      </button>

                      {account.ensAvatar !== undefined ? (
                        <button
                          onClick={openAccountModal}
                          className="w-[35px] h-[35px] rounded-full"
                        >
                          <Image
                            src={account.ensAvatar}
                            alt={account.ensAvatar}
                            className="w-[35px] h-[35px] rounded-full ml-2"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={openAccountModal}
                          className="w-[35px] h-[35px] rounded-full bg-finanflixOrange ml-2"
                        ></button>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Nav;
