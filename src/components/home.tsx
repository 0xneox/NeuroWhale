import React, { useState } from "react";
import TokenMetrics from "./TokenMetrics";
import PredictionLeaderboard from "./PredictionLeaderboard";
import DashboardHeader from "./DashboardHeader";
import WhaleHeatmap from "./WhaleHeatmap";
import AISignalsPanel from "./AISignalsPanel";
import AlertsConfig from "./AlertsConfig";
import TransactionFeed from "./TransactionFeed";
import { motion } from "framer-motion";

interface HomeProps {
  selectedNetwork?: string;
  onNetworkChange?: (network: string) => void;
  tokenBalance?: number;
  hasNotifications?: boolean;
}

interface Transaction {
  id: string;
  chain: string;
  amount: number;
  type: "buy" | "sell";
  timestamp: string;
  intensity: "low" | "medium" | "high";
}

const Home = ({
  selectedNetwork: initialNetwork = "solana",
  onNetworkChange = () => {},
  tokenBalance = 1000,
  hasNotifications = true,
}: HomeProps) => {
  const [selectedNetwork, setSelectedNetwork] = useState(initialNetwork);
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      chain: "Solana",
      amount: 2500000,
      type: "buy",
      timestamp: new Date().toISOString(),
      intensity: "high",
    },
    {
      id: "2",
      chain: "Solana",
      amount: 1800000,
      type: "sell",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      intensity: "medium",
    },
  ]);

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
    onNetworkChange(network);
  };

  const handleAlertConfigSave = (config: any) => {
    console.log("Alert configuration saved:", config);
  };

  const handleTransactionClick = (transaction: any) => {
    console.log("Transaction clicked:", transaction);
  };

  return (
    <motion.div
      className="min-h-screen bg-background dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DashboardHeader
        selectedNetwork={selectedNetwork}
        onNetworkChange={handleNetworkChange}
        tokenBalance={tokenBalance}
        hasNotifications={hasNotifications}
      />

      <main className="container mx-auto p-6 space-y-6">
        <TokenMetrics
          price={0.00012}
          holders={1234}
          marketCap={120000}
          volume24h={45000}
          priceChange24h={12.5}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WhaleHeatmap
              selectedChain={selectedNetwork}
              onChainSelect={handleNetworkChange}
              transactions={transactions}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AISignalsPanel
                signals={[
                  {
                    confidence: 92,
                    type: "buy",
                    timestamp: "2024-03-21 14:30",
                    description: "Major accumulation detected on Solana",
                  },
                  {
                    confidence: 78,
                    type: "sell",
                    timestamp: "2024-03-21 14:15",
                    description:
                      "Increased selling pressure from whale clusters",
                  },
                ]}
              />
              <AlertsConfig
                onSave={handleAlertConfigSave}
                initialConfig={{
                  transactionThreshold: 1000000,
                  watchedWallets: [],
                  enabledChains: ["solana"],
                  notifications: true,
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <TransactionFeed
              transactions={[
                {
                  id: "1",
                  timestamp: new Date().toISOString(),
                  amount: 2500000,
                  type: "inflow",
                  chain: "SOL",
                  wallet: "HN7cABqLq...vn1",
                },
                {
                  id: "2",
                  timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                  amount: 1800000,
                  type: "outflow",
                  chain: "SOL",
                  wallet: "5QBAG5jW...Rk9",
                },
              ]}
              onTransactionClick={handleTransactionClick}
            />
          </div>
        </div>

        <div className="mt-6">
          <PredictionLeaderboard />
        </div>
      </main>
    </motion.div>
  );
};

export default Home;
