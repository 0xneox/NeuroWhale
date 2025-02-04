import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { CircleDot, TrendingDown, TrendingUp } from "lucide-react";

interface Transaction {
  id: string;
  chain: string;
  amount: number;
  type: "buy" | "sell";
  timestamp: string;
  intensity: "low" | "medium" | "high";
}

interface WhaleHeatmapProps {
  transactions?: Transaction[];
  selectedChain?: string;
  onChainSelect?: (chain: string) => void;
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    chain: "Ethereum",
    amount: 1500000,
    type: "buy",
    timestamp: "2024-03-20T10:00:00Z",
    intensity: "high",
  },
  {
    id: "2",
    chain: "Solana",
    amount: 800000,
    type: "sell",
    timestamp: "2024-03-20T10:05:00Z",
    intensity: "medium",
  },
  {
    id: "3",
    chain: "BSC",
    amount: 300000,
    type: "buy",
    timestamp: "2024-03-20T10:10:00Z",
    intensity: "low",
  },
];

const WhaleHeatmap = ({
  transactions = defaultTransactions,
  selectedChain = "Ethereum",
  onChainSelect = () => {},
}: WhaleHeatmapProps) => {
  const chains = ["Ethereum", "Solana", "BSC", "Avalanche"];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "high":
        return "bg-red-500/20";
      case "medium":
        return "bg-yellow-500/20";
      case "low":
        return "bg-green-500/20";
      default:
        return "bg-gray-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full h-[600px] p-6 bg-background/80 backdrop-blur-sm border hover:shadow-lg transition-shadow duration-300">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <motion.h2
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Whale Activity Heatmap
            </motion.h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge variant="outline" className="ml-2">
                      Live
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <CircleDot className="w-3 h-3 ml-1 text-green-500" />
                      </motion.div>
                    </Badge>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Real-time whale transaction data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Tabs defaultValue={selectedChain} className="w-full">
            <TabsList className="w-full justify-start">
              {chains.map((chain) => (
                <TabsTrigger
                  key={chain}
                  value={chain}
                  onClick={() => onChainSelect(chain)}
                >
                  {chain}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {chains.map((chain) => (
                <TabsContent key={chain} value={chain} className="mt-4">
                  <motion.div
                    className="grid grid-cols-6 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Array.from({ length: 24 }).map((_, hour) => {
                      const transaction = transactions.find(
                        (t) =>
                          t.chain === chain &&
                          new Date(t.timestamp).getHours() === hour,
                      );

                      return (
                        <TooltipProvider key={hour}>
                          <Tooltip>
                            <TooltipTrigger>
                              <motion.div
                                className={`aspect-square rounded-md flex items-center justify-center ${transaction ? getIntensityColor(transaction.intensity) : "bg-muted"}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.2,
                                  delay: hour * 0.02,
                                }}
                              >
                                {transaction && (
                                  <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {transaction.type === "buy" ? (
                                      <TrendingUp className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <TrendingDown className="w-5 h-5 text-red-500" />
                                    )}
                                  </motion.div>
                                )}
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {transaction ? (
                                <div>
                                  <p>
                                    Amount: $
                                    {transaction.amount.toLocaleString()}
                                  </p>
                                  <p>
                                    Time:{" "}
                                    {new Date(
                                      transaction.timestamp,
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                              ) : (
                                <p>No significant activity</p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </Card>
    </motion.div>
  );
};

export default WhaleHeatmap;
