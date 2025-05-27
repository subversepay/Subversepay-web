import React, { useContext } from 'react';
import { ContractContext } from '../context/contractContext';
import { ethers } from 'ethers';

const { paymentProcessor } = useContext(ContractContext);

// Create a subscription with stablecoin
export async function createStablecoinSubscription(ottPlatform, stablecoin, amount, durationDays) {
    const amountWei = ethers.utils.parseUnits(amount.toString(), 6); // Assuming 6 decimals for stablecoin
    
    const tx = await paymentProcessor.createStablecoinSubscription(
      ottPlatform,
      stablecoin,
      amountWei,
      durationDays
    );
    
    return await tx.wait();
  }
  
  // Create a subscription with SUBV token
export async function createSubvSubscription(ottPlatform, amount, durationDays) {
    const amountWei = ethers.utils.parseEther(amount.toString());
    
    const tx = await paymentProcessor.createSubvSubscription(
      ottPlatform,
      amountWei,
      durationDays
    );
    
    return await tx.wait();
  }
  
  // Check if subscription is active
export  async function checkSubscriptionStatus(subscriber, ottPlatform) {
    return await paymentProcessor.isSubscriptionActive(subscriber, ottPlatform);
  }
  
  // Get subscription details
export  async function getSubscriptionDetails(subscriber, ottPlatform) {
    const subscription = await paymentProcessor.getSubscription(subscriber, ottPlatform);
    
    return {
      subscriber: subscription.subscriber,
      ottPlatform: subscription.ottPlatform,
      amount: ethers.utils.formatEther(subscription.amount),
      paymentToken: subscription.paymentToken,
      expiryTimestamp: new Date(subscription.expiryTimestamp.toNumber() * 1000).toLocaleString(),
      active: subscription.active
    };
  }


