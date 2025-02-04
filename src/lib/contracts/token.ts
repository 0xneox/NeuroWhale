import { ethers } from "ethers";

export const TOKEN_ADDRESS = {
  ethereum: "0x...", // Replace with actual token address
  bsc: "0x...", // Replace with actual token address
  avalanche: "0x...", // Replace with actual token address
  solana: "...", // Replace with actual token address
};

export const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export function getTokenContract(chainId: number, library: any) {
  if (!TOKEN_ADDRESS || !library) return null;
  try {
    return new ethers.Contract(
      TOKEN_ADDRESS[chainId],
      TOKEN_ABI,
      library.getSigner(),
    );
  } catch (error) {
    console.error("Failed to get token contract", error);
    return null;
  }
}
