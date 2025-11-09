import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  hardhat,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'VotingDApp',
  projectId: '43ad57af286e1c1ce143a75ef96efa3c',
  chains: [hardhat, sepolia],
  ssr: false, // Désactivé pour éviter les problèmes ESM/CommonJS sur Vercel
});

const queryClient = new QueryClient();

export function RainbowkitAndWagmiProvider({ children }: { children: React.ReactNode }) {
  return (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider> 
  );
}