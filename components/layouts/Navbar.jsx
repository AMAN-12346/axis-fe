"use client";

import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "Card Activation",
    "Card Deactivate",
    "Card Reward Redeem",
    "Card Protection",
    "Card Separate Merged Card",
    "Apply New Card",
    "Increase Limit",
    "Login"
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <img src="/axis.png" alt="Axis Bank" className="h-8 w-auto" />
            <span className="text-xl font-medium text-[#97144D] tracking-widest mt-1">
              AXIS BANK
            </span>
          </Link>
        </div>

        <button 
          className="p-1 rounded-md text-[#97144D] hover:bg-zinc-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="w-8 h-8" strokeWidth={2.5} />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>

          {/* Drawer Content */}
          <div className="relative w-80 bg-white h-full shadow-xl flex flex-col">
            
            {/* Maroon Header */}
            <div className="bg-[#A10D59] p-6 text-white text-center relative">
              <button 
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-[#A10D59] font-bold text-xl rounded-lg">
                  A
                </div>
              </div>
              <h2 className="text-sm font-bold">Axis Credit Card Services</h2>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={`/form?title=${encodeURIComponent(item)}`} 
                  className="flex items-center justify-between px-6 py-3.5 border-b border-zinc-100 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-[#A10D59] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
