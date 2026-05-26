"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Gift, 
  LogIn, 
  Plus, 
  GitFork, 
  TrendingUp,
  ShieldCheck,
  Check,
  X,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const sliderCards = [
  {
    title: "Increase Limit",
    desc1: "Request higher limits and enjoy more power.",
    desc2: "Maintain good credit usage to qualify for higher limits faster.",
    icon: TrendingUp,
    bg: "from-[#A10D59] to-[#E25C34]",
    iconBg: "bg-[#FFB03A]",
  },
  {
    title: "Pre-approved Loan",
    desc1: "Get instant loans with attractive interest rates.",
    desc2: "Zero documentation required for pre-approved customers.",
    icon: GitFork,
    bg: "from-[#2B4C7E] to-[#457B9D]",
    iconBg: "bg-[#A8DADC]",
  },
  {
    title: "Reward Multiplier",
    desc1: "Earn 5X Reward Points on your shopping.",
    desc2: "Shop on our partner brands and multiply your rewards.",
    icon: Gift,
    bg: "from-[#A10D59] to-[#6A0572]",
    iconBg: "bg-[#FFD166]",
  },
  {
    title: "Forex Card Benefits",
    desc1: "Travel Seamlessly with zero markup fee.",
    desc2: "Manage multiple currencies with a single Axis Forex card.",
    icon: CreditCard,
    bg: "from-[#E25C34] to-[#A10D59]",
    iconBg: "bg-[#2B4C7E]",
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderCards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] font-sans text-zinc-800">
      <Navbar />

      // Welcome Banner
      <div className="bg-[#F5E6EA] py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-xl font-medium text-[#97144D] mb-1">
            Welcome to Axis Credit Card Services
          </h1>
          <p className="text-xs text-zinc-800 tracking-tight">
            View account summary, check available credit, track rewards, and securely manage all your cards.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        // Slider / Banner Card
        <div className="relative overflow-hidden rounded-xl shadow-sm h-36 sm:h-40">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-0 bg-gradient-to-r ${sliderCards[currentSlide].bg} p-6 text-white flex flex-col justify-between`}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2 max-w-lg pr-4">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = sliderCards[currentSlide].icon;
                      return <IconComponent className="w-4 h-4 text-white" />;
                    })()}
                    <span className="text-sm font-semibold">{sliderCards[currentSlide].title}</span>
                  </div>
                  <p className="text-xs opacity-90">{sliderCards[currentSlide].desc1}</p>
                  <p className="text-xs opacity-75 hidden sm:block">{sliderCards[currentSlide].desc2}</p>
                </div>
                
                // Circular Icon on right
                <div className={`w-12 h-12 ${sliderCards[currentSlide].iconBg} rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                  {(() => {
                    const IconComponent = sliderCards[currentSlide].icon;
                    return <IconComponent className="w-6 h-6" />;
                  })()}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          // Slider Dots
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            {sliderCards.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/75 w-1.5'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        // Section: Card Protection & Security
        <div className="bg-white rounded-lg p-6 text-center space-y-4 border border-zinc-100 shadow-sm">
          <h2 className="text-base font-bold text-[#A10D59]">Card Protection & Security</h2>
          <p className="text-xs text-zinc-500 max-w-2xl mx-auto">
            Safeguard your credit cards against unauthorized transactions, report lost/stolen cards, and activate instant blocks.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/form?title=Card%20Activation">
              <Button size="sm" className="bg-[#A10D59] hover:bg-[#8E0C4F] text-white text-xs gap-1 h-8 px-4 rounded-md">
                <Check className="w-3.5 h-3.5" /> Activate
              </Button>
            </Link>
            <Link href="/form?title=Card%20Deactivation">
              <Button size="sm" className="bg-[#A10D59] hover:bg-[#8E0C4F] text-white text-xs gap-1 h-8 px-4 rounded-md">
                <X className="w-3.5 h-3.5" /> Deactivate
              </Button>
            </Link>
          </div>
        </div>

        // Section: Reward Points & Offers
        <div className="bg-white rounded-lg p-6 text-center space-y-4 border border-zinc-100 shadow-sm">
          <h2 className="text-base font-bold text-[#A10D59]">Reward Points & Offers</h2>
          <p className="text-xs text-zinc-500 max-w-2xl mx-auto">
            Check your reward points balance, redeem points for exciting offers, and access exclusive vouchers.
          </p>
          <div className="flex justify-center">
            <Link href="/form?title=Reward%20Points%20Redemption">
              <Button size="sm" className="bg-[#A10D59] hover:bg-[#8E0C4F] text-white text-xs gap-1 h-8 px-4 rounded-md">
                <Gift className="w-3.5 h-3.5" /> Redeem Points
              </Button>
            </Link>
          </div>
        </div>

        // Section: Account & Transactions
        <div className="bg-white rounded-lg p-6 text-center space-y-4 border border-zinc-100 shadow-sm">
          <h2 className="text-base font-bold text-[#A10D59]">Account & Transactions</h2>
          <p className="text-xs text-zinc-500 max-w-2xl mx-auto">
            Login securely to view statements, monitor transactions, and manage your card settings anytime, anywhere.
          </p>
          <div className="flex justify-center">
            <Link href="/form?title=Account%20Login">
              <Button size="sm" className="bg-[#A10D59] hover:bg-[#8E0C4F] text-white text-xs gap-1 h-8 px-4 rounded-md">
                <LogIn className="w-3.5 h-3.5" /> Login Now
              </Button>
            </Link>
          </div>
        </div>

        // Section: Card Management
        <div className="bg-white rounded-lg p-6 text-center space-y-4 border border-zinc-100 shadow-sm">
          <h2 className="text-base font-bold text-[#A10D59]">Card Management</h2>
          <p className="text-xs text-zinc-500 max-w-2xl mx-auto">
            Apply for new credit cards, merge accounts, request credit limit increases, and manage multiple cards efficiently.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/form?title=Apply%20New%20Card">
              <Button size="sm" className="bg-[#A10D59] hover:bg-[#8E0C4F] text-white text-xs gap-1 h-8 px-4 rounded-md">
                <CreditCard className="w-3.5 h-3.5" /> Apply New Card
              </Button>
            </Link>
            <Link href="/form?title=Merge%20/%20Split%20Card">
              <Button size="sm" className="bg-[#A10D59] hover:bg-[#8E0C4F] text-white text-xs gap-1 h-8 px-4 rounded-md">
                <GitFork className="w-3.5 h-3.5" /> Merge / Split Card
              </Button>
            </Link>
            <Link href="/form?title=Card%20Limit%20Increase%20Application">
              <Button size="sm" className="bg-[#A10D59] hover:bg-[#8E0C4F] text-white text-xs gap-1 h-8 px-4 rounded-md">
                <TrendingUp className="w-3.5 h-3.5" /> Increase Credit Card Limit
              </Button>
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
