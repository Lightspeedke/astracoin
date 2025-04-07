
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "sonner";
import { 
  metaMask, 
  useWeb3React 
} from "@/lib/web3";
import { Wallet, ChevronDown } from "lucide-react";

const WalletConnect = () => {
  const { connector, account, isActive } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Connect to wallet
  const connectWallet = async (walletType: "metamask") => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      if (walletType === "metamask") {
        await metaMask.activate();
        toast.success("Wallet connected successfully");
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Failed to connect wallet", {
        description: "Please make sure your wallet is installed and unlocked."
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      if (connector?.deactivate) {
        await connector.deactivate();
      } else {
        await connector.resetState();
      }
      toast.info("Wallet disconnected");
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  return (
    <>
      {!isActive ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="gradient-button">
              Connect Wallet <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0 bg-astracoin-deep-purple border-astracoin-medium-purple/30">
            <div className="grid gap-2 p-3">
              <Button 
                onClick={() => connectWallet("metamask")} 
                disabled={isConnecting} 
                variant="outline" 
                className="border-astracoin-medium-purple/30 text-white hover:text-white hover:bg-astracoin-medium-purple/20"
              >
                <img 
                  src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg" 
                  alt="MetaMask" 
                  className="h-4 w-4 mr-2" 
                />
                MetaMask
                {isConnecting && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white ml-2"></div>}
              </Button>
              {/* Add more wallet options here */}
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="gradient-button purple-glow">
              <Wallet className="mr-2 h-4 w-4" />
              {account ? formatAddress(account) : "Connected"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3 bg-astracoin-deep-purple border-astracoin-medium-purple/30">
            <div className="space-y-3">
              {account && (
                <div className="text-sm break-all">
                  <p className="text-gray-400">Connected address:</p>
                  <p className="font-mono text-white">{account}</p>
                </div>
              )}
              <Button 
                onClick={disconnectWallet} 
                variant="outline" 
                className="w-full border-astracoin-medium-purple/30 text-white hover:text-white hover:bg-astracoin-medium-purple/20"
              >
                Disconnect
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default WalletConnect;
