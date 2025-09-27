"use client";

import { motion } from "framer-motion";
import { Upload, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const logs = [
  {
    title: "ID Verification Approved",
    time: "2 hours ago",
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  },
  {
    title: "Business License Pending Review",
    time: "Yesterday",
    icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
  },
  {
    title: "Proof of Address Submitted",
    time: "2 days ago",
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  },
];

export default function KycCompliance() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">KYC & Compliance</h1>
        <p className="text-muted-foreground">
          Verify your identity and business details to unlock full features.
        </p>
      </header>

      {/* KYC Status */}
      <motion.div
        className="bg-background/40 border border-brand-blue/20 backdrop-blur-sm rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Your compliance level determines your payout and transaction limits.
        </p>
        <Progress value={60} className="h-2 bg-brand-blue/20" />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Basic</span>
          <span>60% Complete</span>
          <span>Advanced</span>
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        className="bg-background/40 border border-brand-blue/20 backdrop-blur-sm rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Document Upload</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <UploadCard title="Government ID" status="Approved" />
          <UploadCard title="Proof of Address" status="Pending" />
          <UploadCard title="Business License" status="Pending" />
          <UploadCard title="Bank Statement" status="Not Submitted" />
        </div>
      </motion.div>

      {/* Compliance Logs */}
      <motion.div
        className="bg-background/40 border border-brand-blue/20 backdrop-blur-sm rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Compliance Activity</h2>
        <div className="space-y-4">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5">{log.icon}</div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {log.title}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{log.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function UploadCard({ title, status }: { title: string; status: string }) {
  const isPending = status === "Pending";
  const isApproved = status === "Approved";

  return (
    <div className="p-4 border border-brand-blue/20 rounded-lg bg-background/30 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">{title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isApproved
              ? "bg-green-100 text-green-700"
              : isPending
              ? "bg-amber-100 text-amber-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
      >
        <Upload className="h-4 w-4 mr-2" /> Upload
      </Button>
    </div>
  );
}
