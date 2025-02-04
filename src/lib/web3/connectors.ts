import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 137, 43114], // Ethereum, BSC, Polygon, Avalanche
});
