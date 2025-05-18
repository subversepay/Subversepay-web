"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import {
   SUBVTokenAddress, SUBVTokenAbi,
   PaymentProcessorAddress, PaymentProcessorAbi,
   StakingAddress, StakingAbi,
} from '../utils/constants'
import { useRouter } from 'next/navigation'



// Create the context with a default value
export const ContractContext = React.createContext();
const router = useRouter()

if (typeof window !== 'undefined') {
  const { ethereum } = window;
}


// Set up provider and signer
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

// Instantiate contracts
export const subvToken = new ethers.Contract(SUBVTokenAddress, SUBVTokenAbi, signer);
export const paymentProcessor = new ethers.Contract(PaymentProcessorAddress, PaymentProcessorAbi, signer);
export const staking = new ethers.Contract(StakingAddress, StakingAbi, signer);


export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  // Func to Connect wallet
  const ConnectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
      window.location.reload();
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  // Func to Disconnect wallet
  const DisConnectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
      window.location.reload();
      router.push("/");
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  // Func to Check for Wallet connection
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        router.push('/dashboard');
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }

  };

// Get SUBV token balance
// async function getSubvBalance(address) {
//   const balance = await subvToken.balanceOf(address);
//   return ethers.utils.formatEther(balance);
// }

// // Approve payment processor to spend tokens
// async function approvePaymentProcessor(amount) {
//   const amountWei = ethers.utils.parseEther(amount.toString());
//   const tx = await subvToken.approve(PaymentProcessorAddress, amountWei);
//   return await tx.wait();
// }

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <ContractContext.Provider value={{ ConnectWallet, DisConnectWallet, currentAccount }}>
      {children}
    </ContractContext.Provider>
  );
};
