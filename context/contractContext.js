"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { SUBVTokenAddress } from '../utils/constants'

// Import your ABI types if you have them
// import SUBVTokenABI from './abis/SUBVToken.json';
// import PaymentProcessorABI from './abis/PaymentProcessor.json';


// Create the context with a default value
export const ContractContext = React.createContext();

const { ethereum } = window;

// Contract addresses (from deployment)
// const SUBVTokenAddress = '0x99297194ED913fdA3966640858D5419DdDEAfF04';
// const PaymentProcessorAddress = '0x820642D6f5b53C08A545EC4931798C637B0170F6';

// Instantiate contracts
// Uncomment and ensure you have the correct ABI types
// const subvToken = new ethers.Contract(SUBVTokenAddress, SUBVTokenABI.abi, signer);
// const paymentProcessor = new ethers.Contract(PaymentProcessorAddress, PaymentProcessorABI.abi, signer);

export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  // Func to Connect wallet
  const ConnectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
      window.location.reload();
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
        // getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <ContractContext.Provider value={{ ConnectWallet, currentAccount }}>
      {children}
    </ContractContext.Provider>
  );
};
