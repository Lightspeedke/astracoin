
import { useState, useEffect } from "react";
import { Coins, ShieldCheck, Zap, Users, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import WhitelistForm from "@/components/WhitelistForm";
import FeatureCard from "@/components/FeatureCard";
import FloatingStars from "@/components/FloatingStars";
import WalletConnect from "@/components/WalletConnect";

const Index = () => {
  // Use consistent whitelist closing date from localStorage or set a new one
  const [targetDate, setTargetDate] = useState(() => {
    const savedDate = localStorage.getItem("whitelist_end_date");
    if (savedDate) {
      return new Date(savedDate);
    } else {
      // Set to 7 days from now if not already set
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    }
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Floating stars background */}
      <FloatingStars />
      
      {/* Header */}
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <img 
            src="https://assets.onecompiler.app/42p32vw56/43bcqbgx8/1000012334.png" 
            alt="AstraCoin Logo" 
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-xl font-bold text-white">AstraCoin</h1>
        </div>
        <WalletConnect />
      </header>

      {/* Hero Section */}
      <section className="flex-1 py-12 md:py-20 px-6 md:px-12 flex flex-col items-center justify-center relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 gradient-text">
                  Join the Future of Cosmic Finance
                </h1>
                <p className="text-lg md:text-xl text-astracoin-text-gray max-w-lg mx-auto lg:mx-0">
                  Get exclusive early access to AstraCoin, the revolutionary cryptocurrency that's taking the digital universe by storm.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button className="gradient-button purple-glow px-8 py-6 text-lg">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="bg-transparent text-white border-astracoin-medium-purple px-8 py-6 text-lg">
                  Tokenomics
                </Button>
              </div>
              <div className="pt-4">
                <CountdownTimer targetDate={targetDate} />
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <WhitelistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-astracoin-deep-purple/40 to-transparent relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Why Join Our Whitelist?
            </h2>
            <p className="text-astracoin-text-gray max-w-2xl mx-auto">
              Being on our whitelist gives you exclusive access to AstraCoin before it takes off. Don't miss your chance to be part of our cosmic journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Early Access"
              description="Be among the first to own AstraCoin before it's available to the public."
              icon={Zap}
            />
            <FeatureCard
              title="Special Pricing"
              description="Whitelist members enjoy exclusive pricing not available during public sale."
              icon={Coins}
            />
            <FeatureCard
              title="Enhanced Security"
              description="Our advanced blockchain technology ensures your investment is safe."
              icon={ShieldCheck}
            />
            <FeatureCard
              title="Community Benefits"
              description="Join a thriving community of innovators and early adopters."
              icon={Users}
            />
          </div>
        </div>
      </section>
      
      {/* Partnership Section */}
      <section className="py-16 px-6 md:px-12 relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="glass-card rounded-xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-astracoin-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1 rounded-full bg-astracoin-medium-purple/20 border border-astracoin-medium-purple/30 text-astracoin-accent text-sm font-medium">
                    New Partnership
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                    TradePulse Token
                  </h2>
                  <p className="text-astracoin-text-gray">
                    We're excited to announce our strategic partnership with TradePulse Token, creating new opportunities for cross-platform trading and enhanced liquidity for both ecosystems.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <ChevronRight className="text-astracoin-accent mr-2 h-5 w-5" />
                      <span className="text-white">Shared liquidity pools</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="text-astracoin-accent mr-2 h-5 w-5" />
                      <span className="text-white">Cross-chain trading capabilities</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="text-astracoin-accent mr-2 h-5 w-5" />
                      <span className="text-white">Combined technical development</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-4 bg-transparent text-white border-astracoin-accent hover:bg-astracoin-accent/10">
                    Learn More
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="bg-gradient-to-b from-astracoin-dark-blue/40 to-astracoin-deep-purple/40 p-6 rounded-2xl border border-astracoin-medium-purple/20 shadow-lg max-w-xs w-full">
                    <div className="flex flex-col items-center">
                      <img 
                        src="https://assets.onecompiler.app/42p32vw56/43b38xwbq/1000035087.png" 
                        alt="TradePulse Token Logo" 
                        className="h-32 w-32 object-contain mb-6 animate-pulse-glow"
                      />
                      <div className="text-center space-y-2">
                        <h3 className="text-white text-xl font-bold">TradePulse Token</h3>
                        <p className="text-sm text-astracoin-text-gray">
                          A revolutionary trading platform with AI-powered market insights and advanced analytics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-astracoin-medium-purple/20 relative z-10">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img 
              src="https://assets.onecompiler.app/42p32vw56/43bcqbgx8/1000012334.png" 
              alt="AstraCoin Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-sm text-white">AstraCoin © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-astracoin-text-gray hover:text-white">Terms</a>
            <a href="#" className="text-sm text-astracoin-text-gray hover:text-white">Privacy</a>
            <a href="#" className="text-sm text-astracoin-text-gray hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-[10%] w-32 h-32 bg-astracoin-medium-purple/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-[30%] right-[5%] w-64 h-64 bg-astracoin-accent/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-[10%] left-[15%] w-48 h-48 bg-astracoin-bright-purple/10 rounded-full blur-3xl animate-pulse-glow"></div>
    </div>
  );
};

export default Index;
