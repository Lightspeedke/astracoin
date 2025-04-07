
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useWeb3React } from "@/lib/web3";
import { supabase } from "@/integrations/supabase/client";

const WhitelistForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { account } = useWeb3React();

  // Check if user is already registered (from localStorage)
  useEffect(() => {
    const registrationStatus = localStorage.getItem("astracoin_registered");
    if (registrationStatus === "true") {
      setIsRegistered(true);
    }
  }, []);

  // Auto-fill wallet address if connected
  useEffect(() => {
    if (account) {
      setWallet(account);
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('whitelist')
        .insert([
          { email, name, wallet_address: wallet }
        ]);

      if (error) {
        if (error.code === '23505') {
          toast.error("This email is already registered", {
            description: "Please use a different email address."
          });
        } else {
          console.error("Supabase error:", error);
          toast.error("Registration failed", {
            description: "Please try again later."
          });
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSuccess(true);
      // Save registration status to localStorage
      localStorage.setItem("astracoin_registered", "true");
      setIsRegistered(true);
      
      toast.success("Success! You've been added to the whitelist.", {
        description: "You'll receive updates about AstraCoin's launch soon.",
      });
      
      // Reset form after delay
      setTimeout(() => {
        setEmail("");
        setName("");
        setWallet("");
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Registration failed", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="glass-card rounded-xl p-6 md:p-8 w-full max-w-md text-center">
        <Check className="w-10 h-10 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">You're on the whitelist!</h3>
        <p className="text-astracoin-text-gray">
          Thank you for joining. You'll receive updates about AstraCoin's launch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 w-full max-w-md">
      <h3 className="text-xl font-bold mb-6 text-center">Join the Whitelist</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting || isSuccess}
            className="bg-astracoin-deep-purple/50 border-astracoin-medium-purple/30 placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || isSuccess}
            className="bg-astracoin-deep-purple/50 border-astracoin-medium-purple/30 placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Wallet Address (Optional)"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            disabled={isSubmitting || isSuccess}
            className="bg-astracoin-deep-purple/50 border-astracoin-medium-purple/30 placeholder:text-gray-400"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting || isSuccess}
          className={`w-full h-12 text-base font-medium ${isSuccess ? 'bg-green-600 hover:bg-green-700' : 'gradient-button purple-glow'}`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              <span className="ml-2">Processing...</span>
            </div>
          ) : isSuccess ? (
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 mr-2" />
              <span>Registered!</span>
            </div>
          ) : (
            "Join Whitelist"
          )}
        </Button>
        {account && !wallet && (
          <div className="mt-4 text-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setWallet(account)}
              className="text-sm border-astracoin-medium-purple/30 text-white hover:text-white hover:bg-astracoin-medium-purple/20"
            >
              Use connected wallet
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default WhitelistForm;
