import React from "react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Wallet, Activity } from "lucide-react";
import { formatCurrency, formatAddress } from "../lib/utils";

interface TokenMetricsProps {
  price: number;
  holders: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
}

const TokenMetrics = ({
  price = 0.0001,
  holders = 1200,
  marketCap = 100000,
  volume24h = 50000,
  priceChange24h = 15.5,
}: TokenMetricsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      <Card className="p-4 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 rounded-full bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-bold">${price.toFixed(6)}</p>
            <p
              className={`text-sm ${priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {priceChange24h >= 0 ? "+" : ""}
              {priceChange24h}%
            </p>
          </div>
        </motion.div>
      </Card>

      <Card className="p-4 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 rounded-full bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Holders</p>
            <p className="text-lg font-bold">{holders.toLocaleString()}</p>
            <p className="text-sm text-green-500">
              +{Math.floor(holders * 0.1)} today
            </p>
          </div>
        </motion.div>
      </Card>

      <Card className="p-4 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 rounded-full bg-primary/10">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="text-lg font-bold">{formatCurrency(marketCap)}</p>
            <p className="text-sm text-green-500">Rank #1205</p>
          </div>
        </motion.div>
      </Card>

      <Card className="p-4 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 rounded-full bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-lg font-bold">{formatCurrency(volume24h)}</p>
            <p className="text-sm text-muted-foreground">
              {Math.floor(volume24h / price)} NWHL
            </p>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default TokenMetrics;
