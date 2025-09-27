// Token configuration for different networks
export const TOKEN_CONFIGS = {
  // Ethereum Mainnet
  1: {
    USDC: "0xA0b86a33E6441b8435b662303c0f479c6e8c385d",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    SUBV: process.env.NEXT_PUBLIC_SUBV_TOKEN_ADDRESS || "",
  },
  // Polygon
  137: {
    USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    SUBV: process.env.NEXT_PUBLIC_SUBV_TOKEN_ADDRESS || "",
  },
  // BSC
  56: {
    USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    USDT: "0x55d398326f99059fF775485246999027B3197955",
    SUBV: process.env.NEXT_PUBLIC_SUBV_TOKEN_ADDRESS || "",
  },
  // Sepolia Testnet
  11155111: {
    USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    USDT: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    SUBV: process.env.NEXT_PUBLIC_SUBV_TOKEN_ADDRESS || "",
  },
}

export const getTokenAddresses = (chainId: number) => {
  return TOKEN_CONFIGS[chainId as keyof typeof TOKEN_CONFIGS] || TOKEN_CONFIGS[1]
}

export const SUPPORTED_TOKENS = [
  {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    isNative: true,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    isStablecoin: true,
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    isStablecoin: true,
  },
  {
    symbol: "SUBV",
    name: "SubversePay Token",
    decimals: 18,
    isUtility: true,
  },
]
