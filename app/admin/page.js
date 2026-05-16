"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LockIcon, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin09@gmail.com" && password === "Noida") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-100">
        
        {/* Maroon Header */}
        <div className="bg-[#A10D59] p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-white flex items-center justify-center text-[#A10D59] font-bold text-2xl rounded-xl shadow-inner">
              <ShieldAlert className="w-8 h-8 text-[#A10D59]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-wide">Admin Portal</h1>
          <p className="text-sm opacity-80 mt-1">Authorized Personnel Only</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-600 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-zinc-400" />
                </div>
                <input
                  type="email"
                  placeholder="admin@axis.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A10D59]/20 focus:border-[#A10D59] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-600 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="w-4 h-4 text-zinc-400" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A10D59]/20 focus:border-[#A10D59] transition-all"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#A10D59] hover:bg-[#8E0C4F] text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-[#A10D59]/20 mt-4">
              Access Dashboard
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-[10px] text-zinc-400">
              This system is strictly for authorized bank administrators. All access is logged and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
