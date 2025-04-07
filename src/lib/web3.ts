
import { Web3ReactHooks, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';

// Initialize MetaMask connector
export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

// List of connectors
export const connectors: [Connector, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
];

// Export hooks from MetaMask
export const { 
  useChainId, 
  useAccounts, 
  useIsActivating, 
  useIsActive, 
  useProvider, 
  useENSNames 
} = metaMaskHooks;

// Define a custom hook to get combined web3 state
export function useWeb3React() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();

  return {
    chainId,
    account: accounts?.[0],
    accounts,
    isActivating,
    isActive,
    provider,
    connector: metaMask
  };
}
