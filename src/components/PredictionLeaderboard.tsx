import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { Crown, Target, TrendingUp } from "lucide-react";

interface Predictor {
  rank: number;
  name: string;
  avatar: string;
  accuracy: number;
  profit: number;
  streak: number;
}

interface PredictionLeaderboardProps {
  predictors?: Predictor[];
}

const defaultPredictors: Predictor[] = [
  {
    rank: 1,
    name: "WhaleHunter",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WhaleHunter",
    accuracy: 92,
    profit: 145000,
    streak: 7,
  },
  {
    rank: 2,
    name: "CryptoSage",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoSage",
    accuracy: 88,
    profit: 98000,
    streak: 5,
  },
  {
    rank: 3,
    name: "AlphaSeeker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlphaSeeker",
    accuracy: 85,
    profit: 76000,
    streak: 4,
  },
];

const PredictionLeaderboard = ({
  predictors = defaultPredictors,
}: PredictionLeaderboardProps) => {
  return (
    <Card className="w-full p-6 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-bold">Top Predictors</h2>
        </div>
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
          Weekly Rankings
        </Badge>
      </div>

      <div className="space-y-4">
        {predictors.map((predictor, index) => (
          <motion.div
            key={predictor.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-muted-foreground">
                #{predictor.rank}
              </span>
              <Avatar className="h-10 w-10">
                <AvatarImage src={predictor.avatar} />
                <AvatarFallback>{predictor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{predictor.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <span>{predictor.accuracy}% accuracy</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-green-500 font-medium">
                  +${predictor.profit.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {predictor.streak} streak 🔥
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default PredictionLeaderboard;
