import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface AISignal {
  confidence: number;
  type: "buy" | "sell";
  timestamp: string;
  description: string;
}

interface AISignalsPanelProps {
  signals?: AISignal[];
}

const defaultSignals: AISignal[] = [
  {
    confidence: 85,
    type: "buy",
    timestamp: "2024-03-21 14:30",
    description: "Strong accumulation pattern detected across major wallets",
  },
  {
    confidence: 62,
    type: "sell",
    timestamp: "2024-03-21 13:15",
    description: "Increased selling pressure from whale clusters",
  },
];

const AISignalsPanel = ({ signals = defaultSignals }: AISignalsPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[400px] h-[300px] p-4 bg-background/80 backdrop-blur-sm border hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col h-full">
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold">AI Signals</h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge variant="outline" className="bg-secondary">
                <TrendingUp className="w-4 h-4 mr-1" />
                Live
              </Badge>
            </motion.div>
          </motion.div>

          <div className="space-y-4 overflow-auto">
            <AnimatePresence>
              {signals.map((signal, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg ${signal.type === "buy" ? "bg-green-500/10" : "bg-red-500/10"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {signal.type === "buy" ? (
                        <ArrowUpCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium capitalize">
                        {signal.type} Signal
                      </span>
                    </motion.div>
                    <span className="text-sm text-muted-foreground">
                      {signal.timestamp}
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Confidence</span>
                      <motion.span
                        className="text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      >
                        {signal.confidence}%
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <Progress
                        value={signal.confidence}
                        className={
                          signal.type === "buy"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      />
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    {signal.description}
                  </motion.p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AISignalsPanel;
