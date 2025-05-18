"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
   SUBVTokenAddress, SUBVTokenAbi,
   PaymentProcessorAddress, PaymentProcessorAbi,
   StakingAddress, StakingAbi,
} from '../utils/constants';
import { useRouter } from 'next/navigation';

// Create the context with a default value
export const ContractContext = React.createContext();

export const ContractProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();
   
    const { ethereum } = typeof window !== 'undefined' ? window : { ethereum: null };
   
    let provider, signer;
    if (ethereum) {
      provider = new ethers.providers.Web3Provider(ethereum);
      signer = provider.getSigner();
    }
   
    // Instantiate contracts only if signer is available
    const subvToken = signer ? new ethers.Contract(SUBVTokenAddress, SUBVTokenAbi, signer) : null;
    const paymentProcessor = signer ? new ethers.Contract(PaymentProcessorAddress, PaymentProcessorAbi, signer) : null;
    const staking = signer ? new ethers.Contract(StakingAddress, StakingAbi, signer) : null;

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
            alert("Failed to connect wallet.");
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
            alert("Failed to disconnect wallet.");
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

    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);

    return (
        <ContractContext.Provider value={{ ConnectWallet, DisConnectWallet, currentAccount, subvToken, paymentProcessor, staking }}>
            {children}
        </ContractContext.Provider>
    );
};
