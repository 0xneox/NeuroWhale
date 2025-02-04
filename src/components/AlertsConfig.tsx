import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";

interface AlertsConfigProps {
  onSave?: (config: AlertConfig) => void;
  initialConfig?: AlertConfig;
}

interface AlertConfig {
  transactionThreshold: number;
  watchedWallets: string[];
  enabledChains: string[];
  notifications: boolean;
}

const DEFAULT_CONFIG: AlertConfig = {
  transactionThreshold: 1000000,
  watchedWallets: ["0x1234...5678", "0x9abc...def0"],
  enabledChains: ["ethereum", "solana"],
  notifications: true,
};

const AlertsConfig = ({
  onSave,
  initialConfig = DEFAULT_CONFIG,
}: AlertsConfigProps) => {
  const [config, setConfig] = React.useState<AlertConfig>(initialConfig);

  const handleSave = () => {
    onSave?.(config);
  };

  return (
    <Card className="w-full max-w-[400px] p-6 bg-background border-border">
      <h2 className="text-2xl font-bold mb-6">Alert Configuration</h2>

      <Tabs defaultValue="thresholds" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
          <TabsTrigger value="chains">Chains</TabsTrigger>
        </TabsList>

        <TabsContent value="thresholds" className="space-y-4">
          <div className="space-y-4">
            <Label>Transaction Threshold (USD)</Label>
            <Slider
              defaultValue={[config.transactionThreshold]}
              max={10000000}
              step={100000}
              onValueChange={(value) =>
                setConfig({ ...config, transactionThreshold: value[0] })
              }
            />
            <div className="text-sm text-muted-foreground">
              Current: ${config.transactionThreshold.toLocaleString()}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-4">
          <div className="space-y-4">
            <Label>Watched Wallets</Label>
            {config.watchedWallets.map((wallet, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={wallet}
                  onChange={(e) => {
                    const newWallets = [...config.watchedWallets];
                    newWallets[index] = e.target.value;
                    setConfig({ ...config, watchedWallets: newWallets });
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    const newWallets = config.watchedWallets.filter(
                      (_, i) => i !== index,
                    );
                    setConfig({ ...config, watchedWallets: newWallets });
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                setConfig({
                  ...config,
                  watchedWallets: [...config.watchedWallets, ""],
                });
              }}
            >
              Add Wallet
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="chains" className="space-y-4">
          <div className="space-y-4">
            <Label>Monitored Chains</Label>
            <Select
              defaultValue={config.enabledChains[0]}
              onValueChange={(value) => {
                if (!config.enabledChains.includes(value)) {
                  setConfig({
                    ...config,
                    enabledChains: [...config.enabledChains, value],
                  });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="bsc">BSC</SelectItem>
                <SelectItem value="avalanche">Avalanche</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2">
              {config.enabledChains.map((chain) => (
                <div key={chain} className="flex items-center justify-between">
                  <span className="capitalize">{chain}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setConfig({
                        ...config,
                        enabledChains: config.enabledChains.filter(
                          (c) => c !== chain,
                        ),
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable Notifications</Label>
          <Switch
            checked={config.notifications}
            onCheckedChange={(checked) =>
              setConfig({ ...config, notifications: checked })
            }
          />
        </div>

        <Button className="w-full" onClick={handleSave}>
          Save Configuration
        </Button>
      </div>
    </Card>
  );
};

export default AlertsConfig;
