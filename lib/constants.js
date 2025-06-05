import Governance from "./abis/Governance.sol/Governance.json"
import PaymentProcessor from "./abis/PaymentProcessor.sol/PaymentProcessor.json"
import PremiumFeatures from "./abis/PremiumFeatures.sol/PremiumFeatures.json"
import Staking from "./abis/Staking.sol/Staking.json"
import SUBVToken from "./abis/SUBVToken.sol/SUBVToken.json"
import Treasury from "./abis/Treasury.sol/Treasury.json"

// Contract ABI
export const GovernanceAbi = Governance.abi
export const PaymentProcessorAbi = PaymentProcessor.abi
export const PremiumFeaturesAbi = PremiumFeatures.abi
export const StakingAbi = Staking.abi
export const SUBVTokenAbi = SUBVToken.abi
export const TreasuryAbi = Treasury.abi

// Contract addresses
export const SUBVTokenAddress = "0x99297194ED913fdA3966640858D5419DdDEAfF04"
export const TreasuryAddress = "0xBBC143CF734C5a01BfDf3E09e4f4d8201838C5D2"
export const PaymentProcessorAddress = "0x820642D6f5b53C08A545EC4931798C637B0170F6"
export const StakingAddress = "0x6e824605e14A0Db522dA30b80AAbe77990ecd75b"
export const PremiumFeaturesAddress = "0x9C2e3066f260BF7a23f5403748Ae518301C2A830"
export const GovernanceAddress = "0x859C849F17258296a3Bb6a36292639F669ABC219"

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: "/api/users/login",
  REGISTER: "/api/users/register",
  USER_PROFILE: "/api/users/me",
  WALLET_LOGIN: "/api/users/wallet-login",
  LINK_WALLET: "/api/users/link-wallet",
  VERIFY_LINK_WALLET: "/api/users/verify-link-wallet",
}

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  WALLET_ADDRESS: "walletAddress",
}

// Network configuration
export const NETWORK = {
  MAINNET: {
    chainId: "0x1",
    name: "Ethereum Mainnet",
  },
  SEPOLIA: {
    chainId: "0xaa36a7",
    name: "Sepolia Testnet",
  },
  LOCALHOST: {
    chainId: "0x539",
    name: "Localhost 8545",
  },
}

// Default network
export const DEFAULT_NETWORK = NETWORK.SEPOLIA
