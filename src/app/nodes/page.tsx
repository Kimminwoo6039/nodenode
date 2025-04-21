import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Plus } from "lucide-react";

export default function NodesPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Select Chain</h1>
          <p className="text-sm text-muted-foreground">
            Select provider you want to run node on
          </p>
        </div>

        {/* Available chains */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockchainNetworks.map((network) => (
            <BlockchainCard
              key={network.id}
              name={network.name}
              type={network.type}
              logo={network.logo}
              status={network.status as "Live" | "Testnet" | "Coming Soon"}
              description={network.description}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

type BlockchainCardProps = {
  name: string;
  type: string;
  logo: string;
  status: "Live" | "Testnet" | "Coming Soon";
  description?: string;
};

function BlockchainCard({ name, type, logo, status, description }: BlockchainCardProps) {
  const isComingSoon = status === "Coming Soon";

  return (
    <Card className={`nodeops-card overflow-hidden relative transition-transform duration-200 hover:scale-[1.02] ${isComingSoon ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center">
            {logo ? (
              <span className="text-xl font-bold">{logo.slice(0, 2)}</span>
            ) : (
              <Info className="h-6 w-6" />
            )}
          </div>
          <div className="flex items-center text-xs rounded-full px-3 py-1 bg-secondary text-foreground">
            {status === "Live" && <span className="mr-2 h-2 w-2 rounded-full bg-green-500 node-active" />}
            {status === "Testnet" && <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500 node-active" />}
            {status === "Coming Soon" && <span className="mr-2 h-2 w-2 rounded-full bg-gray-500" />}
            {status}
          </div>
        </div>
        <CardTitle className="mt-2">{name}</CardTitle>
        <CardDescription>{type}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {description || `Run a ${name} node on the ${status.toLowerCase()} network.`}
        </p>
        <Button
          className={`w-full ${!isComingSoon ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-secondary text-muted-foreground'}`}
          disabled={isComingSoon}
        >
          <Plus className="mr-2 h-4 w-4" /> Deploy Node
        </Button>
      </CardContent>
      {isComingSoon && (
        <div className="absolute top-0 right-0 bg-secondary text-xs font-medium px-2 py-1 rounded-bl">
          Coming Soon
        </div>
      )}
    </Card>
  );
}

// Properly typed blockchain networks
type NetworkStatus = "Live" | "Testnet" | "Coming Soon";

type BlockchainNetwork = {
  id: string;
  name: string;
  type: string;
  logo: string;
  status: NetworkStatus;
  description: string;
};

const blockchainNetworks: BlockchainNetwork[] = [
  {
    id: "1",
    name: "EigenLayer",
    type: "Restaking Protocol",
    logo: "EL",
    status: "Testnet",
    description: "Restake your ETH across multiple networks and earn additional yield."
  },
  {
    id: "2",
    name: "Glacier",
    type: "Dedicated Sentry Operator",
    logo: "GL",
    status: "Live",
    description: "Run a Glacier node with dedicated sentry operator capabilities."
  },
  {
    id: "3",
    name: "UNO",
    type: "Cross-chain Protocol",
    logo: "UN",
    status: "Live",
    description: "Participate in the UNO cross-chain ecosystem with validator nodes."
  },
  {
    id: "4",
    name: "Celestia",
    type: "Data Availability Layer",
    logo: "CE",
    status: "Testnet",
    description: "Run a Celestia node to support the modular data availability layer."
  },
  {
    id: "5",
    name: "Fuel",
    type: "Modular Execution Layer",
    logo: "FL",
    status: "Testnet",
    description: "Deploy a Fuel node for high-throughput modular execution."
  },
  {
    id: "6",
    name: "Aethir",
    type: "Decentralized GPU Network",
    logo: "AE",
    status: "Coming Soon",
    description: "Join the Aethir network to monetize GPU resources in the decentralized cloud."
  },
  {
    id: "7",
    name: "Taiko",
    type: "ZK Rollup",
    logo: "TK",
    status: "Coming Soon",
    description: "Operate a Taiko ZK rollup node to secure Ethereum's layer 2 ecosystem."
  },
  {
    id: "8",
    name: "Shardeum",
    type: "EVM-compatible Sharded Network",
    logo: "SH",
    status: "Testnet",
    description: "Run a Shardeum validator to support the sharded, EVM-compatible network."
  },
  {
    id: "9",
    name: "Avail",
    type: "Data Availability Layer",
    logo: "AV",
    status: "Testnet",
    description: "Operate an Avail node to support the data availability layer."
  }
];
