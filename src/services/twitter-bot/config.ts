export const TWITTER_CONFIG = {
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
};

export const WHALE_THRESHOLDS = {
  ethereum: 1000000, // $1M USD
  solana: 500000, // $500k USD
  bsc: 300000, // $300k USD
  avalanche: 200000, // $200k USD
};
