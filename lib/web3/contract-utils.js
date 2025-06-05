/**
 * Smart contract interaction utilities
 */
import { ethers } from "ethers"
import {
  GovernanceAbi,
  PaymentProcessorAbi,
  PremiumFeaturesAbi,
  StakingAbi,
  SUBVTokenAbi,
  TreasuryAbi,
  SUBVTokenAddress,
  TreasuryAddress,
  PaymentProcessorAddress,
  StakingAddress,
  PremiumFeaturesAddress,
  GovernanceAddress,
} from "@/lib/constants"

// Get Ethereum provider
export const getProvider = () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Ethereum provider not available")
  }

  return new ethers.providers.Web3Provider(window.ethereum)
}

// Get contract instance
export const getContract = (address, abi) => {
  try {
    const provider = getProvider()
    return new ethers.Contract(address, abi, provider)
  } catch (error) {
    console.error("Error getting contract:", error)
    throw error
  }
}

// Get signer
export const getSigner = async () => {
  try {
    const provider = getProvider()
    return provider.getSigner()
  } catch (error) {
    console.error("Error getting signer:", error)
    throw error
  }
}

// Get contract with signer
export const getContractWithSigner = async (address, abi) => {
  try {
    const signer = await getSigner()
    return new ethers.Contract(address, abi, signer)
  } catch (error) {
    console.error("Error getting contract with signer:", error)
    throw error
  }
}

// Contract getter functions
export const getSUBVTokenContract = () => getContract(SUBVTokenAddress, SUBVTokenAbi)
export const getTreasuryContract = () => getContract(TreasuryAddress, TreasuryAbi)
export const getPaymentProcessorContract = () => getContract(PaymentProcessorAddress, PaymentProcessorAbi)
export const getStakingContract = () => getContract(StakingAddress, StakingAbi)
export const getPremiumFeaturesContract = () => getContract(PremiumFeaturesAddress, PremiumFeaturesAbi)
export const getGovernanceContract = () => getContract(GovernanceAddress, GovernanceAbi)

// Contract with signer getter functions
export const getSUBVTokenContractWithSigner = async () => getContractWithSigner(SUBVTokenAddress, SUBVTokenAbi)
export const getTreasuryContractWithSigner = async () => getContractWithSigner(TreasuryAddress, TreasuryAbi)
export const getPaymentProcessorContractWithSigner = async () =>
  getContractWithSigner(PaymentProcessorAddress, PaymentProcessorAbi)
export const getStakingContractWithSigner = async () => getContractWithSigner(StakingAddress, StakingAbi)
export const getPremiumFeaturesContractWithSigner = async () =>
  getContractWithSigner(PremiumFeaturesAddress, PremiumFeaturesAbi)
export const getGovernanceContractWithSigner = async () => getContractWithSigner(GovernanceAddress, GovernanceAbi)

// Format ethers BigNumber to human-readable string
export const formatBigNumber = (value, decimals = 18) => {
  return ethers.utils.formatUnits(value, decimals)
}

// Parse string to ethers BigNumber
export const parseBigNumber = (value, decimals = 18) => {
  return ethers.utils.parseUnits(value.toString(), decimals)
}
