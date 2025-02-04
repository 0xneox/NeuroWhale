import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  type: "inflow" | "outflow";
  chain: string;
  wallet: string;
}

interface TransactionFeedProps {
  transactions?: Transaction[];
  onTransactionClick?: (transaction: Transaction) => void;
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    timestamp: "2024-03-21 14:30:00",
    amount: 1500000,
    type: "inflow",
    chain: "ETH",
    wallet: "0x1234...5678",
  },
  {
    id: "2",
    timestamp: "2024-03-21 14:25:00",
    amount: 2300000,
    type: "outflow",
    chain: "SOL",
    wallet: "ABC123...XYZ",
  },
  {
    id: "3",
    timestamp: "2024-03-21 14:20:00",
    amount: 890000,
    type: "inflow",
    chain: "BSC",
    wallet: "0x9876...4321",
  },
];

const TransactionFeed = ({
  transactions = defaultTransactions,
  onTransactionClick = () => {},
}: TransactionFeedProps) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[400px] h-[600px] bg-background/80 backdrop-blur-sm border hover:shadow-lg transition-shadow duration-300">
        <motion.div
          className="p-4 border-b border-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold">Whale Transactions</h2>
        </motion.div>

        <ScrollArea className="h-[calc(600px-64px)]">
          <div className="p-4 space-y-4">
            <AnimatePresence>
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="p-4 rounded-lg border border-border hover:bg-accent cursor-pointer"
                          onClick={() => onTransactionClick(transaction)}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "var(--accent)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <motion.div
                              className="flex items-center space-x-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {transaction.type === "inflow" ? (
                                <ArrowUpRight className="text-green-500" />
                              ) : (
                                <ArrowDownRight className="text-red-500" />
                              )}
                              <span className="font-medium">
                                {formatAmount(transaction.amount)}
                              </span>
                            </motion.div>
                            <Badge variant="outline">{transaction.chain}</Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <span>{transaction.wallet}</span>
                              <motion.div
                                whileHover={{ rotate: 45 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </motion.div>
                            </div>
                            <span>{formatTime(transaction.timestamp)}</span>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to view transaction details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
};

export default TransactionFeed;
