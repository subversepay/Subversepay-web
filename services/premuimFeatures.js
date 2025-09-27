import { ethers } from "ethers"
import {
  getPremiumFeaturesContractWithSigner,
  getSUBVTokenContractWithSigner,
} from "@/lib/web3/contract-utils"

// Get available features
export async function getFeatureDetails(featureId) {
  const premiumFeatures = await getPremiumFeaturesContractWithSigner()
  const feature = await premiumFeatures.getFeatureDetails(featureId)

  return {
    name: feature.name,
    description: feature.description,
    pricePerMonth: ethers.utils.formatEther(feature.pricePerMonth),
    active: feature.active,
  }
}

// Subscribe to premium feature
export async function subscribeToPremiumFeature(featureId, durationMonths) {
  const premiumFeatures = await getPremiumFeaturesContractWithSigner()
  const subvToken = await getSUBVTokenContractWithSigner()

  // First get feature details to know the price
  const feature = await premiumFeatures.getFeatureDetails(featureId)
  const totalPrice = feature.pricePerMonth.mul(durationMonths)

  // Approve token spending
  const approveTx = await subvToken.approve(premiumFeatures.address, totalPrice)
  await approveTx.wait()

  // Subscribe to feature
  const subscribeTx = await premiumFeatures.subscribePremium(featureId, durationMonths)
  return await subscribeTx.wait()
}

// Check premium subscription status
export async function checkPremiumStatus(address, featureId) {
  const premiumFeatures = await getPremiumFeaturesContractWithSigner()
  return await premiumFeatures.isSubscriptionActive(address, featureId)
}