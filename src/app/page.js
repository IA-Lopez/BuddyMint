"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { createPublicClient, custom, encodeFunctionData } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const contractABI = [
  {
    constant: true,
    inputs: [],
    name: "mintPrice",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "maxSupply",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "mintCount", type: "uint256" }],
    name: "mint",
    outputs: [],
    type: "function",
  },
];

const contractAddress = "0x5b481C649be7EfdeAeBdF72b154b8Fd7326b2186";

export default function MintApp() {
  const { address, isConnected } = useAccount();
  const [contractData, setContractData] = useState({
    mintPrice: null,
    maxSupply: null,
    totalSupply: null,
  });
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchContractData() {

      const client = createPublicClient({
        chain: { id: 52014 }, // Mainnet
        transport: custom(window.ethereum),
      });

      try {
        const mintPrice = await client.readContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "mintPrice",
        });

        const maxSupply = await client.readContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "maxSupply",
        });

        const totalSupply = await client.readContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "totalSupply",
        });

        setContractData({
          mintPrice: Number(mintPrice) / 1e2, // Convertir a ETN con 2 decimales
          maxSupply: Number(maxSupply),
          totalSupply: Number(totalSupply),
        });
      } catch (error) {
        console.error("Error fetching contract data:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchContractData();
  }, [isConnected]);

  const handleMint = async () => {
    if (!isConnected || !contractData.mintPrice) {
      alert("Please connect your wallet and ensure mint price is available.");
      return;
    }

    try {
      setLoading(true);

      const mintPriceInWei = BigInt(contractData.mintPrice * 1e18); // Convertir a wei
      const mintPriceHex = `0x${mintPriceInWei.toString(16)}`;

      const mintData = encodeFunctionData({
        abi: contractABI,
        functionName: "mint",
        args: [1],
      });

      const transaction = {
        to: contractAddress,
        from: address,
        data: mintData,
        value: mintPriceHex,
      };

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transaction],
      });

      alert(`Transaction sent! Hash: ${txHash}`);
    } catch (error) {
      console.error("Minting failed:", error);
      alert(`Minting failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <p className="text-center text-white">Loading contract data...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-green-500">
        Buddy Platinum Pass
      </h1>
      <img
        src="https://amaranth-kind-quelea-444.mypinata.cloud/ipfs/bafybeidorqt35zj66zj4zjj5rxcf2cfgatvfmr5m7qassbtm5ozoez5ir4"
        alt="Buddy Platinum Pass"
        className="w-64 h-64 mb-6 rounded-lg object-cover shadow-lg"
      />


      <div className="text-center mb-6 space-y-3">
        <p className="text-lg">
          Mint Price: <span className="font-bold">{contractData.mintPrice} ETN</span>
        </p>
        <p className="text-lg">
          Max Supply: <span className="font-bold">{contractData.maxSupply}</span>
        </p>
        <p className="text-lg">
          Total Minted: <span className="font-bold">{contractData.totalSupply}</span>
        </p>
        <p className="text-lg">
          Remaining Mints:{" "}
          <span className="font-bold">
            {contractData.maxSupply - contractData.totalSupply}
          </span>
        </p>
      </div>
      {isConnected ? (
        <>
          <button
            onClick={handleMint}
            className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-10 rounded-full shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Minting..." : "Mint Your Buddy Pass"}
          </button>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="mb-4 text-center text-lg">Connect your wallet to mint</p>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
