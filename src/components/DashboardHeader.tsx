import React from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Wallet, Network, Bell, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  selectedNetwork?: string;
  onNetworkChange?: (network: string) => void;
  tokenBalance?: number;
  hasNotifications?: boolean;
}

const DashboardHeader = ({
  selectedNetwork = "ethereum",
  onNetworkChange = () => {},
  tokenBalance = 1000,
  hasNotifications = true,
}: DashboardHeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-[72px] bg-background/80 backdrop-blur-lg border-b border-border px-6 flex items-center justify-between sticky top-0 z-50"
    >
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              NeuroWhale
            </span>
          </motion.div>
        </div>

        {/* Network Selector */}
        <Select value={selectedNetwork} onValueChange={onNetworkChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="solana">Solana</SelectItem>
            <SelectItem value="bsc">BSC</SelectItem>
            <SelectItem value="avalanche">Avalanche</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* Token Balance */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="secondary" className="px-4 py-2">
                <Network className="w-4 h-4 mr-2" />
                {tokenBalance} NWHL
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your NeuroWhale Token Balance</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {hasNotifications && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
