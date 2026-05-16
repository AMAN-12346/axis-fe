import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] border-t border-zinc-200 py-8 text-center text-sm text-zinc-600">
      <div className="container mx-auto px-4 space-y-4">
        {/* Center Logo */}
        <div className="flex justify-center">
          <img src="/axis.png" alt="Axis Bank" className="h-8 w-auto" />
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-1 text-xs text-zinc-500">
          <Lock className="w-3 h-3 text-emerald-500" />
          <span>Your data is protected with industry-standard encryption.</span>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 text-[#A10D59] font-medium text-xs">
          <Link href="#" className="hover:underline">Terms & Conditions</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Help & Support</Link>
          <Link href="/admin" className="hover:underline">Admin Login</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Axis Credit Card Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
