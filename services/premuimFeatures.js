// Initialize PremiumFeatures contract
const PremiumFeaturesAddress = '0x9C2e3066f260BF7a23f5403748Ae518301C2A830';
const { ethers } = require('ethers');
const PremiumFeaturesABI = require('./abis/PremiumFeatures.json');
const premiumFeatures = new ethers.Contract(PremiumFeaturesAddress, PremiumFeaturesABI.abi, signer);

// Get available features
async function getFeatureDetails(featureId) {
  const feature = await premiumFeatures.getFeatureDetails(featureId);
  
  return {
    name: feature.name,
    description: feature.description,
    pricePerMonth: ethers.utils.formatEther(feature.pricePerMonth),
    active: feature.active
  };
}

// Subscribe to premium feature
async function subscribeToPremiumFeature(featureId, durationMonths) {
  // First get feature details to know the price
  const feature = await premiumFeatures.getFeatureDetails(featureId);
  const totalPrice = feature.pricePerMonth.mul(durationMonths);
  
  // Approve token spending
  const approveTx = await subvToken.approve(PremiumFeaturesAddress, totalPrice);
  await approveTx.wait();
  
  // Subscribe to feature
  const subscribeTx = await premiumFeatures.subscribePremium(featureId, durationMonths);
  return await subscribeTx.wait();
}

// Check premium subscription status
async function checkPremiumStatus(address, featureId) {
  return await premiumFeatures.isSubscriptionActive(address, featureId);
}